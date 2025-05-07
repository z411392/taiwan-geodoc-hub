import CallableInstance from "callable-instance"
import { type UserDao } from "@/lib/adapters/user-dao"
import { type TenantDao, type Tenant } from "@/lib/adapters/tenant-dao"
import { type RoleDao } from "@/lib/adapters/role-dao"
import InvalidSessionCookie from "@/lib/modules/access-managing//exceptions/invalid-session-cookie"
import { type Role } from "@/lib/constants/roles"

export interface ListingTenants {
  sessionCookie: string
}

export type TenantWithRole = Tenant & {
  role: Role
}

export class ListTenants extends CallableInstance<
  [ListingTenants],
  Promise<TenantWithRole[]>
> {
  protected tenantDao: TenantDao
  protected userDao: UserDao
  protected roleDao: RoleDao
  constructor({
    userDao,
    tenantDao,
    roleDao,
  }: {
    userDao: UserDao
    tenantDao: TenantDao
    roleDao: RoleDao
  }) {
    super("execute")
    this.userDao = userDao
    this.tenantDao = tenantDao
    this.roleDao = roleDao
  }

  async execute({ sessionCookie }: ListingTenants) {
    const user = await this.userDao.userFromSessionCookie(sessionCookie)
    if (!user) throw new InvalidSessionCookie({ sessionCookie })
    const rolesMap = await this.roleDao.rolesOfUser(user.id)
    const tenantIds = Object.keys(rolesMap)
    const tenants = await this.tenantDao.tenantsInIds(...tenantIds)
    return tenants.map((tenant) => {
      const role = rolesMap[tenant.id]
      return { ...tenant, role }
    })
  }
}
