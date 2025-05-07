import { redirect } from "next/navigation"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"

export default function () {
    return redirect(Route.TenantSelection)
}
