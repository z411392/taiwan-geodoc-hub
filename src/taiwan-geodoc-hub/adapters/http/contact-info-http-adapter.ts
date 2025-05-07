import { injectable, inject } from "tsyringe"
import {
    IdToken,
    ApiEndpoint,
    TenantId,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { ExceptionUnserializer } from "@/taiwan-geodoc-hub/infrastructure/formatters/exception-unserializer"
import axios from "axios"
import { type ResponsePayload } from "@/taiwan-geodoc-hub/infrastructure/types/response-payload"
import { type RetrieveContactInfoPort } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/retrieve-contact-info-port"
import { type ContactInfo } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/contact-info"

@injectable()
export class ContactInfoHttpAdapter implements RetrieveContactInfoPort {
    constructor(
        @inject(IdToken) protected idToken: string,
        @inject(ApiEndpoint) protected apiEndpoint: string,
        @inject(ExceptionUnserializer)
        protected unserializeException: ExceptionUnserializer,
        @inject(TenantId) protected tenantId: string,
    ) {}

    async contactInfo() {
        const { tenantId } = this
        try {
            const {
                data: {
                    data: { contactInfo },
                },
            } = await axios.get<
                ResponsePayload<{
                    contactInfo: ContactInfo
                }>
            >(
                `${this.apiEndpoint}/tenants/:tenantId/contact-info`.replace(
                    `:tenantId`,
                    tenantId,
                ),
                {
                    headers: {
                        Authorization: `Bearer ${this.idToken}`,
                    },
                },
            )
            return contactInfo
        } catch (thrown) {
            throw this.unserializeException(thrown)
        }
    }
}
