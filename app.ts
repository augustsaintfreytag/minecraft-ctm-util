import { App } from "@deepkit/app"
import { FrameworkModule } from "@deepkit/framework"
import { JSONTransport, Logger } from "@deepkit/logger"

import "~/types/extensions"

import { AppConfig } from "~/app/config"
import { readFiles } from "~/data/io/file-list"
import { DirectoryPath } from "~/data/paths/paths"

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
		const fileEntries = await readFiles(path)

		fileEntries.forEach(fileEntry => {
			console.log(`Namespace: '${fileEntry.namespace}', Group: '${fileEntry.group}', File: '${fileEntry.file}', Overlay: ${fileEntry.overlay}`)
		})
	})
	.run()
