"use client"

import PointConsumption from "~/components/(with-resolve-tenant)/top-up/rules/point-consumption"
import PointNotice from "~/components/(with-resolve-tenant)/top-up/rules/point-notice"

export default function () {
    return (
        <>
            <div className="space-y-3 text-sm text-muted-foreground">
                <PointConsumption />
                <PointNotice />
            </div>
        </>
    )
}
