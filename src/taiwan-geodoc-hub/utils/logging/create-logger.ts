import { type ConsolaInstance, Consola } from "consola"
import { CloudLoggingJsonFormatter } from "@/taiwan-geodoc-hub/infrastructure/formatters/cloud-logging-json-formatter"

export const createLogger = (defaults: Record<string, unknown> = {}) =>
    new Consola({
        // level: 4,
        reporters: [new CloudLoggingJsonFormatter()],
        defaults,
    }) as ConsolaInstance
