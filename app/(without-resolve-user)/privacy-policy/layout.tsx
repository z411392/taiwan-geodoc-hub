import { getTranslations } from "next-intl/server"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { type ReactNode } from "react"

export const generateMetadata = async () => {
    const t = await getTranslations(Route.PrivacyPolicy)
    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    }
}

export default async function ({ children }: { children: ReactNode }) {
    const t = await getTranslations(Route.PrivacyPolicy)
    return (
        <main className="container mx-auto flex flex-1 flex-col px-4 py-8">
            <div className="mx-auto w-full max-w-3xl">
                <div className="mb-8">
                    <h1 className="mb-4 text-3xl font-bold text-gray-800">
                        {t("metadata.title")}
                    </h1>
                    <p className="text-gray-600">{t("metadata.description")}</p>
                </div>
                <div className="prose prose-teal max-w-none rounded-lg bg-white p-8 shadow-lg">
                    {children}
                </div>
            </div>
        </main>
    )
}
