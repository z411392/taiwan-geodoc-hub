"use client"

import { useTranslations } from "next-intl"
import { Routes } from "@/lib/constants/routes"

export default function Footer() {
  const _ = useTranslations(Routes.Root)
  return (
    <footer className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
      <p>{_("footer.copyright", { year: new Date().getFullYear() })}</p>
    </footer>
  )
}
