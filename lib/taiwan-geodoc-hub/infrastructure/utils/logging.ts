import { Consola, type LogObject, type ConsolaReporter } from "consola"
import { DateTime } from "luxon"
import { type User } from "firebase/auth"
import { type UserRecord } from "firebase-admin/auth"
import { type Tenant } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"

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
            const { elapsed, error, requestId, user, tenant, snapshot } =
                extra as {
                    elapsed?: number
                    error?: Error | unknown
                    requestId?: string
                    user?: User | UserRecord
                    tenant?: Tenant
                    snapshot?: Snapshot
                }
            if (requestId) entry.name = requestId
            if (elapsed) entry.elapsed = elapsed
            if (user) entry.userId = user.uid
            if (tenant) entry.tenantId = tenant.id
            if (snapshot) entry.snapshotId = snapshot.id
            if (error)
                entry.error =
                    error instanceof Error ? error.message : String(error)
        }

        console.log(entry)
    },
}

export const createLogger = (defaults: Record<string, unknown> = {}) =>
    new Consola({
        // level: 4,
        reporters: [jsonReporter],
        defaults,
    })
