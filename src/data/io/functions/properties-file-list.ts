import { readdir as readDirectory } from "node:fs/promises"
import { join as joinPath } from "path"
import { DirectoryName, DirectoryPath, FileName } from "~/data/io/library/paths"
import { NamespaceName, BlockTexturePropertiesFileEntry } from "~/data/io/library/block-texture-properties-file-entry"

export async function readNamespacedPaths(rootPath: DirectoryPath): Promise<DirectoryName[]> {
	const rootGroups = await readDirectoryNames(rootPath)

	return rootGroups
}

export async function readFiles(rootPath: DirectoryPath): Promise<BlockTexturePropertiesFileEntry[]> {
	const namespaces = await readNamespacedPaths(rootPath)
	const entries: BlockTexturePropertiesFileEntry[] = []

	for (const namespace of namespaces) {
		const namespaceRootPath = joinPath(rootPath, namespace, "optifine", "ctm")
		const overlaysRootPath = joinPath(namespaceRootPath, "_overlays")

		const rootGroups = await readDirectoryNames(namespaceRootPath)
		const overlayGroups = await readDirectoryNames(overlaysRootPath)

		const rootFileEntries = await propertiesFileEntriesForNamespace(namespace, namespaceRootPath, rootGroups, false)
		const overlayFileEntries = await propertiesFileEntriesForNamespace(namespace, overlaysRootPath, overlayGroups, true)

		const totalNumberOfEntries = rootFileEntries.length + overlayFileEntries.length

		console.log(`Added ${totalNumberOfEntries} properties file entries for namespace '${namespace}'.`)

		entries.push(...rootFileEntries, ...overlayFileEntries)
	}

	return entries
}

export async function propertiesFileEntriesForNamespace(
	namespace: NamespaceName,
	namespaceRootPath: DirectoryPath,
	groups: DirectoryName[],
	overlay: boolean
): Promise<BlockTexturePropertiesFileEntry[]> {
	const unfilteredFileEntries = await Promise.all(
		groups.map(async group => {
			const groupPath = joinPath(namespaceRootPath, group)
			const propertiesFileName = await propertiesFileNameForNamespace(groupPath)

			if (!propertiesFileName) {
				console.warn(`Could not find properties file in path for group '${group}' at '${groupPath}'.`)
				return undefined
			}

			const propertiesFilePath = joinPath(groupPath, propertiesFileName)

			const fileEntry: BlockTexturePropertiesFileEntry = {
				namespace: namespace,
				path: propertiesFilePath,
				file: propertiesFileName,
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
