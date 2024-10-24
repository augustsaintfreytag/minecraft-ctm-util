import { join as joinPath, normalize as normalizePath, sep as pathSeparator } from "path"
import { DirectoryPath, FileName, FilePath } from "~/data/io/library/paths"

export type NamespaceName = string
export type GroupName = string

export class ManifestFileEntry {
	constructor(
		/** The custom identifier of the texture properties.  */
		public readonly id: string,

		/** The namespace the texture modification belongs to (e.g. `minecraft`, `create`, …) */
		public readonly namespace: NamespaceName,

		/** The path of the directory where the manifest `id.properties` file is found. */
		public readonly basePath: DirectoryPath,

		/** The manifest file name with file extension. */
		public readonly file: FileName
	) {
		this.id = id
		this.namespace = namespace
		this.basePath = basePath
		this.file = file
	}

	public get filePath(): FilePath {
		return joinPath(this.basePath, this.file)
	}
}
