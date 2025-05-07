import { type ConsolaReporter, type LogObject } from "consola"
import { DateTime } from "luxon"

export class CloudLoggingJsonFormatter implements ConsolaReporter {
    log(logObj: LogObject): void {
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
            const {
                elapsed,
                thrown,
                traceId,
                userId,
                tenantId,
                snapshotId,
                registrationId,
            } = extra as {
                elapsed?: number
                thrown?: (Error | unknown) & { toJSON?: () => unknown }
                traceId?: string
                userId?: string
                tenantId?: string
                snapshotId?: string
                registrationId?: string
            }
            if (traceId) entry.name = traceId
            if (elapsed) entry.elapsed = elapsed
            if (userId) entry.userId = userId
            if (tenantId) entry.tenantId = tenantId
            if (snapshotId) entry.snapshotId = snapshotId
            if (registrationId) entry.registrationId = registrationId
            if (thrown) {
                if (thrown.toJSON) entry.error = thrown.toJSON()
                else if (thrown instanceof Error)
                    entry.error = { message: thrown.message }
                else entry.error = { message: String(thrown) }
            }
        }

        console.log(entry)
    }
}
