import { getLocale } from "next-intl/server"
import { readFile } from "fs/promises"
import path from "path"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

export default async function () {
    const locale = await getLocale()
    const content = await readFile(
        path.join(
            process.cwd(),
            "public",
            "markdowns",
            "terms-of-use",
            `${locale}.md`,
        ),
        "utf-8",
    )
    return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
}
