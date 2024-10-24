import { DirectoryName, FileName, FilePath } from "~/data/io/library/paths"

export type NamespaceName = string
export type GroupName = string

export interface ManifestFileEntry {
	namespace: NamespaceName
	path: FilePath
	file: FileName
	group: DirectoryName
	overlay: boolean
}
