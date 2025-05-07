import { type Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"

export type RoleDescriptor = {
    tenantId: string
    role: `${Roles}`
}
