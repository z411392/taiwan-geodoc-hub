import CallableInstance from "callable-instance"
import {
  type RegistrationDao,
  type Registration,
} from "@/lib/adapters/registration-dao"

export interface ListingRegistrations {
  tenantId: string
  snapshotId: string
}

export class ListRegistrations extends CallableInstance<
  [ListingRegistrations],
  Promise<Registration[]>
> {
  protected registrationDao: RegistrationDao
  constructor({ registrationDao }: { registrationDao: RegistrationDao }) {
    super("execute")
    this.registrationDao = registrationDao
  }
  async execute({}: ListingRegistrations) {
    const registrations = await this.registrationDao.all()
    return registrations
  }
}
