export enum EventTypes {
    SnapshotParsed = "snapshot-parsed",
    SnapshotFailed = "snapshot-failed",
    MemberJoined = "member-joined",
}

export type Event<T extends EventTypes> = {
    id: string
    timestamp: number
    type: `${EventTypes}`
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
