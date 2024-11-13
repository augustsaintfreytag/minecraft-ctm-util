import { integer } from "@deepkit/type"
import { BlockSet } from "~/data/blocks/models/block-set"

export type BlockId = string

export type BiomeId = string

export type BlockTextureTiles = string

export type BlockTextureMatchTiles = string

export type BlockTextureTileWeights = string

export type BlockTintIndex = integer | string

export type BlockTextureLayer = "cutout.mipped" | "cutout" | "translucent"

export type BlockTextureSymmetry = "none" | "opposite" | "all"

export type BlockTextureMethod =
	| "ctm"
	| "ctm_compact"
	| "horizontal"
	| "vertical"
	| "horizontal+vertical"
	| "vertical+horizontal"
	| "top"
	| "random"
	| "repeat"
	| "fixed"
	| "overlay"
	| "overlay_ctm"
	| "overlay_random"
	| "overlay_repeat"
	| "overlay_fixed"

export type BlockFace = "bottom" | "top" | "north" | "south" | "east" | "west" | "sides" | "all"

export type BlockTextureConnect = "block" | "tile" | "state"

// Properties

export class BlockTextureManifest {
	constructor(
		public readonly method: BlockTextureMethod | undefined, // Required method for connecting textures
		public readonly tiles: BlockTextureTiles, // List of tiles (as string paths)
		public readonly connectBlocks: BlockSet, // Set of block names that act as connection origin block
		public readonly matchBlocks: BlockSet, // Set of block names that act as connection destination blocks
		public readonly connect: BlockTextureConnect | undefined, // Default: block for blocks, tile for tiles
		public readonly matchTiles: BlockTextureMatchTiles | undefined, // List of tile names this method should apply to
		public readonly faces: Set<BlockFace> | undefined, // Optional faces to apply connection
		public readonly biomes: Set<BiomeId> | undefined, // Optional list of biomes
		public readonly heights: Set<integer> | undefined, // Optional height restrictions
		public readonly tintIndex: BlockTintIndex | undefined, // Default: -1 (disabled)
		public readonly tintBlock: BlockId | undefined, // Optional block used for tinting
		public readonly layer: BlockTextureLayer | undefined, // Default render layer is cutout_mipped
		public readonly weights: BlockTextureTileWeights | undefined, // Optional weights for random textures
		public readonly randomLoops: integer | undefined, // Optional random loops for random textures
		public readonly symmetry: BlockTextureSymmetry | undefined, // Optional symmetry option
		public readonly linked: boolean | undefined // Default: false
	) {}

	static fromProperties(properties: {
		method?: BlockTextureMethod
		tiles: BlockTextureTiles
		connectBlocks?: BlockSet
		matchBlocks?: BlockSet
		matchTiles?: BlockTextureMatchTiles
		connect?: BlockTextureConnect
		faces?: Set<BlockFace>
		biomes?: Set<BiomeId>
		heights?: Set<integer>
		tintIndex?: BlockTintIndex
		tintBlock?: BlockId
		layer?: BlockTextureLayer
		weights?: BlockTextureTileWeights
		randomLoops?: integer
		symmetry?: BlockTextureSymmetry
		linked?: boolean
	}): BlockTextureManifest {
		return new BlockTextureManifest(
			properties.method,
			properties.tiles,
			properties.connectBlocks ?? BlockSet.empty(),
			properties.matchBlocks ?? BlockSet.empty(),
			properties.connect,
			properties.matchTiles,
			properties.faces,
			properties.biomes,
			properties.heights,
			properties.tintIndex,
			properties.tintBlock,
			properties.layer,
			properties.weights,
			properties.randomLoops,
			properties.symmetry,
			properties.linked
		)
	}

	// Presets

	static forDefaultOverlayBlock(): BlockTextureManifest {
		return BlockTextureManifest.fromProperties({ method: "overlay", tiles: "0-16", connect: "block", layer: "cutout" })
	}

	static forDefaultTopOverlayBlock(): BlockTextureManifest {
		return BlockTextureManifest.fromProperties({ method: "overlay", tiles: "0-16", faces: new Set(["top"]), connect: "block", layer: "cutout" })
	}

	// Replicators

	withTint(tintIndex: BlockTintIndex, tintBlock?: BlockId): BlockTextureManifest {
		return BlockTextureManifest.fromProperties({
			...this,
			tintIndex,
			tintBlock
		})
	}

	matchingBlocks(blocks: BlockSet): BlockTextureManifest {
		return BlockTextureManifest.fromProperties({
			...this,
			matchBlocks: this.matchBlocks?.with(blocks).without(this.connectBlocks)
		})
	}

	notMatchingBlocks(blocks: BlockSet): BlockTextureManifest {
		return BlockTextureManifest.fromProperties({
			...this,
			matchBlocks: this.matchBlocks?.without(blocks)
		})
	}

	connectingBlocks(blocks: BlockSet): BlockTextureManifest {
		return BlockTextureManifest.fromProperties({
			...this,
			connectBlocks: this.connectBlocks?.with(blocks),
			matchBlocks: this.matchBlocks?.without(blocks)
		})
	}
}
