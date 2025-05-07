import { Scopes, type Scope } from "@/lib/constants/scopes"

export enum ActivityStatuses {
  Success = "success",
  Processing = "processing",
  Failed = "failed",
  Completed = "completed",
}

export type ActivityStatus = `${ActivityStatuses}`

export interface Activity {
  type: Scope
  status: ActivityStatus
  date: string
  payload: Record<string, string>
}

export class ActivityDao {
  async activities(_tenantId: string) {
    return [
      {
        type: Scopes.ParseTranscripts,
        status: `${ActivityStatuses.Success}`,
        date: "2023/12/20 14:30",
        payload: {
          file: "台北市大安區xxx.pdf",
        },
      },
      {
        type: Scopes.CrawlAnnouncedValues,
        status: `${ActivityStatuses.Processing}`,
        date: "2023/12/19 10:15",
        payload: {
          location: "新北市板橋區",
        },
      },
      {
        type: Scopes.UploadTranscripts,
        status: `${ActivityStatuses.Failed}`,
        date: "2023/12/18 09:45",
        payload: {
          file: "台北市信義區xxx.pdf",
        },
      },
      {
        type: Scopes.DepositPoints,
        status: `${ActivityStatuses.Completed}`,
        date: "2023/12/15 16:20",
        payload: {
          amount: "+100",
        },
      },
    ] as Activity[]
  }
}
