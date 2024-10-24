import { decodeManifestFromData } from "~/data/io/functions/manifest-file-coding"
import { ManifestFileEntry } from "~/data/io/library/manifest-file-entry"
import { BlockTextureManifest } from "~/data/manifest/models/manifest"

export async function readAndDecodeManifest(fileEntry: ManifestFileEntry): Promise<BlockTextureManifest | undefined> {
	const filePath = fileEntry.filePath
	const rawFileContents = await Bun.file(filePath).text()

	try {
		const properties = decodeManifestFromData(rawFileContents)
		return properties
	} catch (error) {
		console.error(`Could not decode manifest from file '${filePath}'. ${error}`)
		return undefined
	}
}
