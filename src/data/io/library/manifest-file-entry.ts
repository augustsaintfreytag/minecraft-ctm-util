import { FileName, FilePath } from "~/data/io/library/paths"

export type NamespaceName = string
export type GroupName = string

export interface ManifestFileEntry {
	/** The custom identifier of the texture properties.  */
	id: string

	/** The namespace the texture modification belongs to (e.g. `minecraft`, `create`, …) */
	namespace: NamespaceName

	/** The absolute path of the manifest `id.properties` file. */
	path: FilePath

	/** The manifest file name with file extension. */
	file: FileName
}
