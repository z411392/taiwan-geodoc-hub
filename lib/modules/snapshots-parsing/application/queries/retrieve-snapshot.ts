import CallableInstance from "callable-instance"
import { type Snapshot, type SnapshotDao } from "@/lib/adapters/snapshot-dao"

export interface RetrievingSnapshot {
  tenantId: string
  snapshotId: string
}

export class RetrieveSnapshot extends CallableInstance<
  [RetrievingSnapshot],
  Promise<Snapshot>
> {
  protected snapshotDao: SnapshotDao
  constructor({ snapshotDao }: { snapshotDao: SnapshotDao }) {
    super("execute")
    this.snapshotDao = snapshotDao
  }

  async execute({ snapshotId }: RetrievingSnapshot) {
    const snapshot = await this.snapshotDao.byId(snapshotId)
    return snapshot
  }
}
