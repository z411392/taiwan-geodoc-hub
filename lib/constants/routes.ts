export enum Routes {
  SignIn = "/auth/sign-in",
  TermsOfUse = "/terms-of-use",
  PrivacyPolicy = "/privacy-policy",
  TenantSelection = "/tenants",
  Dashboard = "/tenants/[tenantId]/dashboard",
  Transactions = "/tenants/[tenantId]/transactions",
  Transcripts = "/tenants/[tenantId]/transcripts",
  Values = "/tenants/[tenantId]/values",
  Tenant = "/tenants/[tenantId]/settings",
  Members = "/tenants/[tenantId]/members",
  Notifications = "/tenants/[tenantId]/notifications",
}

export type Route = `${Routes}`

export const PublicRoutes: Array<Route> = [
  Routes.SignIn,
  Routes.PrivacyPolicy,
  Routes.TermsOfUse,
] as const

export type PublicRoute = (typeof PublicRoutes)[number]
