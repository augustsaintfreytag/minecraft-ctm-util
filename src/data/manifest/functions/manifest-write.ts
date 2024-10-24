import { encodeManifestToData } from "~/data/io/functions/manifest-file-coding"
import { BlockTextureManifestRecord } from "~/data/manifest/models/manifest-record"

export async function writeAllManifests(records: BlockTextureManifestRecord[]): Promise<void> {
	records.forEach(async record => {
		const filePath = record.entry.filePath
		const manifestData = encodeManifestToData(record.manifest)

		const writer = Bun.file(filePath).writer()

		writer.write(manifestData)
		writer.end()
	})
}
