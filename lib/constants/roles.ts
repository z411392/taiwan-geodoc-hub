export enum Roles {
  Administrator = "administrator",
  Manager = "manager",
  User = "user",
}

export type Role = `${Roles}`

export const AdministratorRoles: Array<Role> = [
  Roles.Manager,
  Roles.Administrator,
] as const
