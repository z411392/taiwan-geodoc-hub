import { type Role, Roles } from "@/lib/constants/roles"
import { Scopes } from "@/lib/constants/scopes"

export class ScopeDao {
  async scopesOfRole(role: Role) {
    if (role === Roles.User) {
      return [
        Scopes.ViewDashboard,
        Scopes.BrowseTranscripts,
        Scopes.UploadTranscripts,
        Scopes.ParseTranscripts,
        Scopes.BrowseAnnouncedValuesCrawled,
        Scopes.CrawlAnnouncedValues,
      ]
    }
    if (role === Roles.Manager) {
      return [
        Scopes.ViewDashboard,
        Scopes.BrowseTranscripts,
        Scopes.UploadTranscripts,
        Scopes.ParseTranscripts,
        Scopes.BrowseAnnouncedValuesCrawled,
        Scopes.CrawlAnnouncedValues,
        Scopes.BrowsePointsHistory,
        Scopes.BrowseMembers,
        Scopes.InviteMembers,
        Scopes.RemoveMembers,
        Scopes.AssignMemberRole,
      ]
    }
    return [
      Scopes.ViewDashboard,
      Scopes.BrowseTranscripts,
      Scopes.UploadTranscripts,
      Scopes.ParseTranscripts,
      Scopes.BrowseAnnouncedValuesCrawled,
      Scopes.CrawlAnnouncedValues,
      Scopes.BrowsePointsHistory,
      Scopes.DepositPoints,
      Scopes.BrowseMembers,
      Scopes.InviteMembers,
      Scopes.RemoveMembers,
      Scopes.AssignMemberRole,
      Scopes.ChangeTenantSettings,
    ]
  }
}
