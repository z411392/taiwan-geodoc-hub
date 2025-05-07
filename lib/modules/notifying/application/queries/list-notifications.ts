import CallableInstance from "callable-instance"
import {
  type NotificationDao,
  type Notification,
} from "@/lib/adapters/notification-dao"
import { type EventTypes } from "@/lib/constants/events"
import { type Severity } from "@/lib/constants/severities"

export interface ListingNotifications {
  tenantId: string
  page: number
  keyword: string
  severity?: Severity
}

export class ListNotifications extends CallableInstance<
  [ListingNotifications],
  Promise<{ records: Notification<EventTypes>[]; total: number }>
> {
  protected notificationDao: NotificationDao
  constructor({ notificationDao }: { notificationDao: NotificationDao }) {
    super("execute")
    this.notificationDao = notificationDao
  }
  async execute({ page, keyword, severity }: ListingNotifications) {
    return await this.notificationDao.byPage({ severity, keyword, page })
  }
}
