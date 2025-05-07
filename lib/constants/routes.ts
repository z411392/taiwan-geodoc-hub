export enum Routes {
  SignIn = "/auth/sign-in",
  TermsOfUse = "/terms-of-use",
  PrivacyPolicy = "/privacy-policy",
  TenantSelection = "/tenants",
  Tenant = "/tenants/[tenantId]",
  Dashboard = "/tenants/[tenantId]/dashboard",
  Transactions = "/tenants/[tenantId]/transactions",
  Snapshots = "/tenants/[tenantId]/snapshots",
  Registrations = "/tenants/[tenantId]/snapshots/[snapshotId]/registrations",
  Values = "/tenants/[tenantId]/values",
  Members = "/tenants/[tenantId]/members",
  Notifications = "/tenants/[tenantId]/notifications",
  Root = "/",
}

export type Route = `${Routes}`

export const PublicRoutes: Array<Route> = [
  Routes.SignIn,
  Routes.PrivacyPolicy,
  Routes.TermsOfUse,
] as const

export type PublicRoute = (typeof PublicRoutes)[number]
