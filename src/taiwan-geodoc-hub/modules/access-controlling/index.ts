import { registry } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { UpdateUserPreferencesPort } from "./domain/ports/update-user-preferences-port"
import { UserPreferencesHttpAdapter } from "@/taiwan-geodoc-hub/adapters/http/user-preferences-adapter"

@registry([
    {
        token: UpdateUserPreferencesPort as NonAbstractClass<UpdateUserPreferencesPort>,
        useClass: UserPreferencesHttpAdapter,
    },
])
export abstract class AccessControllingModule {}
