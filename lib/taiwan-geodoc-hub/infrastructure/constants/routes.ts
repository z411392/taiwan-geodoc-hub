export enum Pages {
    SignIn = "/auth/sign-in",
    SignOut = "/auth/sign-out",
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

export const PublicPages: Array<Pages> = [
    Pages.SignIn,
    Pages.PrivacyPolicy,
    Pages.TermsOfUse,
] as const

export type PublicPage = (typeof PublicPages)[number]

export enum APIRoutes {
    SignIn = "/api/auth/sign-in",
    SignOut = "/api/auth/sign-out",
}
