"use client"

// import { redirect } from "next/navigation"
import { Button } from "@/components/shadcn/button"
import { GoogleIcon } from "@/components/icons/google-icon"
import { useTranslations } from "next-intl"

const handleGoogleLogin = () => {}

export default function GoogleSignInButton() {
  const t = useTranslations("/auth/sign-in")
  return (
    <Button
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-2 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
      variant="outline"
    >
      <GoogleIcon className="h-5 w-5" />
      <span>{t("buttons.sign-in-with-google")}</span>
    </Button>
  )
}
