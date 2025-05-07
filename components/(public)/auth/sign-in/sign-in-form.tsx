"use client"

import Link from "next/link"
import GoogleSignInButton from "~/components/(public)/auth/sign-in/google-sign-in-button"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"
import { useTranslations } from "next-intl"

export default function SignInForm() {
    const t = useTranslations(Pages.SignIn)
    return (
        <div className="space-y-6">
            <GoogleSignInButton />
            <div className="text-center text-sm text-gray-500">
                {t.rich("agreement", {
                    TermsOfUse: (text) => (
                        <Link
                            href={Pages.TermsOfUse}
                            className="text-teal-600 hover:underline"
                        >
                            {text}
                        </Link>
                    ),
                    PrivacyPolicy: (text) => (
                        <Link
                            href={Pages.PrivacyPolicy}
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
