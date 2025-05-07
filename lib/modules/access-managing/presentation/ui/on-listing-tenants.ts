import {
  type ListingTenants,
  ListTenants,
} from "@/lib/modules/access-managing/application/queries/list-tenants"
import { TenantDao } from "@/lib/adapters/tenant-dao"
import { UserDao } from "@/lib/adapters/user-dao"
import { RoleDao } from "@/lib/adapters/role-dao"

export const onListingTenants = async (query: ListingTenants) => {
  const handler = new ListTenants({
    tenantDao: new TenantDao(),
    userDao: new UserDao(),
    roleDao: new RoleDao(),
  })
  const tenants = await handler(query)
  return tenants
}
