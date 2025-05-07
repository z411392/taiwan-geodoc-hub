import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/shadcn/card"
import { CreditCard } from "lucide-react"
import { useTranslations } from "next-intl"
import { DateTime } from "luxon"

export default function Balance({
    points,
    lastTopUpTimestamp,
}: {
    points: number
    lastTopUpTimestamp: number
}) {
    const t = useTranslations(
        "(with-resolve-tenant)/dashboard-insights/balance",
    )
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                    {t("title")}
                </CardTitle>
                <div className="`bg-blue-100 p-2 rounded-full`">
                    <CreditCard className="`h-4 w-4 text-blue-600`" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-semibold">{String(points)}</div>
                <p className="text-xs text-muted-foreground">
                    {t("description", {
                        date: DateTime.fromMillis(lastTopUpTimestamp).toFormat(
                            "yyyy-LL-dd",
                        ),
                    })}
                </p>
            </CardContent>
        </Card>
    )
}
