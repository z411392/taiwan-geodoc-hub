import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations("(outer)")
  return (
    <footer className="container mx-auto p-4 text-center text-sm text-gray-500">
      {t("footer.copyright", { year: new Date().getFullYear() })}
    </footer>
  )
}
