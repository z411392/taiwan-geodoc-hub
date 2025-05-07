import { useRouter, useSearchParams } from "next/navigation"

export const usePageChangeHandler = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams)
        if (params.get("page") === page.toString()) return
        params.set("page", page.toString())
        router.push(`?${params.toString()}`)
    }
    return {
        handlePageChange,
    }
}
