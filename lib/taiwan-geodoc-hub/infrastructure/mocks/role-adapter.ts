import { injectable, inject } from "tsyringe"
import { Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"
import { type RoleDao } from "@/taiwan-geodoc-hub/modules/access-managing/domain/ports/role-dao"
import { idTokenToken } from "@/taiwan-geodoc-hub/infrastructure/types"

@injectable()
export class RoleAdapter implements RoleDao {
    constructor(@inject(idTokenToken) protected readonly idToken: string) {}
    async all() {
        return [
            {
                tenantId: "1",
                role: `${Roles.Manager}` as `${Roles}`,
            },
            {
                tenantId: "2",
                role: `${Roles.Manager}` as `${Roles}`,
            },
            {
                tenantId: "3",
                role: `${Roles.Member}` as `${Roles}`,
            },
        ]
    }
}
