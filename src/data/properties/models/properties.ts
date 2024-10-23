import { integer } from "@deepkit/type"

export type BlockId = string

export type BiomeId = string

export type BlockTextureTiles = string

export type BlockTextureMatchTiles = string

export type BlockTextureTileWeights = string

export type BlockTintIndex = integer

export type BlockTextureLayer = "cutout_mipped" | "cutout" | "translucent"

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
	| "overlay_ctm"
	| "overlay_random"
	| "overlay_repeat"
	| "overlay_fixed"

export type BlockFace = "bottom" | "top" | "north" | "south" | "east" | "west" | "sides" | "all"

export type BlockTextureConnect = "block" | "tile" | "state"

// Properties

export class BlockTextureProperties {
	constructor(
		public method: BlockTextureMethod, // Required method for connecting textures
		public tiles: BlockTextureTiles, // List of tiles (as string paths)
		public connectBlocks?: Set<BlockId>, // Set of block names that act as connection origin block
		public matchBlocks?: Set<BlockId>, // Set of block names that act as connection destination blocks
		public matchTiles?: BlockTextureMatchTiles, // List of tile names this method should apply to
		public connect: BlockTextureConnect = "block", // Default: block for blocks, tile for tiles
		public faces?: Set<BlockFace>, // Optional faces to apply connection
		public biomes?: Set<BiomeId>, // Optional list of biomes
		public heights?: Set<integer>, // Optional height restrictions
		public tintIndex: BlockTintIndex = -1, // Default: -1 (disabled)
		public tintBlock?: BlockId, // Optional block used for tinting
		public layer: BlockTextureLayer = "cutout_mipped", // Default render layer is cutout_mipped
		public weights?: BlockTextureTileWeights, // Optional weights for random textures
		public randomLoops?: integer, // Optional random loops for random textures
		public symmetry?: BlockTextureSymmetry, // Optional symmetry option
		public linked: boolean = false // Default: false
	) {}
}
