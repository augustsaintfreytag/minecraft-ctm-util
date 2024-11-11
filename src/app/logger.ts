import { ConsoleTransport, Logger } from "@deepkit/logger"

export const systemLogger = new Logger([]).scoped("system")
export const reportLogger = new Logger([new ConsoleTransport()]).scoped("report")

export function disableVerbose() {
	systemLogger.setTransport([])
}

export function enableVerbose() {
	systemLogger.setTransport([new ConsoleTransport()])
}
