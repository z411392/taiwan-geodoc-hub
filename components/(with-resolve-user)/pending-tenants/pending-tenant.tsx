"use client"

import { Card, CardContent } from "~/components/shadcn/card"
import { Avatar } from "~/components/shadcn/avatar"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { Loader2 } from "lucide-react"
import { Badge } from "~/components/shadcn/badge"
import { useTranslations } from "next-intl"

export default function ({
    tenant,
    isBackgroundTaskRunning,
}: {
    tenant: TenantWithRole
    isBackgroundTaskRunning: boolean
}) {
    const _ = useTranslations("_")
    return (
        <Card
            key={tenant.id}
            className="border-dashed border-gray-300 bg-gray-50"
        >
            <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 bg-gray-200 text-gray-500 justify-center items-center">
                        <span className="text-lg font-medium">
                            {tenant.name.charAt(0)}
                        </span>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-600">
                                {tenant.name}
                            </h3>
                            {isBackgroundTaskRunning && (
                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground inline-block" />
                            )}
                            {!isBackgroundTaskRunning && (
                                <Badge
                                    variant="outline"
                                    className="bg-amber-50 text-amber-600"
                                >
                                    {_(`tenant-status.${tenant.status}`)}
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">
                            {_(`role-type.${tenant.role}`)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
