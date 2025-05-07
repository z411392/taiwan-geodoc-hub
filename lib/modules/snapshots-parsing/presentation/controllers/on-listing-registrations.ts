import {
  ListRegistrations,
  type ListingRegistrations,
} from "@/lib/modules/snapshots-parsing/application/queries/list-registrations"
import { RegistrationDao } from "@/lib/adapters/registration-dao"

export const onListingRegistrations = async (query: ListingRegistrations) => {
  const handler = new ListRegistrations({
    registrationDao: new RegistrationDao({
      tenantId: query.tenantId,
      snapshotId: query.snapshotId,
    }),
  })
  return await handler(query)
}
