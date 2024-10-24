import { BlockId } from "~/data/manifest/models/manifest"

export function blockIdSetFromPattern(pattern: string | undefined): Set<BlockId> {
	return (pattern ?? "").replace(/\n|\t/g, "").split(" ").toSet()
}
