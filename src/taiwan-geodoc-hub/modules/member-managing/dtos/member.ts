import { type RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"

export type Member = {
    id: string
    name: string
    email: string
    role: `${RoleType}`
    createdAt: number
    updatedAt: number
}
