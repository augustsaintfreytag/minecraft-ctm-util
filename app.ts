import "~/types/extensions"

import { App, Flag } from "@deepkit/app"
import { FrameworkModule } from "@deepkit/framework"
import { AppConfig } from "~/app/config"
import { enableVerbose, reportLogger, systemLogger } from "~/app/logger"
import { readResourcePackFiles } from "~/data/io/functions/manifest-file-list"
import { DirectoryPath } from "~/data/io/library/paths"
import { manifestPresetByBlockId } from "~/data/manifest/functions/manifest-presets"
import { readAllManifests } from "~/data/manifest/functions/manifest-read"
import { writeAllManifests } from "~/data/manifest/functions/manifest-write"
import { BlockTextureManifestRecord } from "~/data/manifest/models/manifest-record"
import { ManifestStats } from "~/data/manifest/models/manifest-stats"

new App({
	config: AppConfig,
	controllers: [],
	providers: [],
	imports: [new FrameworkModule()]
})
	.loadConfigFromEnv({ envFilePath: ["production.env", ".env"] })
	.setup((module, config: AppConfig) => {
		if (config.environment === "production") {
			// disable debugging
			module.getImportedModuleByClass(FrameworkModule).configure({ debug: false })
		}
	})
	.command("list", async (path: DirectoryPath, verbose: boolean & Flag = false) => {
		verbose && enableVerbose()
		const fileEntries = await readResourcePackFiles(path)

		fileEntries.forEach(fileEntry => {
			systemLogger.log(`Namespace: '${fileEntry.namespace}', File: '${fileEntry.file}'`)
		})
	})
	.command("analyze", async (path: DirectoryPath, verbose: boolean & Flag = false) => {
		verbose && enableVerbose()
		// Command reserved to check correct hierarchy (no circular references).
	})
	.command("rewrite", async (path: DirectoryPath, verbose: boolean & Flag = false) => {
		verbose && enableVerbose()
		systemLogger.log(`Reading manifest presets from resource pack root '${path}'.`)

		const manifestPresets = manifestPresetByBlockId()
		const manifestRecords = await readAllManifests(path)
		const manifestStats = new ManifestStats()

		const changedManifestRecords = manifestRecords.compactMap(manifestRecord => {
			const originalEntry = manifestRecord.entry
			const namespace = originalEntry.namespace
			const presetManifest = manifestPresets.get(originalEntry.id)

			manifestStats.addFoundId(namespace, originalEntry.id)

			if (!presetManifest) {
				return undefined
			}

			manifestStats.addRewrittenId(namespace, originalEntry.id)
			return new BlockTextureManifestRecord(originalEntry, presetManifest)
		})

		writeAllManifests(changedManifestRecords)
		reportLogger.log(manifestStats.reportDescriptionForAllNamespaces.join("\n"))
	})
	.run()
