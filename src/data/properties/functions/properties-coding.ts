import { BlockId } from "~/data/properties/models/properties"

export function blockIdSetFromPattern(pattern: string | undefined): Set<BlockId> {
	return (pattern ?? "").replace(/\n|\t/g, "").split(" ").toSet()
}
