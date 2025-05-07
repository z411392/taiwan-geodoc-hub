import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/shadcn/card"
import { Users, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ({
    users,
    sevenDaysActiveUsers,
    isLoading,
}: {
    users: number
    sevenDaysActiveUsers: number
    isLoading: boolean
}) {
    const t = useTranslations("(with-resolve-tenant)/dashboard-insights/team")
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                    {t("title")}
                </CardTitle>
                <div className="bg-amber-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-amber-600" />
                </div>
            </CardHeader>
            <CardContent>
                {isLoading && <Loader2 className="animate-spin" />}
                {!isLoading && (
                    <>
                        <div className="text-2xl font-semibold">
                            {String(users)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {t("description", {
                                count: String(sevenDaysActiveUsers),
                            })}
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
