import { useTranslations } from "next-intl"
import { Routes } from "@/lib/constants/routes"

export default function Footer() {
  const _ = useTranslations(Routes.Root)
  return (
    <footer className="container mx-auto p-4 text-center text-sm text-gray-500">
      {_("footer.copyright", { year: new Date().getFullYear() })}
    </footer>
  )
}
