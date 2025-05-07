import { context } from "./context"
import { Settings } from "luxon"
import { setupFirebase } from "@/taiwan-geodoc-hub/utils/firebase/setup-firebase"

export const startup = async (clientSide: boolean = false) => {
    Settings.defaultZone = process.env.TZ!
    const { container: parentContainer } = await import("tsyringe")
    const container = parentContainer.createChildContainer()
    if (clientSide) await setupFirebase()
    await import("@/taiwan-geodoc-hub/modules/general")
    await import("@/taiwan-geodoc-hub/modules/access-controlling")
    await import("@/taiwan-geodoc-hub/modules/customer-supporting")
    await import("@/taiwan-geodoc-hub/modules/member-managing")
    await import("@/taiwan-geodoc-hub/modules/notifying")
    await import("@/taiwan-geodoc-hub/modules/registration-managing")
    await import("@/taiwan-geodoc-hub/modules/reporting")
    await import("@/taiwan-geodoc-hub/modules/tenant-managing")
    await import("@/taiwan-geodoc-hub/modules/auditing")
    await import("@/taiwan-geodoc-hub/modules/values-crawling")
    context["base"] = container
    return container
}
