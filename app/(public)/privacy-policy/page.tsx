import { getLocale } from "next-intl/server"
import { readFile } from "fs/promises"
import path from "path"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { getTranslations } from "next-intl/server"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"

export const generateMetadata = async () => {
    const t = await getTranslations(Route.PrivacyPolicy)
    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    }
}

const readMarkdown = async (locale: string) => {
    const markdownPath = path.join(
        process.cwd(),
        "public",
        "markdowns",
        "privacy-policy",
        `${locale}.md`,
    )
    return await readFile(markdownPath, "utf-8")
}

export default async function PrivacyPolicy() {
    const [locale, t] = await Promise.all([
        getLocale(),
        getTranslations(Route.PrivacyPolicy),
    ])
    const content = await readMarkdown(locale)
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
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </main>
    )
}
