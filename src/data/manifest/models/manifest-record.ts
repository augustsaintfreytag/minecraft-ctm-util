import { ManifestFileEntry } from "~/data/io/library/manifest-file-entry"
import { BlockTextureManifest } from "~/data/manifest/models/manifest"

export class BlockTextureManifestRecord {
	constructor(public entry: ManifestFileEntry, public manifest: BlockTextureManifest) {
		this.entry = entry
		this.manifest = manifest
	}
}
