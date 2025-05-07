import { injectable, inject } from "tsyringe"
import {
    IdToken,
    ApiEndpoint,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import axios from "axios"
import { type ResponsePayload } from "@/taiwan-geodoc-hub/infrastructure/types/response-payload"
import { ExceptionUnserializer } from "@/taiwan-geodoc-hub/infrastructure/formatters/exception-unserializer"
import { type UserPreferences } from "@/taiwan-geodoc-hub/modules/access-controlling/dtos/user-preferences"

@injectable()
export class UserPreferencesHttpAdapter {
    constructor(
        @inject(IdToken) protected idToken: string,
        @inject(ApiEndpoint) protected apiEndpoint: string,
        @inject(ExceptionUnserializer)
        protected unserializeException: ExceptionUnserializer,
    ) {}
    async update(
        userPreferences: Omit<UserPreferences, "id"> & { id?: string },
    ) {
        try {
            await axios.put<ResponsePayload<{}>>(
                `${this.apiEndpoint}/me`,
                userPreferences,
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`,
                    },
                },
            )
        } catch (thrown) {
            throw this.unserializeException(thrown)
        }
    }
}
