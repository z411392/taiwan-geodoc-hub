import { type Event } from "@/taiwan-geodoc-hub/modules/general/enums/event"

export type Notification<T extends keyof Event = any> = {
    id: string
    timestamp: number
    source: {
        topic: T
    }
    payload: Event[T]
}

export type NotificationWithReadStatus<T extends keyof Event = any> =
    Notification<T> & {
        read: boolean
    }
