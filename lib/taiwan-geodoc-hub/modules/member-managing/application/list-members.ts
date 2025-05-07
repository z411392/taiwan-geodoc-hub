import CallableInstance from "callable-instance"
import { injectable, inject } from "tsyringe"
import { type Member } from "@/taiwan-geodoc-hub/modules/member-managing/dtos/member"
import { MemberDao } from "@/taiwan-geodoc-hub/modules/member-managing/domain/ports/member-dao"
import { type Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class ListMembers extends CallableInstance<
    [`${Roles}` | undefined, string, number],
    Promise<{ records: Member[]; total: number }>
> {
    constructor(
        @inject(MemberDao as NonAbstractClass<MemberDao>)
        protected memberDao: MemberDao,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute(role: `${Roles}` | undefined, keyword: string, page: number) {
        const start = Date.now()
        try {
            const members = await this.memberDao.byPage(role, keyword, page)
            const elapsed = Date.now() - start
            this.logger.info("ListMembers executed", { elapsed })
            return members
        } catch (thrown) {
            this.logger.error("ListMembers failed", { thrown })
            throw thrown
        }
    }
}
