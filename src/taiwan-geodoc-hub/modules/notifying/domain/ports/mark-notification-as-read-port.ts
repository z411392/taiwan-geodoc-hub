export abstract class MarkNotificationAsReadPort {
    abstract markAsRead(notificationId: string): Promise<void>
}
