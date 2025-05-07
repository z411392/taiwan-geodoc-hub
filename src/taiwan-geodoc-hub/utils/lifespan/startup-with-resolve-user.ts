import { context } from "./context"
import { startupWithResolveTraceId } from "./startup-with-resolve-trace-id"
import { resolveTokens } from "~/auth/resolve-tokens"
import { resolveUser } from "~/auth/resolve-user"
import { Unauthorized } from "@/taiwan-geodoc-hub/modules/access-controlling/exceptions/unauthorized"
import {
    IdToken,
    UserId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"

export const startupWithResolveUser = async () => {
    if (!context["withUser"]) {
        const container = await startupWithResolveTraceId()
        const tokens = await resolveTokens()
        if (!tokens) throw new Unauthorized()
        const user = resolveUser(tokens.decodedToken)
        container.register(UserId, { useValue: user.uid })
        container.register(IdToken, { useValue: tokens.token })
        context["user"] = user
        context["withUser"] = container
    }
    return context["withUser"]
}
