import { type ReactNode } from "react"
import AuthProvider from "~/composables/providers/auth-provider"
import { resolveTokens } from "~/auth/resolve-tokens"
import { resolveUser } from "~/auth/resolve-user"
import Unauthenticated from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/unauthenticated"
import { bootstrap } from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import {
    loggerToken,
    requestIdToken,
    idTokenToken,
    userIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { RequestIdGenerator } from "~/lib/taiwan-geodoc-hub/modules/system-maintaining/domain/ports/request-id-generator"
import { type NonAbstractClass } from "~/lib/taiwan-geodoc-hub/infrastructure/constants/types"

import { createLogger } from "@/taiwan-geodoc-hub/infrastructure/utils/logging"

export default async function WithAuth({ children }: { children: ReactNode }) {
    const tokens = await resolveTokens()
    if (!tokens) throw new Unauthenticated()
    const user = resolveUser(tokens.decodedToken)
    const [container] = await Promise.all([bootstrap()])
    const requestIdGenerator = container.resolve(
        RequestIdGenerator as NonAbstractClass<RequestIdGenerator>,
    )
    const requestId = requestIdGenerator.execute()
    container.register(requestIdToken, { useValue: requestId })
    container.register(idTokenToken, { useValue: tokens.token })
    container.register(userIdToken, { useValue: user.uid })
    container.register(loggerToken, {
        useFactory: (container) =>
            createLogger({
                requestId: container.resolve(requestIdToken),
                userId: container.resolve(userIdToken),
            }),
    })
    return (
        <AuthProvider requestId={requestId} idToken={tokens.token} user={user}>
            {children}
        </AuthProvider>
    )
}
