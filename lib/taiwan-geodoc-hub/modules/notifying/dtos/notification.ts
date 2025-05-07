import { Severities } from "@/taiwan-geodoc-hub/infrastructure/constants/severities"
import {
    EventTypes,
    type Event,
} from "@/taiwan-geodoc-hub/infrastructure/constants/events"

export type Notification<T extends EventTypes> = Event<T> & {
    read: boolean
    severity: `${Severities}`
}
