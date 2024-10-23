import { BlockTexturePropertiesFileEntry } from "~/data/io/library/block-texture-properties-file-entry"
import { BlockTextureProperties } from "~/data/properties/models/properties"

export class BlockTexturePropertiesRecord {
	constructor(public fileEntry: BlockTexturePropertiesFileEntry, public properties: BlockTextureProperties) {
		this.fileEntry = fileEntry
		this.properties = properties
	}
}
