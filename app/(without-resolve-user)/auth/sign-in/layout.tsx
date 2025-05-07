import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { getTranslations } from "next-intl/server"
import { type ReactNode } from "react"

export const generateMetadata = async () => {
    const t = await getTranslations(Route.SignIn)
    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    }
}

export default async function ({ children }: { children: ReactNode }) {
    const t = await getTranslations(Route.SignIn)
    return (
        <>
            <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold text-gray-800">
                            {t("metadata.title")}
                        </h1>
                        <p className="text-gray-600">
                            {t("metadata.description")}
                        </p>
                    </div>
                    <>{children}</>
                </div>
            </main>
        </>
    )
}
