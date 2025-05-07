import { useEffect, useState } from "react"

export default function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])
  return isMobile
}
