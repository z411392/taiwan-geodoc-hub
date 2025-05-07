import { type ContactInfo } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/contact-info"

export abstract class RetrieveContactInfoPort {
    abstract contactInfo(): Promise<ContactInfo>
}
