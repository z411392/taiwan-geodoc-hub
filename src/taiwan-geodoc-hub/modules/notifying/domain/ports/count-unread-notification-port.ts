export abstract class CountUnreadNotificationPort {
    abstract count(): Promise<number>
}
