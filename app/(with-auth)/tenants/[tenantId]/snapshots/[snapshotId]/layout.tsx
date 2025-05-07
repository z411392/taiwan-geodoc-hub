import { type ReactNode } from "react"
import { resolveTokens } from "~/auth/resolve-tokens"
import Unauthenticated from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/unauthenticated"
import { bootstrap } from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import {
    loggerToken,
    requestIdToken,
    idTokenToken,
    userIdToken,
    tenantIdToken,
    snapshotIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import SnapshotProvider from "~/composables/providers/snapshot-provider"
import { RetrieveSnapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/application/retrieve-snapshot"
import { resolveUser } from "~/auth/resolve-user"
import { RequestIdGenerator } from "~/lib/taiwan-geodoc-hub/modules/system-maintaining/domain/ports/request-id-generator"
import { type NonAbstractClass } from "~/lib/taiwan-geodoc-hub/infrastructure/constants/types"

import { createLogger } from "@/taiwan-geodoc-hub/infrastructure/utils/logging"

export default async function WithSnapshot({
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
    if (!tokens) throw new Unauthenticated()
    const user = resolveUser(tokens.decodedToken)
    const { tenantId, snapshotId } = await params
    const container = await bootstrap()
    const requestIdGenerator = container.resolve(
        RequestIdGenerator as NonAbstractClass<RequestIdGenerator>,
    )
    const requestId = requestIdGenerator.execute()
    container.register(requestIdToken, { useValue: requestId })
    container.register(idTokenToken, { useValue: tokens.token })
    container.register(userIdToken, { useValue: user.uid })
    container.register(tenantIdToken, { useValue: tenantId })
    container.register(snapshotIdToken, { useValue: snapshotId })
    container.register(loggerToken, {
        useFactory: (container) =>
            createLogger({
                requestId: container.resolve(requestIdToken),
                userId: container.resolve(userIdToken),
                tenantId: container.resolve(tenantIdToken),
            }),
    })
    const retrieveSnapshot = container.resolve(RetrieveSnapshot)
    const snapshot = await retrieveSnapshot()
    return (
        <SnapshotProvider requestId={requestId} snapshot={snapshot}>
            {children}
        </SnapshotProvider>
    )
}
