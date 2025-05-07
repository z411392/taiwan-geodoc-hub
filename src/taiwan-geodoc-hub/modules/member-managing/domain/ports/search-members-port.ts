import { type Member } from "@/taiwan-geodoc-hub/modules/member-managing/dtos/member"
import { type RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"

export abstract class SearchMembersPort {
    abstract search(
        role: `${RoleType}` | undefined,
        q: string,
        page: number,
    ): Promise<{ records: Member[]; total: number }>
}
