import { deserialize } from "@deepkit/type"
import { BlockSet } from "~/data/blocks/models/block-set"
import { ManifestFileEntry } from "~/data/io/library/manifest-file-entry"
import { BlockTextureManifest } from "~/data/manifest/models/manifest"

export async function readBlockTexturePropertiesForEntry(fileEntry: ManifestFileEntry): Promise<BlockTextureManifest | undefined> {
	const filePath = fileEntry.path
	const rawFileContents = await Bun.file(filePath).text()

	const fileMap: Map<string, string> = new Map(
		rawFileContents.split("\n").map(line => {
			const parts = line.split("=").map(part => part.trim())
			return [parts[0], parts[1]]
		})
	)

	const rawObject = {
		method: fileMap.get("method"),
		tiles: fileMap.get("tiles"),
		connectBlocks: new BlockSet(fileMap.get("connectBlocks")?.split(" ")),
		matchBlocks: new BlockSet(fileMap.get("matchBlocks")?.split(" ")),
		matchTiles: fileMap.get("matchTiles"),
		connect: fileMap.get("connect") || "block",
		faces: fileMap.get("faces")?.split(" ").toSet(),
		biomes: fileMap.get("biomes")?.split(" ").toSet(),
		heights: fileMap.get("heights")?.split(" ").compactMap(Number).toSet(),
		tintIndex: Number(fileMap.get("tintIndex")) || undefined,
		tintBlock: fileMap.get("tintBlock"),
		layer: fileMap.get("layer") || "cutout_mipped",
		weights: fileMap.get("weights"),
		randomLoops: Number(fileMap.get("randomLoops")) || undefined,
		symmetry: fileMap.get("symmetry"),
		linked: Boolean(fileMap.get("linked"))
	}

	try {
		const properties = deserialize<BlockTextureManifest>(rawObject)
		return properties
	} catch (error) {
		console.error(`Could not deserialize block texture properties. ${error}`)
		return undefined
	}
}