import { useState, useEffect } from "react"

export const useTick = (interval: number = 1_000) => {
    const [millis, setMillis] = useState(Date.now())
    useEffect(() => {
        const timer = setInterval(() => setMillis(Date.now()), interval)
        return () => clearInterval(timer)
    }, [millis, interval])
    return {
        millis,
    }
}
