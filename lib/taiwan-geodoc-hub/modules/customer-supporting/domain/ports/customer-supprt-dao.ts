import { type ContactInfo } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/contact-info"

export abstract class CustomerSupportDao {
    abstract contactInfo(): Promise<ContactInfo>
}
