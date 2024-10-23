import { blockIdSetFromPattern } from "~/data/properties/functions/properties-coding"

export class AppConfig {
	environment: "production" | "development" = "development"
}

export class BlockPresets {
	static allBlocks = new Set([
		// Stone-like Blocks
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

		// Dirt-like Blocks
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
		"clay",

		// Grass-like Blocks
		"grass_block",
		"moss_block",

		// Deepslate Blocks
		"deepslate",
		"cobbled_deepslate",
		"infested_deepslate",

		// Terracotta and Hardened Clay
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
		"silver_glazed_terracotta",

		// Stone-like Blocks
		"granite",
		"diorite",
		"andesite",
		"tuff",
		"calcite",
		"dripstone_block",
		"end_stone",
		"end_stone_bricks",
		"obsidian",
		"blackstone",
		"gilded_blackstone",

		// Sandstone-related Blocks
		"sandstone",
		"red_sandstone",
		"chiseled_red_sandstone",
		"cut_red_sandstone",

		// Block Variants (organic, decorative)
		"bricks",
		"bone_block",
		"pumpkin",
		"jack_o'lantern",
		"coal_block",
		"dead_tube_coral_block",
		"dead_brain_coral_block",
		"dead_bubble_coral_block",
		"dead_fire_coral_block",
		"dead_horn_coral_block",
		"crying_obsidian",
		"nether_wart_block",
		"warped_wart_block",
		"planks",
		"glowstone",
		"shroomlight",

		// Snow Blocks
		"snow_block",

		// Ice Blocks
		"ice",
		"packed_ice",
		"blue_ice",

		// Nether-related Blocks
		"netherrack",
		"netherrack_gold_ore",
		"nether_bricks",
		"red_nether_bricks",
		"cracked_nether_bricks",
		"chiseled_nether_bricks",
		"magma_block",
		"crying_obsidian",
		"basalt",
		"polished_basalt",
		"glowstone",
		"shroomlight",
		"warped_wart_block",
		"nether_wart_block",

		// Ores
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
		"ancient_debris",

		// Deepslate Ores
		"deepslate_coal_ore",
		"deepslate_iron_ore",
		"deepslate_gold_ore",
		"deepslate_diamond_ore",
		"deepslate_lapis_ore",
		"deepslate_redstone_ore",
		"deepslate_copper_ore",
		"deepslate_emerald_ore",

		// Deeper & Darker Mod Blocks
		"deeperdarker:skulk_stone",

		// Deeper & Darker Mod Ore Blocks
		"deeperdarker:skulk_stone_coal_ore",
		"deeperdarker:skulk_stone_copper_ore",
		"deeperdarker:skulk_stone_diamond_ore",
		"deeperdarker:skulk_stone_emerald_ore",
		"deeperdarker:skulk_stone_gold_ore",
		"deeperdarker:skulk_stone_iron_ore",
		"deeperdarker:skulk_stone_lapis_ore",
		"deeperdarker:skulk_stone_redstone_ore",

		// Create Mod Blocks
		"create:limestone",
		"create:scoria",
		"create:scorchia",

		// Create Mod Ore Blocks
		"create:zinc_ore",
		"create:deepslate_zinc_ore",
		"create:asurine",
		"create:ochrum",
		"create:veridium",
		"create:crimsite",

		// Create Ironworks Ore Blocks
		"create_ironworks:tin_ore",
		"create_ironworks:deepslate_tin_ore",

		// Farmer's Delight Mod Blocks
		"farmersdelight:rich_soil_farmland",
		"farmersdelight:rich_soil_farmland_moist"
	])
}
