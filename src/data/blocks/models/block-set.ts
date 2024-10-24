import { BlockId } from "~/data/manifest/models/manifest"

export class BlockSet extends Set<BlockId> {
	constructor(blocks?: Iterable<BlockId>) {
		super(blocks)
	}

	static empty(): BlockSet {
		return new BlockSet(new Set())
	}

	static from(...blocks: BlockId[]): BlockSet {
		return new BlockSet(blocks)
	}

	with(block: BlockId): BlockSet
	with(blocks: BlockSet): BlockSet
	with(blockOrBlocks: BlockId | BlockSet): BlockSet {
		if (blockOrBlocks instanceof BlockSet) {
			return new BlockSet(this.formUnion(blockOrBlocks))
		} else {
			return new BlockSet(this.formUnion(new BlockSet([blockOrBlocks])))
		}
	}

	without(block: BlockId): BlockSet
	without(blocks: BlockSet): BlockSet
	without(blockOrBlocks: BlockId | BlockSet): BlockSet {
		if (blockOrBlocks instanceof BlockSet) {
			return new BlockSet(this.formSubtraction(blockOrBlocks))
		} else {
			return new BlockSet(this.formSubtraction(new BlockSet([blockOrBlocks])))
		}
	}
}
