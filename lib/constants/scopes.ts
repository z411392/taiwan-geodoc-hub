export enum Scopes {
  ViewDashboard = "dashboard.view",
  BrowseTranscripts = "transcripts.browse",
  UploadTranscripts = "transcripts.upload",
  ParseTranscripts = "transcripts.parse",
  BrowseValuesCrawled = "values.browse",
  CrawlValues = "values.crawl",
  BrowseTransactions = "points.browse",
  TopUpTransactions = "points.top-up",
  BrowseMembers = "members.browse",
  InviteMembers = "members.invite",
  RemoveMembers = "members.remove",
  AssignMemberRole = "members.role",
  ChangeTenantSettings = "settings.update",
}

export type Scope = `${Scopes}`
