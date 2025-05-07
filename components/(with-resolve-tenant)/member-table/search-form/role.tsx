"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/shadcn/select"
import { RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"
import { useTranslations } from "next-intl"
import { useFormRef } from "~/composables/providers/trace-id-provider"

export default function ({ role }: { role: `${RoleType}` | "all" }) {
    const _ = useTranslations("_")
    const t = useTranslations(
        "(with-resolve-tenant)/member-table/search-form/role",
    )
    const formRef = useFormRef()
    const onValueChange = () => formRef.current?.submit()
    return (
        <Select name="role" defaultValue={role} onValueChange={onValueChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("placeholder")} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">{_("role-type.all")}</SelectItem>
                <SelectItem value="admin">{_("role-type.manager")}</SelectItem>
                <SelectItem value="member">{_("role-type.member")}</SelectItem>
            </SelectContent>
        </Select>
    )
}
