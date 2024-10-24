import { readResourcePackFiles } from "~/data/io/functions/manifest-file-list"
import { readBlockTexturePropertiesForEntry } from "~/data/io/functions/manifest-file-read"
import { DirectoryPath } from "~/data/io/library/paths"
import { BlockTextureManifestRecord } from "~/data/manifest/models/manifest-record"

export async function readManifests(path: DirectoryPath): Promise<BlockTextureManifestRecord[]> {
	const fileEntries = await readResourcePackFiles(path)

	console.log(`Read ${fileEntries.length} file entries for manifest files.`)

	const records = (
		await Promise.all(
			fileEntries.map(async fileEntry => {
				const fileProperties = await readBlockTexturePropertiesForEntry(fileEntry)

				if (!fileProperties) {
					console.error(`Could not read or decode file properties at path '${fileEntry.path}'.`)
					return undefined
				}

				return new BlockTextureManifestRecord(fileEntry, fileProperties)
			})
		)
	).compact()

	return records
}
