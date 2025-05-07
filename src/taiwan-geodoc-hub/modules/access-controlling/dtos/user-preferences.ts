import { type Locale } from "@/taiwan-geodoc-hub/modules/general/enums/locale"

export type UserPreferences = {
    id: string
    locale: `${Locale}`
}
