import { type ReactNode } from "react"
import { resolveTokens } from "~/auth/resolve-tokens"
import { Unauthorized } from "@/taiwan-geodoc-hub/modules/access-controlling/exceptions/unauthorized"
import { startup } from "@/taiwan-geodoc-hub/utils/lifespan"
import {
    TraceId,
    IdToken,
    UserId,
    TenantId,
    SnapshotId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import SnapshotProvider from "~/composables/contexts/with-resolve-snapshot"
import { RetrieveSnapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/application/retrieve-snapshot"
import { resolveUser } from "~/auth/resolve-user"
import { TraceIdGenerator } from "@/taiwan-geodoc-hub/infrastructure/generators/trace-id-generator"

export default async function WithResolveSnapshot({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{
        tenantId: string
        snapshotId: string
    }>
}) {
    const tokens = await resolveTokens()
    if (!tokens) throw new Unauthorized()
    const user = resolveUser(tokens.decodedToken)
    const { tenantId, snapshotId } = await params
    const container = await startup(false)
    const nextTraceId = container.resolve(TraceIdGenerator)
    const traceId = nextTraceId()
    container.register(TraceId, { useValue: traceId })
    container.register(IdToken, { useValue: tokens.token })
    container.register(UserId, { useValue: user.uid })
    container.register(TenantId, { useValue: tenantId })
    container.register(SnapshotId, { useValue: snapshotId })
    const retrieveSnapshot = container.resolve(RetrieveSnapshot)
    const snapshot = await retrieveSnapshot()
    return (
        <SnapshotProvider traceId={traceId} snapshot={snapshot}>
            {children}
        </SnapshotProvider>
    )
}
