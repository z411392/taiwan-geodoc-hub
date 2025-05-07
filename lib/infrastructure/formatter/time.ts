import { type MomentParams, Moments } from "@/lib/constants/moments"
import { DateTime } from "luxon"

export const toHumanReadable = (
  milis: number,
  now: number = Date.now(),
): [`${Moments}`, MomentParams<`${Moments}`>] => {
  const diff = now - milis
  let seconds = Math.floor(diff / 1000)
  let minutes = Math.floor(seconds / 60)
  if (minutes <= 0) return [`${Moments.JustNow}`, {}]
  seconds = seconds % 60
  let hours = Math.floor(minutes / 60)
  if (hours <= 0) return [`${Moments.MinutesAgo}`, { minutes }]
  minutes = seconds % 60
  const days = Math.floor(hours / 24)
  hours = hours % 24
  if (days <= 0) return [`${Moments.HoursAgo}`, { hours }]
  const date = DateTime.fromMillis(milis).toFormat("yyyy-MM-dd")
  return [`${Moments.Earlier}`, { date }]
}
