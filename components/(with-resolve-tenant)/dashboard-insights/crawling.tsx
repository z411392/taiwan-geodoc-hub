import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/shadcn/card"
import { Loader2, Search } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ({ isLoading }: { isLoading: boolean }) {
    const t = useTranslations(
        "(with-resolve-tenant)/dashboard-insights/crawling",
    )
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                    {t("title")}
                </CardTitle>
                <div className="bg-purple-100 p-2 rounded-full">
                    <Search className="h-4 w-4 text-purple-600" />
                </div>
            </CardHeader>
            <CardContent>
                {isLoading && <Loader2 className="animate-spin" />}
                {!isLoading && (
                    <>
                        <div className="text-2xl font-semibold">{"0"}</div>
                        <p className="text-xs text-muted-foreground">
                            {t("description", {
                                count: "0",
                            })}
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
