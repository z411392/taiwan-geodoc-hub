import {
  type RetrievingProfile,
  RetrieveProfile,
} from "@/lib/modules/access-managing/application/queries/retrieve-profile"
import { TenantDao } from "@/lib/adapters/tenant-dao"
import { UserDao } from "@/lib/adapters/user-dao"
import { RoleDao } from "@/lib/adapters/role-dao"
import { ScopeDao } from "@/lib/adapters/scope-dao"

export const onRetrievingProfile = async (query: RetrievingProfile) => {
  const handler = new RetrieveProfile({
    tenantDao: new TenantDao(),
    userDao: new UserDao(),
    roleDao: new RoleDao(),
    scopeDao: new ScopeDao(),
  })
  const profile = await handler(query)
  return profile
}
