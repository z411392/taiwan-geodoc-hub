import { type Severity, Severities } from "@/lib/constants/severities"
import { EventTypes, type Event } from "@/lib/constants/events"

export type Notification<T extends EventTypes> = Event<T> & {
  read: boolean
  severity: Severity
}

export class NotificationDao {
  constructor({ tenantId: _ }: { tenantId: string }) {}
  async byPage({
    page: _page,
    keyword: _keyword,
    severity: _severity,
  }: {
    page: number
    keyword: string
    severity?: Severity
  }) {
    const now = Date.now()
    const notifications: Notification<EventTypes>[] = [
      {
        id: "1",
        type: `${EventTypes.SnapshotParsed}`,
        payload: {
          file: "台北市大安區xxx.pdf",
        },
        timestamp: now,
        read: false,
        severity: `${Severities.Success}`,
      },
      {
        id: "2",
        type: `${EventTypes.MemberJoined}`,
        payload: {
          name: "李小華",
        },
        timestamp: now - 3600_000,
        read: true,
        severity: `${Severities.Success}`,
      },
      {
        id: "3",
        type: `${EventTypes.SnapshotFailed}`,
        payload: {
          file: "台北市信義區xxx.pdf",
        },
        timestamp: now - 3600_000 * 24,
        read: true,
        severity: `${Severities.Error}`,
      },
    ]
    const total = 50
    return {
      records: notifications,
      total,
    }
  }
}
