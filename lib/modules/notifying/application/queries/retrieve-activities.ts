import CallableInstance from "callable-instance"
import { type ActivityDao, type Activity } from "@/lib/adapters/activity-dao"

export interface RetrievingActivities {
  tenantId: string
}

export class RetrieveActivities extends CallableInstance<
  [RetrievingActivities],
  Promise<Activity[]>
> {
  protected activityDao: ActivityDao
  constructor({ activityDao }: { activityDao: ActivityDao }) {
    super("execute")
    this.activityDao = activityDao
  }
  async execute({ tenantId }: RetrievingActivities) {
    return await this.activityDao.activities(tenantId)
  }
}
