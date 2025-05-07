import { type ReactNode } from "react"
import { resolveTokens } from "~/auth/resolve-tokens"
import Unauthenticated from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/unauthenticated"
import { bootstrap } from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import {
    loggerToken,
    idTokenToken,
    userIdToken,
    tenantIdToken,
    snapshotIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"
import SnapshotProvider from "~/composables/providers/snapshot-provider"
import { RetrieveSnapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/application/queries/retrieve-snapshot"
import { resolveUser } from "~/auth/resolve-user"
import { createConsola } from "consola"

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
    container.register(idTokenToken, { useValue: tokens.token })
    container.register(userIdToken, { useValue: user.uid })
    container.register(tenantIdToken, { useValue: tenantId })
    container.register(snapshotIdToken, { useValue: snapshotId })
    const logger = createConsola().withTag(
        JSON.stringify({
            userId: container.resolve(userIdToken),
            tenantId: container.resolve(tenantIdToken),
            snapshotId: container.resolve(snapshotIdToken),
        }),
    )
    container.register(loggerToken, { useValue: logger })
    const retrieveSnapshot = container.resolve(RetrieveSnapshot)
    const snapshot = await retrieveSnapshot()
    return <SnapshotProvider snapshot={snapshot}>{children}</SnapshotProvider>
}
