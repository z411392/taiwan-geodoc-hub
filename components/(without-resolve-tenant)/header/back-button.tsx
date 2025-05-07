"use client"

import { Button } from "~/components/shadcn/button"
import { ChevronLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

const useBackHandler = () => {
    const router = useRouter()
    const [hasHistory, setHasHistory] = useState(false)
    useEffect(() => sessionStorage.setItem("hasNavigated", "true"), [])
    useEffect(() => {
        if (sessionStorage.getItem("hasNavigated") !== "true") return
        setHasHistory(true)
    }, [])
    const handleBack = () => router.back()
    return {
        hasHistory,
        handleBack,
    }
}

export default function () {
    const { hasHistory, handleBack } = useBackHandler()
    const t = useTranslations("(without-resolve-tenant)/header/back-button")
    return (
        <Button
            variant="ghost"
            className={`flex items-center gap-1 text-teal-700 ${!hasHistory ? "hidden" : ""}`}
            onClick={handleBack}
        >
            <ChevronLeft className="h-4 w-4" />
            <span>{t("title")}</span>
        </Button>
    )
}
