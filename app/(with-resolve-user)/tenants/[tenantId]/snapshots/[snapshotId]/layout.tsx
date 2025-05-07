import { type ReactNode } from "react"
import SnapshotProvider from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/snapshot-provider"
import { startupWithResolveSnapshot } from "@/taiwan-geodoc-hub/utils/lifespan/startup-with-resolve-snapshot"
import { context } from "@/taiwan-geodoc-hub/utils/lifespan/context"

export default async function ({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{
        tenantId: string
        snapshotId: string
    }>
}) {
    const { tenantId, snapshotId } = (await params) as {
        tenantId: string
        snapshotId: string
    }
    await startupWithResolveSnapshot(tenantId, snapshotId)
    const snapshot = context.snapshot!
    return <SnapshotProvider snapshot={snapshot}>{children}</SnapshotProvider>
}
