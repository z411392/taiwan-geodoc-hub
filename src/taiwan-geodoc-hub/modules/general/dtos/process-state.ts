import { type ProcessStatus } from "@/taiwan-geodoc-hub/modules/general/enums/process-status"

type ProcessStatePayloadMap = {
    [ProcessStatus.Pending]: {}
    [ProcessStatus.Progressing]: {}
    [ProcessStatus.Completed]: {}
    [ProcessStatus.Failed]: { reason: string }
}

export type ProcessState<T extends ProcessStatus = any> = {
    id: string
    status: `${T}`
} & ProcessStatePayloadMap[T]
