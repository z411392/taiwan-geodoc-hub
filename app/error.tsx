"use client"

import { Unauthorized } from "@/taiwan-geodoc-hub/modules/access-controlling/exceptions/unauthorized"
import { redirect } from "next/navigation"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"

export default function ({
    error,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    if (error.name === Unauthorized.name) return redirect(Route.SignIn)
    return null
}
