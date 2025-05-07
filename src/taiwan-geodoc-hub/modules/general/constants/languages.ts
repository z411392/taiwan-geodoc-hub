import { type Language } from "@/taiwan-geodoc-hub/modules/general/dtos/language"

export const Languages = [
    { code: "zh", name: "繁體中文", flag: "🇹🇼" },
    { code: "en", name: "English", flag: "🇺🇸" },
] as const as Language[]
