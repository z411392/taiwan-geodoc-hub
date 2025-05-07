import { type Role, Roles } from "@/lib/constants/roles"

export type RolesMap = Record<string, Role>

export class RoleDao {
  async map(_userId: string) {
    return {
      "1": Roles.Administrator,
      "2": Roles.Manager,
      "3": Roles.Member,
    } as RolesMap
  }
}
