import CallableInstance from "callable-instance"
import { type UserDao, type User } from "@/lib/adapters/user-dao"
import { type TenantDao, type Tenant } from "@/lib/adapters/tenant-dao"
import { type RoleDao } from "@/lib/adapters/role-dao"
import TenantNotFound from "@/lib/modules/access-managing/exceptions/tenant-not-found"
import InvalidSessionCookie from "@/lib/modules/access-managing//exceptions/invalid-session-cookie"
import PermissionDeinied from "@/lib/modules/access-managing/exceptions/permission-denied"
import { type Role } from "@/lib/constants/roles"
import { type ScopeDao } from "@/lib/adapters/scope-dao"
import { type Scope } from "@/lib/constants/scopes"

export interface RetrievingProfile {
  tenantId: string
  sessionCookie: string
}

export interface Profile extends User {
  tenant: Tenant
  role: Role
  scopes: Scope[]
}

export class RetrieveProfile extends CallableInstance<
  [RetrievingProfile],
  Promise<Profile>
> {
  protected tenantDao: TenantDao
  protected userDao: UserDao
  protected roleDao: RoleDao
  protected scopeDao: ScopeDao
  constructor({
    userDao,
    tenantDao,

    roleDao,
    scopeDao,
  }: {
    userDao: UserDao
    tenantDao: TenantDao

    roleDao: RoleDao
    scopeDao: ScopeDao
  }) {
    super("execute")
    this.userDao = userDao
    this.tenantDao = tenantDao
    this.roleDao = roleDao
    this.scopeDao = scopeDao
  }

  async execute({ tenantId, sessionCookie }: RetrievingProfile) {
    const user = await this.userDao.userFromSessionCookie(sessionCookie)
    if (!user) throw new InvalidSessionCookie({ sessionCookie })
    const tenant = await this.tenantDao.tenantOfId(tenantId)
    if (!tenant) throw new TenantNotFound({ tenantId })
    const role = await this.roleDao.roleOfUserUnder(user.id, tenantId)
    if (!role) throw new PermissionDeinied({ userId: user.id, tenantId })
    const scopes = await this.scopeDao.scopesOfRole(role)
    return {
      ...user,
      tenant,
      role,
      scopes,
    }
  }
}
