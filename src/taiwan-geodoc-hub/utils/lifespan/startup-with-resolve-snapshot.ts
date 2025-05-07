import { context } from "./context"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
import { type DependencyContainer } from "tsyringe"
import { startupWithResolveTenant } from "./startup-with-resolve-tenant"
import { SnapshotId } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { SnapshotNotFound } from "@/taiwan-geodoc-hub/modules/access-controlling/exceptions/snapshot-not-found"
// import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"

export let snapshot: Snapshot
let container: DependencyContainer

export const startupWithResolveSnapshot = async (
    tenantId: string,
    snapshotId: string,
) => {
    if (!context["withSnapshot"]) {
        container = await startupWithResolveTenant(tenantId)
        // ...
        if (!snapshot) throw new SnapshotNotFound(snapshotId)
        container.register(SnapshotId, { useValue: snapshotId })
        context["snapshot"] = snapshot
        context["withSnapshot"] = container
    }
    return context["withSnapshot"]
}
