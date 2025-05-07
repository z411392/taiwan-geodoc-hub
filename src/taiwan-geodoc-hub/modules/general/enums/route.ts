export enum Route {
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

export enum APIRoutes {
    SignIn = "/api/auth/sign-in",
    SignOut = "/api/auth/sign-out",
}
