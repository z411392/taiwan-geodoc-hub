import { redirect } from "next/navigation"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"

export default function HomePage() {
    return redirect(Route.TenantSelection)
}
