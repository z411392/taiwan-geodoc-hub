import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/shadcn/card"
import { FileText } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ({
    unlockedRegistrations,
    monthlyUnlockedRegistrations,
}: {
    unlockedRegistrations: number
    monthlyUnlockedRegistrations: number
}) {
    const t = useTranslations(
        "(with-resolve-tenant)/dashboard-insights/unlocking",
    )
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                    {t("title")}
                </CardTitle>
                <div className="bg-green-100 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-green-600" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-semibold">
                    {String(unlockedRegistrations)}
                </div>
                <p className="text-xs text-muted-foreground">
                    {t("description", {
                        count: String(monthlyUnlockedRegistrations),
                    })}
                </p>
            </CardContent>
        </Card>
    )
}
