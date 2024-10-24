import "~/types/extensions"
import { describe, expect, test } from "bun:test"
import { decodeManifestFromData, encodeManifestToData } from "~/data/io/functions/manifest-file-coding"
import { BlockTextureManifest } from "~/data/manifest/models/manifest"
import { BlockSet } from "~/data/blocks/models/block-set"

test("Decodes valid manifest data", () => {
	const manifestData = `
		matchBlocks=stone granite diorite andesite
		method=overlay
		tiles=0-16
		connect=block
		connectBlocks=sand
		layer=cutout
	`

	const manifest = decodeManifestFromData(manifestData)

	expect(manifest).toBeInstanceOf(BlockTextureManifest)
	expect(manifest.matchBlocks).toBeInstanceOf(BlockSet)

	expect(manifest.matchBlocks.has("stone")).toBe(true)
	expect(manifest.matchBlocks.has("granite")).toBe(true)
	expect(manifest.matchBlocks.has("diorite")).toBe(true)
	expect(manifest.matchBlocks.has("andesite")).toBe(true)
	expect(manifest.matchBlocks.size).toBe(4)

	expect(manifest.matchBlocks.has("gravel")).toBe(false)
	expect(manifest.matchBlocks.has("sand")).toBe(false)

	expect(manifest.method).toBe("overlay")
	expect(manifest.tiles).toBe("0-16")

	expect(manifest.connect).toBe("block")

	expect(manifest.connectBlocks).toBeInstanceOf(BlockSet)
	expect(manifest.connectBlocks.has("sand")).toBe(true)
	expect(manifest.connectBlocks.size).toBe(1)

	expect(manifest.layer).toBe("cutout")
})

test("Throws error for invalid manifest data", () => {
	const manifestData = `
		matchBlocks=stone
		method=orsverlay
		tiles=0-16
		connect=block
		connectBlocks=gravel
		layer=cutouts
	`

	expect(() => {
		decodeManifestFromData(manifestData)
	}).toThrow()
})

test("Encodes valid manifest", () => {
	const manifest = BlockTextureManifest.fromProperties({
		matchBlocks: BlockSet.from("stone", "calcite", "tuff"),
		method: "overlay",
		tiles: "0-16",
		connect: "block",
		connectBlocks: BlockSet.from("sand"),
		layer: "cutout",
		tintIndex: "sand",
		tintBlock: "sand"
	})

	const expectedManifestData = `
		matchBlocks=stone calcite tuff
		method=overlay
		tiles=0-16
		connect=block
		connectBlocks=sand
		layer=cutout
		tintIndex=sand
		tintBlock=sand
	`

	const expectedManifestLines = expectedManifestData
		.trim()
		.split("\n")
		.map(line => line.trim())
		.toSet()
	const encodedManifestData = encodeManifestToData(manifest)
	const encodedManifestLines = encodedManifestData
		.split("\n")
		.map(line => line.trim())
		.toSet()

	expect(encodedManifestLines).toEqual(expectedManifestLines)
})
