"use client"

import { useToast } from "~/composables/shadcn/use-toast"

export default function ({
    title,
    description,
    duration = 1500,
}: {
    title: string
    description: string
    duration?: number
}) {
    const { toast } = useToast()

    const copyToClipboard = async (content: string) => {
        await navigator.clipboard.writeText(content)
        toast({
            title,
            description,
            duration,
        })
    }
    return {
        copyToClipboard,
    }
}
