import { deserialize } from "@deepkit/type"
import { BlockTexturePropertiesFileEntry } from "~/data/io/library/block-texture-properties-file-entry"
import { BlockTextureProperties } from "~/data/properties/models/properties"

export async function readBlockTexturePropertiesForEntry(fileEntry: BlockTexturePropertiesFileEntry): Promise<BlockTextureProperties | undefined> {
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
		connectBlocks: fileMap.get("connectBlocks")?.split(" ").toSet(),
		matchBlocks: fileMap.get("matchBlocks")?.split(" ").toSet(),
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
		const properties = deserialize<BlockTextureProperties>(rawObject)
		return properties
	} catch (error) {
		console.error(`Could not deserialize block texture properties. ${error}`)
		return undefined
	}
}
