import { type User } from "firebase/auth"
import { type RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"

export abstract class SearchMembersPort {
    abstract search(
        page: number,
        role: `${RoleType}` | undefined,
        q: string,
    ): Promise<{
        records: Array<User & { role: `${RoleType}` }>
        total: number
    }>
}
