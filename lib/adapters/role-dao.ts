import { type Role, Roles } from "@/lib/constants/roles"

export type RolesMap = Record<string, Role>

export class RoleDao {
  async roleOfUserUnder(
    userId: string,
    tenantId: string,
  ): Promise<Role | undefined> {
    const rolesMap = await this.rolesOfUser(userId)
    return rolesMap[tenantId]
  }
  async rolesOfUser(_userId: string) {
    return {
      "1": Roles.Administrator,
      "2": Roles.Manager,
      "3": Roles.User,
    } as RolesMap
  }
}
