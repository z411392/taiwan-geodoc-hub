"use client"

import Mobile from "~/components/(with-resolve-tenant)/top-up/contact-info/mobile"
import Email from "~/components/(with-resolve-tenant)/top-up/contact-info/email"
import LineId from "~/components/(with-resolve-tenant)/top-up/contact-info/line-id"
import Header from "~/components/(with-resolve-tenant)/top-up/contact-info/header"
import { useTopUpInfo } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/top-up-info-provider"

export default function () {
    const { contactInfo } = useTopUpInfo()
    return (
        <div className="rounded-lg border p-4 bg-muted/30">
            <Header />
            <div className="space-y-3 text-sm">
                <Mobile mobile={contactInfo.mobile} />
                <Email email={contactInfo.email} />
                <LineId lineId={contactInfo.lineId} />
            </div>
        </div>
    )
}
