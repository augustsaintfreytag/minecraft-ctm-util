import { BlockPresets } from "~/data/blocks/functions/block-presets"
import { BlockSet } from "~/data/blocks/models/block-set"
import { BlockId, BlockTextureManifest } from "~/data/manifest/models/manifest"

// Hierarchy: Sand -> Gravel -> Mud -> Moss -> Podzol -> Grass -> …

export function manifestPresetByBlockId(): Map<BlockId, BlockTextureManifest> {
	const manifestsByBlockId: Map<BlockId, BlockTextureManifest> = new Map([])
	const registeredMatchingBlocks = BlockSet.empty()

	const registerManifestPreset = (id: string, blocks: BlockSet, block: (blocks: BlockSet) => BlockTextureManifest) => {
		registeredMatchingBlocks.union(blocks)

		const manifestDraft = block(blocks)
		const manifest = manifestDraft.notMatchingBlocks(registeredMatchingBlocks)

		manifestsByBlockId.set(id, manifest)
	}

	registerManifestPreset("sand", BlockSet.from("sand"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allSolidBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("gravel", BlockSet.from("gravel"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allSolidBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("dirt", BlockSet.from("dirt", "coarse_dirt", "rooted_dirt"), blocks =>
		BlockTextureManifest.forDefaultOverlayBlock().matchingBlocks(BlockPresets.allSolidBlocks).connectingBlocks(blocks)
	)

	registerManifestPreset("grass_block", BlockSet.from("grass_block"), blocks =>
		BlockTextureManifest.forDefaultTopOverlayBlock().withTint(0, "grass_block").matchingBlocks(BlockPresets.allSolidBlocks).connectingBlocks(blocks)
	)

	return manifestsByBlockId
}
