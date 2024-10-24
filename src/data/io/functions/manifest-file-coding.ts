import { assert, cast, deserialize, serialize } from "@deepkit/type"
import { BlockSet } from "~/data/blocks/models/block-set"
import {
	BlockFace,
	BlockId,
	BlockTextureConnect,
	BlockTextureLayer,
	BlockTextureManifest,
	BlockTextureMatchTiles,
	BlockTextureMethod,
	BlockTextureSymmetry,
	BlockTextureTiles,
	BlockTextureTileWeights,
	BlockTintIndex
} from "~/data/manifest/models/manifest"
import { ifDefined } from "~/data/values/values"

// Encoding

export function encodeManifestToData(manifest: BlockTextureManifest): string {
	const lines = [
		ifDefined(manifest.matchBlocks, matchBlocks => `matchBlocks=${matchBlocks.toArray().join(" ")}`),
		ifDefined(manifest.method, method => `method=${method}`),
		ifDefined(manifest.tiles, tiles => `tiles=${tiles}`),
		ifDefined(manifest.connect, connect => `connect=${connect}`),
		ifDefined(manifest.connectBlocks, connectBlocks => `connectBlocks=${connectBlocks.toArray().join(" ")}`),
		ifDefined(manifest.matchTiles, matchTiles => `matchTiles=${matchTiles}`),
		ifDefined(manifest.faces, faces => `faces=${faces.toArray().join(" ")}`),
		ifDefined(manifest.biomes, biomes => `biomes=${biomes.toArray().join(" ")}`),
		ifDefined(manifest.heights, heights => `heights=${heights.toArray().join(" ")}`),
		ifDefined(manifest.tintIndex, tintIndex => `tintIndex=${tintIndex}`),
		ifDefined(manifest.tintBlock, tintBlock => `tintBlock=${tintBlock}`),
		ifDefined(manifest.layer, layer => `layer=${layer}`),
		ifDefined(manifest.weights, weights => `weights=${weights}`),
		ifDefined(manifest.randomLoops, randomLoops => `randomLoops=${randomLoops}`),
		ifDefined(manifest.symmetry, symmetry => `symmetry=${symmetry}`),
		ifDefined(manifest.linked, linked => `linked=${linked}`)
	].compact()

	return lines.join("\n")
}

// Decoding

export function decodeManifestFromData(data: string): BlockTextureManifest {
	const fileMap: Map<string, string> = new Map(
		data.split("\n").map(line => {
			const parts = line
				.trim()
				.split("=")
				.map(part => part.trim())
			return [parts[0], parts[1]]
		})
	)
	try {
		const rawObject = {
			matchBlocks: new BlockSet(fileMap.get("matchBlocks")?.split(" ")),
			method: cast<BlockTextureManifest["method"]>(fileMap.get("method")),
			tiles: cast<BlockTextureManifest["tiles"]>(fileMap.get("tiles")),
			connect: cast<BlockTextureManifest["connect"]>(fileMap.get("connect") || "block"),
			connectBlocks: new BlockSet(fileMap.get("connectBlocks")?.split(" ")),
			matchTiles: cast<BlockTextureManifest["matchTiles"]>(fileMap.get("matchTiles")),
			faces: cast<Set<BlockFace>>(fileMap.get("faces")?.split(" ").toSet()),
			biomes: fileMap.get("biomes")?.split(" ").toSet(),
			heights: fileMap.get("heights")?.split(" ").compactMap(Number).toSet(),
			tintIndex: cast<BlockTextureManifest["tintIndex"]>(fileMap.get("tintIndex")) || undefined,
			tintBlock: cast<BlockId | undefined>(fileMap.get("tintBlock")),
			layer: cast<BlockTextureManifest["layer"]>(fileMap.get("layer") || "cutout_mipped"),
			weights: cast<BlockTextureManifest["weights"]>(fileMap.get("weights")),
			randomLoops: Number(fileMap.get("randomLoops")) || undefined,
			symmetry: cast<BlockTextureManifest["symmetry"]>(fileMap.get("symmetry")),
			linked: ifDefined(fileMap.get("linked"), value => Boolean(value))
		}

		const manifest = BlockTextureManifest.fromProperties(rawObject)
		return manifest
	} catch (error) {
		throw new Error(`Could not deserialize block texture properties. ${error}`)
	}
}

// Utility

export function blockIdSetFromPattern(pattern: string | undefined): Set<BlockId> {
	return (pattern ?? "").replace(/\n|\t/g, "").split(" ").toSet()
}
