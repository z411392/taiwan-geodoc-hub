import { type Role, Roles } from "@/lib/constants/roles"
import { Scopes } from "@/lib/constants/scopes"

export class ScopeDao {
  async all({
    userId: _userId,
    tenantId: _tenantId,
    role,
  }: {
    userId: string
    tenantId: string
    role: Role
  }) {
    if (role === Roles.Member) {
      return [
        Scopes.ViewDashboard,
        Scopes.BrowseSnapshots,
        Scopes.UploadSnapshots,
        Scopes.ParseSnapshots,
        Scopes.BrowseValuesCrawled,
        Scopes.CrawlValues,
      ]
    }
    if (role === Roles.Manager) {
      return [
        Scopes.ViewDashboard,
        Scopes.BrowseSnapshots,
        Scopes.UploadSnapshots,
        Scopes.ParseSnapshots,
        Scopes.BrowseValuesCrawled,
        Scopes.CrawlValues,
        Scopes.BrowseTransactions,
        Scopes.BrowseMembers,
        Scopes.InviteMembers,
        Scopes.RemoveMembers,
        Scopes.AssignMemberRole,
      ]
    }
    return [
      Scopes.ViewDashboard,
      Scopes.BrowseSnapshots,
      Scopes.UploadSnapshots,
      Scopes.ParseSnapshots,
      Scopes.BrowseValuesCrawled,
      Scopes.CrawlValues,
      Scopes.BrowseTransactions,
      Scopes.TopUpTransactions,
      Scopes.BrowseMembers,
      Scopes.InviteMembers,
      Scopes.RemoveMembers,
      Scopes.AssignMemberRole,
    ]
  }
}
