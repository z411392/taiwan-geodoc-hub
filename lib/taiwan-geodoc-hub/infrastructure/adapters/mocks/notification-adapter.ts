import { Severities } from "@/taiwan-geodoc-hub/infrastructure/constants/severities"
import { EventTypes } from "@/taiwan-geodoc-hub/infrastructure/constants/events"
import { type Notification } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"
import { type NotificationDao } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/notification-dao"
import { injectable, inject } from "tsyringe"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

@injectable()
export class NotificationAdapter implements NotificationDao {
    constructor(
        @inject(idTokenToken) protected idToken: string,
        @inject(tenantIdToken) protected tenantId: string,
    ) {}
    async byPage(_severity: `${Severities}` | undefined, _page: number) {
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
    async countUnread() {
        return 5
    }
}
