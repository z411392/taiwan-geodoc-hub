export enum Scopes {
  ViewDashboard = "dashboard.view",
  BrowseTranscripts = "transcripts.browse",
  UploadTranscripts = "transcripts.upload",
  ParseTranscripts = "transcripts.parse",
  BrowseAnnouncedValuesCrawled = "values.browse",
  CrawlAnnouncedValues = "values.crawl",
  BrowsePointsHistory = "points.browse",
  DepositPoints = "points.deposit",
  BrowseMembers = "members.browse",
  InviteMembers = "members.invite",
  RemoveMembers = "members.remove",
  AssignMemberRole = "members.role",
  ChangeTenantSettings = "settings.update",
}

export type Scope = `${Scopes}`
