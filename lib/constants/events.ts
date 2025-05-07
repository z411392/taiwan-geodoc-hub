export enum EventTypes {
  TranscriptParsed = "transcript-parsed",
  TranscriptFailed = "transcript-failed",
  MemberJoined = "member-joined",
}

export type EventType = `${EventTypes}`

export type Event<T extends EventTypes> = {
  id: string
  timestamp: number
  type: EventType
  payload: T extends EventTypes.TranscriptParsed
    ? {
        file: string
      }
    : T extends EventTypes.TranscriptFailed
      ? {
          file: string
        }
      : T extends EventTypes.MemberJoined
        ? {
            name: string
          }
        : unknown
}
