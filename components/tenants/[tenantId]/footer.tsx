"use client"

import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations("(outer)")
  return (
    <footer className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
      <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
    </footer>
  )
}
