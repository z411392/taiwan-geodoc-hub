"use client"

import Link from "next/link"
import SignInWithGoogleButton from "~/components/(without-resolve-user)/sign-in-with-google-button"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { useTranslations } from "next-intl"

export default function () {
    const t = useTranslations(Route.SignIn)
    return (
        <div className="space-y-6">
            <SignInWithGoogleButton />
            <div className="text-center text-sm text-gray-500">
                {t.rich("description", {
                    TermsOfUse: (text) => (
                        <Link
                            href={Route.TermsOfUse}
                            className="text-teal-600 hover:underline"
                        >
                            {text}
                        </Link>
                    ),
                    PrivacyPolicy: (text) => (
                        <Link
                            href={Route.PrivacyPolicy}
                            className="text-teal-600 hover:underline"
                        >
                            {text}
                        </Link>
                    ),
                })}
            </div>
        </div>
    )
}
