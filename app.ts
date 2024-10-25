import "~/types/extensions"

import { App } from "@deepkit/app"
import { FrameworkModule } from "@deepkit/framework"
import { JSONTransport, Logger } from "@deepkit/logger"
import { AppConfig } from "~/app/config"
import { readResourcePackFiles } from "~/data/io/functions/manifest-file-list"
import { DirectoryPath } from "~/data/io/library/paths"
import { manifestPresetByBlockId } from "~/data/manifest/functions/manifest-presets"
import { readAllManifests } from "~/data/manifest/functions/manifest-read"
import { decodeManifestFromData } from "~/data/io/functions/manifest-file-coding"
import { BlockTextureManifestRecord } from "~/data/manifest/models/manifest-record"
import { writeAllManifests } from "~/data/manifest/functions/manifest-write"
import { ManifestFileEntry } from "~/data/io/library/manifest-file-entry"
import { join as joinPath, normalize as normalizePath, sep as pathSeparator } from "path"

new App({
	config: AppConfig,
	controllers: [],
	providers: [],
	imports: [new FrameworkModule()]
})
	.loadConfigFromEnv({ envFilePath: ["production.env", ".env"] })
	.setup((module, config: AppConfig) => {
		if (config.environment === "production") {
			// enable logging JSON messages instead of formatted strings
			module.configureProvider<Logger>(v => v.setTransport([new JSONTransport()]))
			// disable debugging
			module.getImportedModuleByClass(FrameworkModule).configure({ debug: false })
		}
	})
	.command("list", async (path: DirectoryPath) => {
		const fileEntries = await readResourcePackFiles(path)

		fileEntries.forEach(fileEntry => {
			console.log(`Namespace: '${fileEntry.namespace}', File: '${fileEntry.file}'`)
		})
	})
	.command("analyze", async (path: DirectoryPath) => {
		// Command reserved to check correct hierarchy (no circular references).
	})
	.command("rewrite", async (path: DirectoryPath) => {
		console.log(`Reading manifest presets from resource pack root '${path}'.`)

		const manifestPresets = manifestPresetByBlockId()
		const manifestRecords = await readAllManifests(path)

		const changedManifestRecords = manifestRecords.compactMap(manifestRecord => {
			const originalEntry = manifestRecord.entry
			const presetManifest = manifestPresets.get(originalEntry.id)

			if (!presetManifest) {
				return undefined
			}

			return new BlockTextureManifestRecord(originalEntry, presetManifest)
		})

		writeAllManifests(changedManifestRecords)
	})
	.run()
