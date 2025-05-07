import { type ReactNode } from "react"
import InviteNewMemberButton from "~/components/(with-resolve-tenant)/invite-new-member-button"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/shadcn/card"
import { getTranslations } from "next-intl/server"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"

export default async function ({ children }: { children: ReactNode }) {
    const t = await getTranslations(Route.Members)
    return <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">
                {/* {t("metadata.title")} */}
            </h1>
            <div className="flex gap-2">
                <InviteNewMemberButton />
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>{t("metadata.title")}</CardTitle>
                <CardDescription>
                    {t("metadata.description")}
                </CardDescription>
            </CardHeader>
            {children}
        </Card>
    </div>
}
