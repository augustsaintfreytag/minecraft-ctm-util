import { systemLogger } from "~/app/logger"
import { encodeManifestToData } from "~/data/io/functions/manifest-file-coding"
import { BlockTextureManifestRecord } from "~/data/manifest/models/manifest-record"

export async function writeAllManifests(records: BlockTextureManifestRecord[]): Promise<void> {
	records.forEach(async record => {
		const filePath = record.entry.filePath
		const manifestData = encodeManifestToData(record.manifest)

		Bun.write(filePath, manifestData)

		systemLogger.log(`Wrote modified manifest for block '${record.entry.id}' to file '${filePath}'.`)
	})
}
