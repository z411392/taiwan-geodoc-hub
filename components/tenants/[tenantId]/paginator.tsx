"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/shadcn/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { LimitPerPage } from "@/lib/constants/pagination"
import { Input } from "@/components/shadcn/input"
import { Routes } from "@/lib/constants/routes"

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

export default function Paginator({
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
  const _ = useTranslations(Routes.Root)
  const { start, end } = usePagination({ page, length, total })
  const totalPages = Math.ceil(total / LimitPerPage)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return
    const value = event.currentTarget.value.replace(/[^0-9]/g, "")
    const newPage = Number.parseInt(value)
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages)
      onPageChange(newPage)
  }

  const toNextPage = () => onPageChange(page + 1)
  const toPreviousPage = () => onPageChange(page - 1)
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        {_("pagination", {
          start,
          end,
          total,
        })}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toPreviousPage}
          disabled={page === 1}
          aria-label="上一頁"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1">
          <span className="text-sm">第</span>
          <Input
            className="h-8 w-12 text-center"
            defaultValue={page.toString()}
            onKeyDown={handleKeyDown}
            aria-label="頁碼"
          />
          <span className="text-sm">/ {totalPages} 頁</span>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toNextPage}
          disabled={page === totalPages}
          aria-label="下一頁"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
