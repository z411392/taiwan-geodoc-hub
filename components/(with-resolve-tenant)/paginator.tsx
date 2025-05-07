"use client"

import { useTranslations } from "next-intl"
import { Button } from "~/components/shadcn/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "~/components/shadcn/input"

const LimitPerPage = 20

const usePagination = ({
    page,
    length,
    total,
}: {
    page: number
    length: number
    total: number
}) => {
    const [start, setStart] = useState<number>(0)
    const [end, setEnd] = useState<number>(0)

    useEffect(() => {
        let start = LimitPerPage * (page - 1)
        if (start >= total) start = total - 1
        if (start <= 0) start = 0
        setStart(start + 1)
    }, [page, total])

    useEffect(() => {
        setEnd(start + length - 1)
    }, [start, length])

    return {
        start,
        end,
    }
}

export default function ({
    page,
    length,
    total,
    onPageChange,
}: {
    page: number
    length: number
    total: number
    onPageChange: (page: number) => void
}) {
    const t = useTranslations("(with-resolve-tenant)/paginator")
    const { start, end } = usePagination({ page, length, total })
    const totalPages = Math.ceil(total / LimitPerPage)
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return
        const value = event.currentTarget.value.replace(/[^0-9]/g, "")
        const page = Number.parseInt(value)
        if (isNaN(page) || page <= 0) return onPageChange(1)
        return onPageChange(page)
    }

    const toNextPage = () => onPageChange(page + 1)
    const toPreviousPage = () => onPageChange(page - 1)
    const [prefix, suffix] = t("page").split("/")
    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
                {t("info", {
                    start,
                    end,
                    total,
                })}
            </div>
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    name="page"
                    variant="outline"
                    size="icon"
                    onClick={toPreviousPage}
                    disabled={page === 1}
                    aria-label={t("prev")}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                    <span className="text-sm">{prefix}</span>
                    <Input
                        name="page"
                        defaultValue={page.toString()}
                        className="h-8 w-12 text-center"
                        onKeyDown={handleKeyDown}
                    />
                    <span className="text-sm">
                        {" "}
                        / {totalPages} {suffix}
                    </span>
                </div>
                <Button
                    type="button"
                    name="page"
                    variant="outline"
                    size="icon"
                    onClick={toNextPage}
                    disabled={page === totalPages}
                    aria-label={t("next")}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
