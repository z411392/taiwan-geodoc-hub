import { context } from "./context"
import { container as parentContainer } from "tsyringe"
import { Settings } from "luxon"
import { setupFirebase } from "@/taiwan-geodoc-hub/utils/firebase/setup-firebase"

export const startup = async (clientSide: boolean = true) => {
    Settings.defaultZone = process.env.TZ!
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
    await import("@/taiwan-geodoc-hub/modules/transaction-managing")
    await import("@/taiwan-geodoc-hub/modules/values-crawling")
    context["container"] = container
    return container
}
