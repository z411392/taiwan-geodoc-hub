import { type Notification } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"
import { type EventTypes } from "@/taiwan-geodoc-hub/infrastructure/constants/events"
import { type Severities } from "@/taiwan-geodoc-hub/infrastructure/constants/severities"

export abstract class NotificationDao {
    abstract byPage(
        severity: `${Severities}` | undefined,
        page: number,
    ): Promise<{ records: Notification<EventTypes>[]; total: number }>

    abstract countUnread(): Promise<number>
}
