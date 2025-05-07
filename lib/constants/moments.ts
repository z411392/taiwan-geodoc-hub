export enum Moments {
  JustNow = "just-now",
  MinutesAgo = "minutes-ago",
  HoursAgo = "hours-ago",
  Earlier = "earlier",
}

export type Moment = `${Moments}`

export type MomentParams<T extends Moment> = T extends Moments.JustNow
  ? Record<string, string | number | Date>
  : T extends Moments.MinutesAgo
    ? { minutes: number }
    : T extends Moments.HoursAgo
      ? { hours: number }
      : T extends Moments.Earlier
        ? { date: string }
        : Record<string, string | number | Date>
