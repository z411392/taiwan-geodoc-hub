import { type ReactNode } from "react"
import AuthProvider from "~/composables/contexts/with-resolve-user"
import { resolveTokens } from "~/auth/resolve-tokens"
import { resolveUser } from "~/auth/resolve-user"
import { Unauthorized } from "@/taiwan-geodoc-hub/modules/access-controlling/exceptions/unauthorized"
import { startup } from "@/taiwan-geodoc-hub/utils/lifespan"
import {
    TraceId,
    IdToken,
    UserId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { TraceIdGenerator } from "@/taiwan-geodoc-hub/infrastructure/generators/trace-id-generator"

export default async function WithResolveUser({
    children,
}: {
    children: ReactNode
}) {
    const tokens = await resolveTokens()
    if (!tokens) throw new Unauthorized()
    const user = resolveUser(tokens.decodedToken)
    const [container] = await Promise.all([startup(false)])
    const nextTraceId = container.resolve(TraceIdGenerator)
    const traceId = nextTraceId()
    container.register(TraceId, { useValue: traceId })
    container.register(IdToken, { useValue: tokens.token })
    container.register(UserId, { useValue: user.uid })
    return (
        <AuthProvider traceId={traceId} idToken={tokens.token} user={user}>
            {children}
        </AuthProvider>
    )
}
