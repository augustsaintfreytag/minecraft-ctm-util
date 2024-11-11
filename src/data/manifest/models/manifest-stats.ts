import { integer } from "@deepkit/type"
import { NamespaceName } from "~/data/io/library/manifest-file-entry"

export class ManifestNamespaceStats {
	public namespace: NamespaceName
	public foundIds: Set<string> = new Set()
	public rewrittenIds: Set<string> = new Set()

	constructor(namespace: NamespaceName) {
		this.namespace = namespace
	}

	public get numberOfFoundIds(): integer {
		return this.foundIds.size
	}

	public get numberOfRewrittenIds(): integer {
		return this.rewrittenIds.size
	}

	public get unchangedIds(): Set<string> {
		return this.foundIds.formSubtraction(this.rewrittenIds)
	}

	public get numberOfUnchangedIds(): integer {
		return this.numberOfFoundIds - this.numberOfRewrittenIds
	}

	public get reportDescription(): string[] {
		const namespace = this.namespace

		const foundIds = this.foundIds
		const numberOfFoundIds = foundIds.size

		const rewrittenIds = this.rewrittenIds
		const numberOfRewrittenIds = rewrittenIds.size
		const formattedRewrittenIds = rewrittenIds.sorted().join(" ") || "(None)"
		const percentageRewrittenIds = (numberOfRewrittenIds / numberOfFoundIds) * 100
		const formattedPercentageRewrittenIds = `${percentageRewrittenIds.toRounded()}%`

		const unchangedIds = this.unchangedIds
		const numberOfUnchangedIds = unchangedIds.size
		const formattedUnchangedIds = unchangedIds.sorted().join(" ") || "(None)"
		const formattedPercentageUnchangedIds = `${(100 - percentageRewrittenIds).toRounded()}%`

		return [
			`┌ Namespace '${namespace}'`,
			`├── Total: ${numberOfFoundIds}, rewritten: ${numberOfRewrittenIds} (${formattedPercentageRewrittenIds}), unchanged: ${numberOfUnchangedIds} (${formattedPercentageUnchangedIds}).`,
			`├── Rewritten: ${formattedRewrittenIds}`,
			`└── Unchanged: ${formattedUnchangedIds}`
		]
	}
}

export class ManifestStats {
	public statsByNamespace: Map<string, ManifestNamespaceStats> = new Map()

	public addFoundId(namespace: NamespaceName, id: string) {
		const stats = this.assertNamespaceStats(namespace)
		stats.foundIds.add(id)
	}

	public addRewrittenId(namespace: NamespaceName, id: string) {
		const stats = this.assertNamespaceStats(namespace)
		stats.rewrittenIds.add(id)
	}

	private assertNamespaceStats(namespace: NamespaceName): ManifestNamespaceStats {
		if (!this.statsByNamespace.has(namespace)) {
			this.statsByNamespace.set(namespace, new ManifestNamespaceStats(namespace))
		}

		return this.statsByNamespace.get(namespace)!
	}

	public get reportDescriptionForAllNamespaces(): string[] {
		const namespaceLines = this.statsByNamespace.toEntries().flatMap(([_, stats]) => stats.reportDescription)
		return namespaceLines
	}
}
