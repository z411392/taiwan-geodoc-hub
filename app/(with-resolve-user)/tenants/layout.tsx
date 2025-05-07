import { type ReactNode } from "react"
import AuthProvider from "~/composables/providers/trace-id-provider/user-provider"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { getTranslations } from "next-intl/server"
import { startupWithResolveUser } from "@/taiwan-geodoc-hub/utils/lifespan/startup-with-resolve-user"
import { context } from "@/taiwan-geodoc-hub/utils/lifespan/context"
import { IdToken } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"

export const generateMetadata = async () => {
    const t = await getTranslations(Route.TenantSelection)
    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    }
}

export default async function ({ children }: { children: ReactNode }) {
    const container = await startupWithResolveUser()
    const idToken = container.resolve<string>(IdToken)
    const user = context.user!
    return (
        <AuthProvider idToken={idToken} user={user}>
            {children}
        </AuthProvider>
    )
}
