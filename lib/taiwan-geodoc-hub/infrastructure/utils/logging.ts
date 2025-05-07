import {
    Consola,
    type LogObject,
    type ConsolaReporter,
    type ConsolaInstance,
} from "consola"
import { DateTime } from "luxon"

const jsonReporter: ConsolaReporter = {
    log: (logObj: LogObject) => {
        const timestamp = DateTime.fromMillis(logObj.date.getTime()).toFormat(
            "yyyy-LL-dd HH:mm:ss.SSS",
        )

        const { level, args, tag, type, context = {} } = logObj

        const [message, extra] = args
        const entry: Record<string, unknown> = {
            timestamp,
            message: String(message),
            level,
            type,
            ...(tag ? { tag } : {}),
            ...(context ? { ...context } : {}),
        }
        if (typeof extra === "object") {
            const { elapsed, thrown, requestId, userId, tenantId, snapshotId } =
                extra as {
                    elapsed?: number
                    thrown?: (Error | unknown) & { toJSON?: () => unknown }
                    requestId?: string
                    userId?: string
                    tenantId?: string
                    snapshotId?: string
                }
            if (requestId) entry.name = requestId
            if (elapsed) entry.elapsed = elapsed
            if (userId) entry.userId = userId
            if (tenantId) entry.tenantId = tenantId
            if (snapshotId) entry.snapshotId = snapshotId
            if (thrown) {
                if (thrown.toJSON) entry.error = thrown.toJSON()
                else if (thrown instanceof Error)
                    entry.error = { message: thrown.message }
                else entry.error = { message: String(thrown) }
            }
        }

        console.log(entry)
    },
}

export const createLogger = (defaults: Record<string, unknown> = {}) =>
    new Consola({
        // level: 4,
        reporters: [jsonReporter],
        defaults,
    }) as ConsolaInstance
