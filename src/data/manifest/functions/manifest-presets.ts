import { BlockPresets } from "~/data/blocks/functions/block-presets"
import { BlockSet } from "~/data/blocks/models/block-set"
import { BlockId, BlockTextureManifest } from "~/data/manifest/models/manifest"

export function manifestPresetByBlockId(): Map<BlockId, BlockTextureManifest> {
	const manifestsByBlockId: Map<BlockId, BlockTextureManifest> = new Map([])
	const registeredMatchingBlocks = BlockSet.empty()

	const registerManifestPreset = (id: string, blocks: BlockSet, block: (blocks: BlockSet) => BlockTextureManifest) => {
		// Create naive draft with all requested blocks as specified.
		const manifestDraft = block(blocks)

		// If manifest requests the blocks to only connect to themselves,
		// they will not be added to the tally blacklist and blocks registered
		// after it will still be able to connect to this set of blocks.
		if (!manifestDraft._independent) {
			registeredMatchingBlocks.union(blocks)
		}

		// Subtract blocks from the tally blacklist, assuming they already connect to them.
		// This effectively prevents two-way connections between blocks.
		const manifest = manifestDraft.notMatchingBlocks(registeredMatchingBlocks)

		// Register the manifest for the specified blocks to be saved.
		manifestsByBlockId.set(id, manifest)
	}

	// Snow

	registerManifestPreset("snow_block", BlockSet.from("snow_block"), blocks =>
		BlockTextureManifest.forDefaultTopOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	// Loose/Coarse Blocks

	registerManifestPreset("gravel", BlockSet.from("gravel"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock()
			.withTint("stone", "gravel")
			.matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks))
			.connectingBlocks(blocks)
	)

	registerManifestPreset("sand", BlockSet.from("sand"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock()
			.withTint("sand", "sand")
			.matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks))
			.connectingBlocks(blocks)
	)

	registerManifestPreset("red_sand", BlockSet.from("red_sand"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock()
			.withTint("sand", "sand")
			.matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks))
			.connectingBlocks(blocks)
	)

	registerManifestPreset("ancient_sand", BlockSet.from("yungscavebiomes:ancient_sand"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks)).connectingBlocks(blocks)
	)

	registerManifestPreset("soul_soil", BlockSet.from("soul_soil"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks)).connectingBlocks(blocks)
	)

	// Wet/Organic Blocks

	registerManifestPreset("clay", BlockSet.from("clay"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks)).connectingBlocks(blocks)
	)

	registerManifestPreset("moss_block", BlockSet.from("moss_block"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock()
			.withTint(0, "mossy_block")
			.matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks))
			.connectingBlocks(blocks)
	)

	registerManifestPreset("crimson_nylium", BlockSet.from("crimson_nylium"), blocks =>
		BlockTextureManifest.forDefaultTopOverlayBlock()
			.withTint(0)
			.matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks))
			.connectingBlocks(blocks)
	)

	registerManifestPreset("warped_nylium", BlockSet.from("warped_nylium"), blocks =>
		BlockTextureManifest.forDefaultTopOverlayBlock()
			.withTint(0)
			.matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks))
			.connectingBlocks(blocks)
	)

	// Grass/Dirt Blocks

	registerManifestPreset("podzol", BlockSet.from("podzol"), blocks =>
		BlockTextureManifest.forDefaultTopOverlayBlock()
			.withTint("podzol", "podzol")
			.matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks))
			.connectingBlocks(blocks)
	)

	registerManifestPreset("grass_block", BlockSet.from("grass_block"), blocks =>
		BlockTextureManifest.forDefaultTopOverlayBlock()
			.withTint(0, "grass_block")
			.matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks))
			.connectingBlocks(blocks)
			.markIndependent()
	)

	registerManifestPreset("grass_block_a", BlockSet.from("grass_block"), blocks =>
		BlockTextureManifest.forOverlayBlock("20-36", new Set(["sides"]), "cutout.mipped")
			.withTint(0, "dirt")
			.matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks))
			.connectingBlocks(blocks)
			.markIndependent()
	)

	registerManifestPreset("grass_block_b", BlockSet.from("grass_block"), blocks =>
		BlockTextureManifest.forOverlayBlock("40-56", new Set(["sides"]), "cutout.mipped")
			.withTint(0, "grass_block")
			.matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks))
			.connectingBlocks(blocks)
	)

	registerManifestPreset("rich_soil", BlockSet.from("farmersdelight:rich_soil"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks)).connectingBlocks(blocks)
	)

	registerManifestPreset("rich_soil_farmland", BlockSet.from("farmersdelight:rich_soil_farmland"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks)).connectingBlocks(blocks)
	)

	registerManifestPreset("rich_soil_farmland_moist", BlockSet.from("farmersdelight:rich_soil_farmland_moist"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks)).connectingBlocks(blocks)
	)

	registerManifestPreset("dirt", BlockSet.from("dirt", "coarse_dirt", "rooted_dirt"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks)).connectingBlocks(blocks)
	)

	registerManifestPreset("packed_mud", BlockSet.from("packed_mud"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks.with(BlockPresets.logBlocks)).connectingBlocks(blocks)
	)

	// Stone Blocks

	registerManifestPreset("skulkstone", BlockPresets.deeperDarkerBlocks.with(BlockPresets.deeperDarkerSkulkStoneOreBlocks), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("calcite", BlockSet.from("calcite"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset(
		"deepslate",
		BlockSet.from("deepslate", "cobbled_deepslate", "infested_deepslate").with(BlockPresets.allDeepslateOreBlocks),
		blocks =>
			BlockTextureManifest.forDefaultOverlayBlock().withTint(0, "deepslate").matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("smooth_basalt", BlockSet.from("smooth_basalt", "polished_basalt"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("basalt", BlockSet.from("basalt"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("blackstone", BlockSet.from("blackstone", "polished_blackstone", "polished_blackstone_bricks"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().withTint(0, "stone").matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("sandstone", BlockSet.from("sandstone"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset(
		"ancient_sandstone",
		BlockSet.from(
			"yungscavebiomes:ancient_sandstone",
			"yungscavebiomes:layered_sandstone",
			"layered_ancient_sandstone",
			"chiseled_ancient_sandstone",
			"cut_ancient_sandstone",
			"brittle_sandstone",
			"brittle_ancient_sandstone"
		),
		blocks => BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset(
		"red_sandstone",
		BlockSet.from(
			"red_sandstone",
			"chiseled_red_sandstone",
			"cut_red_sandstone",
			"yungscavebiomes:red_sandstone",
			"yungscavebiomes:brittle_red_sandstone",
			"yungscavebiomes:layered_red_sandstone"
		),
		blocks => BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("diorite", BlockSet.from("diorite"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("andesite", BlockSet.from("andesite"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("granite", BlockSet.from("granite"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("tuff", BlockSet.from("tuff"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	// Special Stone Blocks

	registerManifestPreset("limestone", BlockSet.from("create:limestone"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("asurine", BlockSet.from("create:asurine"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("crimsite", BlockSet.from("create:crimsite"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("ochrum", BlockSet.from("create:ochrum"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("veridium", BlockSet.from("create:veridium"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("scoria", BlockSet.from("create:scoria"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("dripstone_block", BlockSet.from("dripstone_block"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("amethyst_block", BlockSet.from("amethyst_block"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("mossy_cobblestone", BlockSet.from("mossy_cobblestone"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("cobblestone", BlockSet.from("cobblestone"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("stone", BlockSet.from("stone").with(BlockPresets.stoneOreBlocks), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allRegularBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("netherrack", BlockSet.from("netherrack"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock()
			.withTint("netherrack", "netherrack")
			.matchingBlocks(BlockPresets.allRegularBlocks)
			.connectingBlocks(blocks)
	)

	return manifestsByBlockId
}
