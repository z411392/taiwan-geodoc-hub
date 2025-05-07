import {
  ListSnapshots,
  type ListingSnapshots,
} from "@/lib/modules/snapshots-parsing/application/queries/list-snapshots"
import { SnapshotDao } from "@/lib/adapters/snapshot-dao"

export const onListingSnapshots = async (query: ListingSnapshots) => {
  const handler = new ListSnapshots({
    snapshotDao: new SnapshotDao({ tenantId: query.tenantId }),
  })
  return await handler(query)
}
