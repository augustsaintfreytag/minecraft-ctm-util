import { readdir as readDirectory } from "node:fs/promises"
import { join as joinPath } from "path"
import { DirectoryName, DirectoryPath, FileName } from "~/data/io/library/paths"
import { NamespaceName, ManifestFileEntry } from "~/data/io/library/manifest-file-entry"

export async function readNamespacedPaths(rootPath: DirectoryPath): Promise<DirectoryName[]> {
	const rootGroups = await readDirectoryNames(rootPath)

	return rootGroups
}

export async function readResourcePackFiles(rootPath: DirectoryPath): Promise<ManifestFileEntry[]> {
	const namespaces = await readNamespacedPaths(rootPath)
	const entries: ManifestFileEntry[] = []

	for (const namespace of namespaces) {
		const namespaceRootPath = joinPath(rootPath, namespace, "optifine", "ctm")
		const overlaysRootPath = joinPath(namespaceRootPath, "_overlays")

		const rootGroups = await readDirectoryNames(namespaceRootPath)
		const overlayGroups = await readDirectoryNames(overlaysRootPath)

		const rootFileEntries = await manifestFileEntriesForResourcePackNamespace(namespace, namespaceRootPath, rootGroups, false)
		const overlayFileEntries = await manifestFileEntriesForResourcePackNamespace(namespace, overlaysRootPath, overlayGroups, true)

		const totalNumberOfEntries = rootFileEntries.length + overlayFileEntries.length

		console.log(`Added ${totalNumberOfEntries} manifest file entries for namespace '${namespace}'.`)

		entries.push(...rootFileEntries, ...overlayFileEntries)
	}

	return entries
}

export async function manifestFileEntriesForResourcePackNamespace(
	namespace: NamespaceName,
	namespaceRootPath: DirectoryPath,
	groups: DirectoryName[],
	overlay: boolean
): Promise<ManifestFileEntry[]> {
	const unfilteredFileEntries = await Promise.all(
		groups.map(async group => {
			const groupPath = joinPath(namespaceRootPath, group)
			const fileName = await propertiesFileNameForNamespace(groupPath)

			if (!fileName) {
				console.warn(`Could not find properties file in path for group '${group}' at '${groupPath}'.`)
				return undefined
			}

			const manifestId = fileName.replace(".properties", "")
			const filePath = joinPath(groupPath, fileName)

			const fileEntry: ManifestFileEntry = {
				id: manifestId,
				namespace: namespace,
				path: filePath,
				file: fileName,
				group: group,
				overlay: overlay
			}

			return fileEntry
		})
	)

	return unfilteredFileEntries.compact()
}

export async function propertiesFileNameForNamespace(groupPath: DirectoryPath): Promise<FileName | undefined> {
	const propertiesFileNames = (await readDirectory(groupPath)).filter(name => name.includes(".properties"))
	return propertiesFileNames.first
}

export async function readDirectoryNames(path: DirectoryPath): Promise<DirectoryName[]> {
	try {
		const recordNames = await readDirectory(path)
		return recordNames.filter(name => !name.includes(".") && !name.includes("_overlays"))
	} catch (error) {
		// console.log(`Could not list directory contents at '...${path.substring(-32)}', does not exist or can not be accessed.`)
		return []
	}
}
