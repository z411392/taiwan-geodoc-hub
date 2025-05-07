"use client"

import Unauthenticated from "@/taiwan-geodoc-hub/modules/access-managing/exceptions/unauthenticated"
import { redirect } from "next/navigation"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    if (error.name === Unauthenticated.name) return redirect(Pages.SignIn)
    return null
}
