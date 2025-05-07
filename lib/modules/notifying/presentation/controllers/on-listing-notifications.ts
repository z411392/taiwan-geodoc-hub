import {
  ListNotifications,
  type ListingNotifications,
} from "@/lib/modules/notifying/application/queries/list-notifications"
import { NotificationDao } from "@/lib/adapters/notification-dao"

export const onListingNotifications = async (query: ListingNotifications) => {
  const handler = new ListNotifications({
    notificationDao: new NotificationDao({ tenantId: query.tenantId }),
  })
  return await handler(query)
}
