import { DirectoryName, FileName, FilePath } from "~/data/io/library/paths"

export type NamespaceName = string

export interface BlockTexturePropertiesFileEntry {
	namespace: NamespaceName
	path: FilePath
	file: FileName
	group: DirectoryName
	overlay: boolean
}
