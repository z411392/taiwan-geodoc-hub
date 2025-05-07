import { registry } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { SearchTenantPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/search-tenant-port"
import { TenantHttpAdapter } from "@/taiwan-geodoc-hub/adapters/http/tenant-http-adapter"
import { CreateTenantPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/create-tenant-port"
import { GetTenantByIdPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/get-tenant-by-id-port"

@registry([
    {
        token: SearchTenantPort as NonAbstractClass<SearchTenantPort>,
        useClass: TenantHttpAdapter,
    },
    {
        token: CreateTenantPort as NonAbstractClass<CreateTenantPort>,
        useClass: TenantHttpAdapter,
    },
    {
        token: GetTenantByIdPort as NonAbstractClass<GetTenantByIdPort>,
        useClass: TenantHttpAdapter,
    },
])
export abstract class TenantManagingModule {}
