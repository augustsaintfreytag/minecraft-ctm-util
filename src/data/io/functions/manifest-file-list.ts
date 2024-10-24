import { readdir as readDirectory } from "node:fs/promises"
import { join as joinPath, normalize as normalizePath, sep as pathSeparator } from "path"
import { DirectoryName, DirectoryPath, FileName, FilePath } from "~/data/io/library/paths"
import { NamespaceName, ManifestFileEntry } from "~/data/io/library/manifest-file-entry"

export async function readNamespacedPaths(rootPath: DirectoryPath): Promise<DirectoryName[]> {
	const rootGroups = await readDirectoryNames(rootPath)

	return rootGroups
}

export async function readResourcePackFiles(rootPath: DirectoryPath): Promise<ManifestFileEntry[]> {
	const namespaces = await readNamespacedPaths(rootPath)
	const entries: ManifestFileEntry[] = []

	console.log(`Determined available namespaces: '${namespaces.join("', '")}'.`)

	for (const namespace of namespaces) {
		const namespacePath = joinPath(rootPath, namespace, "optifine", "ctm")
		const manifestFilePaths = await readManifestPaths(namespacePath)
		const fileEntries = manifestFileEntriesForResourcePackNamespace(namespace, manifestFilePaths)

		entries.push(...fileEntries)
	}

	return entries
}

export function manifestFileEntriesForResourcePackNamespace(namespace: NamespaceName, filePaths: FilePath[]): ManifestFileEntry[] {
	return filePaths.compactMap(filePath => {
		const pathComponents = filePath.split(pathSeparator)
		const basePath = pathComponents.slice(0, -1).join(pathSeparator)
		const manifestFileName = pathComponents.last
		const manifestId = manifestFileName?.split(".").first

		if (!manifestId) {
			console.error(`Could not extract manifest id from file name '${manifestFileName}' in namespace '${namespace}'.`)
			return undefined
		}

		const fileEntry = new ManifestFileEntry(manifestId, namespace, basePath, manifestFileName)
		return fileEntry
	})
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
		console.warn(`Could not list directory contents at '...${path.substring(-32)}', does not exist or can not be accessed.`)
		return []
	}
}

export async function readManifestPaths(path: DirectoryPath): Promise<FilePath[]> {
	try {
		const rawFileRecords = await readDirectory(path, { recursive: true, withFileTypes: true })
		const absoluteFilePaths = rawFileRecords.map(record => normalizePath(joinPath(record.parentPath, record.name)))
		const manifestFilePaths = absoluteFilePaths.filter(path => path.endsWith(".properties"))

		return manifestFilePaths
	} catch (error) {
		console.warn(`Could not read manifest paths from directory '${path}'.`)
		return []
	}
}
