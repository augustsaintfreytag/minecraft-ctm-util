import { BlockSet } from "~/data/blocks/models/block-set"

export class BlockPresets {
	// Dirt-like Blocks
	static dirtLikeBlocks = new BlockSet([
		"dirt",
		"coarse_dirt",
		"rooted_dirt",
		"sand",
		"gravel",
		"farmland",
		"podzol",
		"mud",
		"packed_mud",
		"muddy_mangrove_roots",
		"mycelium",
		"clay"
	])

	// Grass Blocks
	static grassLikeBlocks = new BlockSet(["grass_block", "moss_block"])

	// Stone Blocks
	static stoneLikeBlocks = new BlockSet([
		"stone",
		"cobblestone",
		"mossy_cobblestone",
		"mossy_stone_bricks",
		"stone_bricks",
		"chiseled_stone_bricks",
		"cracked_stone_bricks",
		"infested_stone",
		"infested_stonebrick",
		"infested_stone_bricks",
		"infested_cracked_stone_brick",
		"infested_mossy_stone_bricks",
		"infested_chiseled_stone_bricks",
		"granite",
		"diorite",
		"andesite",
		"tuff",
		"calcite",
		"dripstone_block",
		"obsidian"
	])

	// Stone Ore Blocks
	static stoneOreBlocks = new BlockSet([
		"coal_ore",
		"iron_ore",
		"gold_ore",
		"diamond_ore",
		"lapis_ore",
		"redstone_ore",
		"emerald_ore",
		"copper_ore",
		"nether_gold_ore",
		"nether_quartz_ore",
		"ancient_debris"
	])

	// Deepslate Blocks
	static deepslateBlocks = new BlockSet(["deepslate", "cobbled_deepslate", "infested_deepslate"])

	// Deepslate Ore Blocks
	static deepslateOreBlocks = new BlockSet([
		"deepslate_coal_ore",
		"deepslate_iron_ore",
		"deepslate_gold_ore",
		"deepslate_diamond_ore",
		"deepslate_lapis_ore",
		"deepslate_redstone_ore",
		"deepslate_copper_ore",
		"deepslate_emerald_ore"
	])

	// Sandstone Blocks
	static sandstoneBlocks = new BlockSet(["sandstone", "red_sandstone", "chiseled_red_sandstone", "cut_red_sandstone"])

	// Blackstone Blocks
	static blackstoneBlocks = new BlockSet(["blackstone", "polished_blackstone", "polished_blackstone_bricks"])

	// Blackstone Ore Blocks
	static blackstoneOreBlocks = new BlockSet(["gilded_blackstone"])

	// Basalt Blocks
	static basaltBlocks = new BlockSet(["basalt", "polished_basalt", "smooth_basalt"])

	// End Stone Blocks
	static endstoneBlocks = new BlockSet(["end_stone", "end_stone_bricks"])

	// Terracotta and Hardened Clay Blocks
	static terracottaBlocks = new BlockSet([
		"terracotta",
		"stained_hardened_clay",
		"hardened_clay",
		"white_terracotta",
		"orange_terracotta",
		"magenta_terracotta",
		"light_blue_terracotta",
		"yellow_terracotta",
		"lime_terracotta",
		"pink_terracotta",
		"gray_terracotta",
		"light_gray_terracotta",
		"cyan_terracotta",
		"purple_terracotta",
		"blue_terracotta",
		"brown_terracotta",
		"green_terracotta",
		"red_terracotta",
		"black_terracotta",
		"silver_glazed_terracotta"
	])

	// Decorative Blocks
	static decorativeBlocks = new BlockSet([
		"bricks",
		"bone_block",
		"pumpkin",
		"jack_o'lantern",
		"dead_tube_coral_block",
		"dead_brain_coral_block",
		"dead_bubble_coral_block",
		"dead_fire_coral_block",
		"dead_horn_coral_block",
		"crying_obsidian",
		"nether_wart_block",
		"warped_wart_block",
		"glowstone",
		"shroomlight"
	])

	// Wood Blocks
	static woodPlankBlocks = new BlockSet([
		"oak_planks",
		"spruce_planks",
		"birch_planks",
		"acacia_planks",
		"jungle_planks",
		"dark_oak_planks",
		"crimson_planks",
		"warped_planks",
		"mangrove_planks"
	])

	// Snow Blocks
	static snowBlocks = new BlockSet(["snow_block"])

	// Ice Blocks
	static iceBlocks = new BlockSet(["ice", "packed_ice", "blue_ice"])

	// Nether-related Blocks
	static netherBlocks = new BlockSet([
		"netherrack",
		"netherrack_gold_ore",
		"nether_bricks",
		"red_nether_bricks",
		"cracked_nether_bricks",
		"chiseled_nether_bricks",
		"magma_block"
	])

	// Log Blocks

	static logBlocks = new BlockSet([
		"oak_log",
		"spruce_log",
		"birch_log",
		"acacia_log",
		"jungle_log",
		"dark_oak_log",
		"mangrove_log",
		"crimson_stem",
		"warped_stem"
	])

	// Deeper & Darker Mod Blocks
	static deeperDarkerBlocks = new BlockSet(["deeperdarker:skulk_stone"])

	// Deeper & Darker Mod Ore Blocks
	static deeperDarkerOreBlocks = new BlockSet([
		"deeperdarker:skulk_stone_coal_ore",
		"deeperdarker:skulk_stone_copper_ore",
		"deeperdarker:skulk_stone_diamond_ore",
		"deeperdarker:skulk_stone_emerald_ore",
		"deeperdarker:skulk_stone_gold_ore",
		"deeperdarker:skulk_stone_iron_ore",
		"deeperdarker:skulk_stone_lapis_ore",
		"deeperdarker:skulk_stone_redstone_ore"
	])

	// Create Mod Blocks
	static createBlocks = new BlockSet(["create:limestone", "create:scoria", "create:scorchia"])

	// Create Mod Ore Blocks
	static createOreBlocks = new BlockSet([
		"create:zinc_ore",
		"create:deepslate_zinc_ore",
		"create:asurine",
		"create:ochrum",
		"create:veridium",
		"create:crimsite"
	])

	// Create Ironworks Ore Blocks
	static createIronworksOres = new BlockSet(["create_ironworks:tin_ore", "create_ironworks:deepslate_tin_ore"])

	// Farmer's Delight Mod Blocks
	static farmersDelightBlocks = new BlockSet(["farmersdelight:rich_soil_farmland", "farmersdelight:rich_soil_farmland_moist"])

	// Aggregating all blocks
	static allSolidBlocks = new BlockSet([
		...this.dirtLikeBlocks,
		...this.grassLikeBlocks,
		...this.stoneLikeBlocks,
		...this.stoneOreBlocks,
		...this.deepslateBlocks,
		...this.deepslateOreBlocks,
		...this.sandstoneBlocks,
		...this.blackstoneBlocks,
		...this.blackstoneOreBlocks,
		...this.basaltBlocks,
		...this.endstoneBlocks,
		...this.terracottaBlocks,
		...this.decorativeBlocks,
		...this.snowBlocks,
		...this.iceBlocks,
		...this.netherBlocks,
		...this.deeperDarkerBlocks,
		...this.deeperDarkerOreBlocks,
		...this.createBlocks,
		...this.createOreBlocks,
		...this.createIronworksOres,
		...this.farmersDelightBlocks
	])
}
