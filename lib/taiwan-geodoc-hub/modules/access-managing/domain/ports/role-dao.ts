import { type RoleDescriptor } from "@/taiwan-geodoc-hub/modules/access-managing/dtos/role-descriptor"

export abstract class RoleDao {
    abstract all(): Promise<RoleDescriptor[]>
}
