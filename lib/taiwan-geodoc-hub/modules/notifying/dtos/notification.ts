import { Severities } from "@/taiwan-geodoc-hub/infrastructure/severities"
import {
    EventTypes,
    type Event,
} from "@/taiwan-geodoc-hub/infrastructure/events"

export type Notification<T extends EventTypes> = Event<T> & {
    read: boolean
    severity: `${Severities}`
}
