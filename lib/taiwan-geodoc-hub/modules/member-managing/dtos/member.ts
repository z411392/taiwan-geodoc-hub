import { type Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"

export type Member = {
    id: string
    name: string
    email: string
    role: `${Roles}`
    createdAt: number
    updatedAt: number
}
