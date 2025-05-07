export interface Language {
  code: string
  name: string
  flag: string
}

export const Languages: Array<Language> = [
  { code: "zh", name: "繁體中文", flag: "🇹🇼" },
  { code: "en", name: "English", flag: "🇺🇸" },
] as const
