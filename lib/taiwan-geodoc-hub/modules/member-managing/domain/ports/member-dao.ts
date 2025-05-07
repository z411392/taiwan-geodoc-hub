import { type Member } from "@/taiwan-geodoc-hub/modules/member-managing/dtos/member"
import { type Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"

export abstract class MemberDao {
    abstract byPage(
        role: `${Roles}` | undefined,
        keyword: string,
        page: number,
    ): Promise<{ records: Member[]; total: number }>
}
