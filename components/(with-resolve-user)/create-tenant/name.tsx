import { Label } from "~/components/shadcn/label"
import { Input } from "~/components/shadcn/input"
import { useTranslations } from "next-intl"

export default function ({
    name,
    setName,
}: {
    name: string
    setName: (name: string) => void
}) {
    const t = useTranslations("(with-resolve-user)/create-tenant/name")
    return (
        <div className="grid gap-2">
            <Label htmlFor="name" className="text-left">
                {t("label")}
            </Label>
            <Input
                id="name"
                placeholder={t("placeholder")}
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                className="col-span-3"
                required
            />
        </div>
    )
}
