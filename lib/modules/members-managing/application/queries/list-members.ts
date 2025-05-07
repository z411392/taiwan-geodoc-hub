import CallableInstance from "callable-instance"
import { MemberDao, type Member } from "@/lib/adapters/member-dao"
import { type Role } from "@/lib/constants/roles"

export interface ListingMembers {
  tenantId: string
  role?: Role
  keyword: string
  page: number
}

export class ListMembers extends CallableInstance<
  [ListingMembers],
  Promise<{ records: Member[]; total: number }>
> {
  protected memberDao: MemberDao
  constructor({ memberDao }: { memberDao: MemberDao }) {
    super("execute")
    this.memberDao = memberDao
  }
  async execute({ role, keyword, page }: ListingMembers) {
    return this.memberDao.byPage({ role, keyword, page })
  }
}
