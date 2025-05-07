import { useEffect } from "react"
import { useTick } from "~/composables/use-tick"

export const useInterval = (
    callable: (millis: number) => void,
    interval: number = 1_000,
) => {
    const { millis } = useTick(interval)
    useEffect(() => {
        callable(millis)
    }, [callable, millis])
}
