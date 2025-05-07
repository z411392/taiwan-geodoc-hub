export enum EventTypes {
  SnapshotParsed = "snapshot-parsed",
  SnapshotFailed = "snapshot-failed",
  MemberJoined = "member-joined",
}

export type EventType = `${EventTypes}`

export type Event<T extends EventTypes> = {
  id: string
  timestamp: number
  type: EventType
  payload: T extends EventTypes.SnapshotParsed
    ? {
        file: string
      }
    : T extends EventTypes.SnapshotFailed
      ? {
          file: string
        }
      : T extends EventTypes.MemberJoined
        ? {
            name: string
          }
        : unknown
}
