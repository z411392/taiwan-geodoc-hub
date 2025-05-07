import CallableInstance from "callable-instance"
import { type SnapshotDao, type Snapshot } from "@/lib/adapters/snapshot-dao"

export interface ListingSnapshots {
  tenantId: string
  keyword: string
  page: number
}

export class ListSnapshots extends CallableInstance<
  [ListingSnapshots],
  Promise<{ records: Snapshot[]; total: number }>
> {
  protected snapshotDao: SnapshotDao
  constructor({ snapshotDao }: { snapshotDao: SnapshotDao }) {
    super("execute")
    this.snapshotDao = snapshotDao
  }
  async execute({ keyword, page }: ListingSnapshots) {
    const snapshots = await this.snapshotDao.byPage({
      keyword,
      page,
    })
    return snapshots
  }
}
