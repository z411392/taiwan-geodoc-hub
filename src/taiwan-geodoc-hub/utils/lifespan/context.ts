import "reflect-metadata"
import { type DependencyContainer } from "tsyringe"
import { type User } from "~/auth/user"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"

export type Context = {
    base?: DependencyContainer
    withTraceId?: DependencyContainer
    user?: User
    withUser?: DependencyContainer
    tenant?: TenantWithRole
    withTenant?: DependencyContainer
    snapshot?: Snapshot
    withSnapshot?: DependencyContainer
}

export const context: Context = {
    base: undefined,
    withTraceId: undefined,
    user: undefined,
    withUser: undefined,
    tenant: undefined,
    withTenant: undefined,
    snapshot: undefined,
    withSnapshot: undefined,
}
