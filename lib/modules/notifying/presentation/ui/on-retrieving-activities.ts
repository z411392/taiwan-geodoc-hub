import {
  RetrieveActivities,
  type RetrievingActivities,
} from "@/lib/modules/notifying/application/queries/retrieve-activities"
import { ActivityDao } from "@/lib/adapters/activity-dao"

export const onRetrievingActivities = async (query: RetrievingActivities) => {
  const handler = new RetrieveActivities({
    activityDao: new ActivityDao(),
  })
  return await handler(query)
}
