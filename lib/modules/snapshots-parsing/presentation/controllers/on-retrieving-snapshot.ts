import {
  RetrieveSnapshot,
  type RetrievingSnapshot,
} from "@/lib/modules/snapshots-parsing/application/queries/retrieve-snapshot"
import { SnapshotDao } from "@/lib/adapters/snapshot-dao"

export const onRetrievingSnapshot = async (query: RetrievingSnapshot) => {
  const handler = new RetrieveSnapshot({
    snapshotDao: new SnapshotDao({ tenantId: query.tenantId }),
  })
  return await handler(query)
}
