import {
  type ListingMembers,
  ListMembers,
} from "@/lib/modules/members-managing/application/queries/list-members"
import { MemberDao } from "@/lib/adapters/member-dao"

export const onListingMembers = async (query: ListingMembers) => {
  const handler = new ListMembers({
    memberDao: new MemberDao({ tenantId: query.tenantId }),
  })
  return await handler(query)
}
