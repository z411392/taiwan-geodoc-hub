import Link from "next/link"
import GoogleSignInButton from "@/components/(outer)/auth/sign-in/google-sign-in-button"
import { Routes } from "@/lib/constants/routes"
import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"

export const generateMetadata = async () => {
  const t = await getTranslations(Routes.SignIn)
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  }
}

export default function SignInPage() {
  const t = useTranslations(Routes.SignIn)
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            {/* {t("metadata.title")} */}
          </h1>
          <p className="text-gray-600">{t("metadata.description")}</p>
        </div>
        <div className="space-y-6">
          <GoogleSignInButton />
          <div className="text-center text-sm text-gray-500">
            {t.rich("agreement", {
              TermsOfUse: (text) => (
                <Link
                  href={Routes.TermsOfUse}
                  className="text-teal-600 hover:underline"
                >
                  {text}
                </Link>
              ),
              PrivacyPolicy: (text) => (
                <Link
                  href={Routes.PrivacyPolicy}
                  className="text-teal-600 hover:underline"
                >
                  {text}
                </Link>
              ),
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
