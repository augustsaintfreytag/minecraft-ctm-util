import { systemLogger } from "~/app/logger"
import { readResourcePackFiles } from "~/data/io/functions/manifest-file-list"
import { readAndDecodeManifest } from "~/data/io/functions/manifest-file-read"
import { DirectoryPath } from "~/data/io/library/paths"
import { BlockTextureManifestRecord } from "~/data/manifest/models/manifest-record"

export async function readAllManifests(path: DirectoryPath): Promise<BlockTextureManifestRecord[]> {
	const fileEntries = await readResourcePackFiles(path)

	const records = (
		await Promise.all(
			fileEntries.map(async fileEntry => {
				const fileProperties = await readAndDecodeManifest(fileEntry)

				if (!fileProperties) {
					systemLogger.error(`Could not read or decode file properties at path '${fileEntry.filePath}'.`)
					return undefined
				}

				return new BlockTextureManifestRecord(fileEntry, fileProperties)
			})
		)
	).compact()

	return records
}
