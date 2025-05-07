import { useEffect, useState } from "react"

export default function useMobileDetection() {
    const [isOnMobile, setIsOnMobile] = useState(false)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsOnMobile(window.innerWidth < 768)
        }
        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)
        return () => {
            window.removeEventListener("resize", checkScreenSize)
        }
    }, [])
    return isOnMobile
}
