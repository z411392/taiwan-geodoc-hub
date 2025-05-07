import { context } from "./context"
import { disposeFirebase } from "@/taiwan-geodoc-hub/utils/firebase/dispose-firebase"

export const shutdown = async (clientSide: boolean = true) => {
    if (clientSide) disposeFirebase()
    context["container"] = undefined
}
