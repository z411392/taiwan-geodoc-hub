import { DateTime } from "luxon"
import { Moment } from "@/taiwan-geodoc-hub/modules/general/enums/moment"
import CallableInstance from "callable-instance"

export type MomentParams = {
    [Moment.JustNow]: Record<string, string | number | Date>
    [Moment.MinutesAgo]: { minutes: number }
    [Moment.HoursAgo]: { hours: number }
    [Moment.Earlier]: { date: string }
}

export class HumanReadableFormatter extends CallableInstance<
    [number, number],
    [`${Moment}`, MomentParams[`${Moment}`]]
> {
    constructor() {
        super(`execute`)
    }

    execute(millis: number, now: number = Date.now()) {
        const diff = now - millis
        let seconds = Math.floor(diff / 1000)
        let minutes = Math.floor(seconds / 60)
        if (minutes <= 0) return [`${Moment.JustNow}`, {}]
        seconds = seconds % 60
        let hours = Math.floor(minutes / 60)
        if (hours <= 0) return [`${Moment.MinutesAgo}`, { minutes }]
        minutes = seconds % 60
        const days = Math.floor(hours / 24)
        hours = hours % 24
        if (days <= 0) return [`${Moment.HoursAgo}`, { hours }]
        const date = DateTime.fromMillis(millis).toFormat("yyyy-LL-dd")
        return [`${Moment.Earlier}`, { date }]
    }
}
