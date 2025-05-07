import { type ReactNode } from "react"
import AuthProvider from "~/composables/providers/auth-provider"
import { resolveTokens } from "~/auth/resolve-tokens"
import { resolveUser } from "~/auth/resolve-user"
import Unauthenticated from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/unauthenticated"
import { bootstrap } from "@/taiwan-geodoc-hub/infrastructure/lifespan"
import {
    loggerToken,
    idTokenToken,
    userIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"
import { createConsola } from "consola"

export default async function WithAuth({ children }: { children: ReactNode }) {
    const tokens = await resolveTokens()
    if (!tokens) throw new Unauthenticated()
    const user = resolveUser(tokens.decodedToken)
    const [container] = await Promise.all([bootstrap()])
    container.register(idTokenToken, { useValue: tokens.token })
    container.register(userIdToken, { useValue: user.uid })
    const logger = createConsola().withTag(
        JSON.stringify({
            userId: container.resolve(userIdToken),
        }),
    )
    container.register(loggerToken, { useValue: logger })
    return (
        <AuthProvider user={user} idToken={tokens.token!}>
            {children}
        </AuthProvider>
    )
}
