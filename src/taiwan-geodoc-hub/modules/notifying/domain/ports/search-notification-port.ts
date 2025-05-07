import { type Notification } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"

export abstract class SearchNotificationPort {
    abstract search(
        page: number,
    ): Promise<{ records: Notification[]; total: number }>
}
