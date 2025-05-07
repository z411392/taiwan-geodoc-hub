import CallableInstance from "callable-instance"
import { injectable, inject } from "tsyringe"
import { type Member } from "@/taiwan-geodoc-hub/modules/member-managing/dtos/member"
import { MemberDao } from "@/taiwan-geodoc-hub/modules/member-managing/domain/ports/member-dao"
import { type Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type ListingMembers = [`${Roles}` | undefined, string, number]

@injectable()
export class ListMembers extends CallableInstance<
    ListingMembers,
    Promise<{ records: Member[]; total: number }>
> {
    constructor(
        @inject(MemberDao as NonAbstractClass<MemberDao>)
        protected memberDao: MemberDao,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute(role: `${Roles}` | undefined, keyword: string, page: number) {
        const timestamp = Date.now()
        try {
            const members = await this.memberDao.byPage(role, keyword, page)
            return members
        } catch (thrown) {
            this.logger.error({
                name: this.constructor.name,
                message:
                    thrown instanceof Error ? thrown.message : String(thrown),
            })
            throw thrown
        } finally {
            const duration = Date.now() - timestamp
            this.logger.info({
                name: this.constructor.name,
                timestamp,
                duration,
                data: {
                    role,
                    keyword,
                    page,
                },
            })
        }
    }
}
