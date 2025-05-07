import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"

export abstract class SnapshotDao {
    abstract byId(snapshotId: string): Promise<Snapshot>

    abstract byPage(
        keyword: string,
        page: number,
    ): Promise<{ records: Snapshot[]; total: number }>
}
