import { registry } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { CountUnreadNotificationPort } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/count-unread-notification-port"
import { SearchNotificationPort } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/search-notification-port"
import { NotificationHttpAdapter } from "@/taiwan-geodoc-hub/adapters/http/notification-http-adapter"
import { MarkNotificationAsReadPort } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/mark-notification-as-read-port"
@registry([
    {
        token: CountUnreadNotificationPort as NonAbstractClass<CountUnreadNotificationPort>,
        useClass: NotificationHttpAdapter,
    },
    {
        token: SearchNotificationPort as NonAbstractClass<SearchNotificationPort>,
        useClass: NotificationHttpAdapter,
    },
    {
        token: MarkNotificationAsReadPort as NonAbstractClass<MarkNotificationAsReadPort>,
        useClass: NotificationHttpAdapter,
    },
])
export abstract class NotifyingModule {}
