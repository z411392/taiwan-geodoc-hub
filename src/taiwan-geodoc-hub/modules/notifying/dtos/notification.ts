import { type Topic } from "@/taiwan-geodoc-hub/modules/general/enums/topic"
import { type TenantCreated } from "@/taiwan-geodoc-hub/modules/tenant-managing/events/tenant-created"
import { type TenantApproved } from "@/taiwan-geodoc-hub/modules/tenant-managing/events/tenant-approved"
import { type SnapshotUploaded } from "@/taiwan-geodoc-hub/modules/registration-managing/events/snapshot-uploaded"
import { type SnapshotRenamed } from "@/taiwan-geodoc-hub/modules/registration-managing/events/snapshot-renamed"
import { type TenantDeleted } from "@/taiwan-geodoc-hub/modules/tenant-managing/events/tenant-deleted"

type PayloadMap = {
    [Topic.TenantCreated]: TenantCreated
    [Topic.TenantApproved]: TenantApproved
    [Topic.SnapshotUploaded]: SnapshotUploaded
    [Topic.SnapshotRenamed]: SnapshotRenamed
    [Topic.TenantDeleted]: TenantDeleted
}

export type Notification<T extends Topic = any> = {
    id: string
    timestamp: number
    source: {
        topic: T
    }
    payload: PayloadMap[T]
}
