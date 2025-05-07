import { type UserPreferences } from "@/taiwan-geodoc-hub/modules/access-controlling/dtos/user-preferences"

export abstract class UpdateUserPreferencesPort {
    abstract update(
        userPreferences: Omit<UserPreferences, "id"> & { id?: string },
    ): Promise<void>
}
