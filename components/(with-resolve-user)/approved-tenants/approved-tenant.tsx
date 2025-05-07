"use client"

import { Card, CardContent } from "~/components/shadcn/card"
import { Avatar } from "~/components/shadcn/avatar"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { useTranslations } from "next-intl"

export default function ({ tenant }: { tenant: TenantWithRole }) {
    const _ = useTranslations("_")
    return (
        <Link
            href={Route.Dashboard.replace("[tenantId]", String(tenant.id))}
            key={tenant.id}
            className="block"
        >
            <Card className="transition-all hover:shadow-md">
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 bg-teal-100 text-teal-700 justify-center items-center">
                            <span className="text-lg font-medium">
                                {tenant.name.charAt(0)}
                            </span>
                        </Avatar>
                        <div>
                            <h3 className="font-medium text-gray-800">
                                {tenant.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {_(`role-type.${tenant.role}`)}
                            </p>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </CardContent>
            </Card>
        </Link>
    )
}
