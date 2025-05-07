import { type ContactInfo } from "@/taiwan-geodoc-hub/modules/customer-supporting/dtos/contact-info"
import { type CustomerSupportDao } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/customer-supprt-dao"
import { injectable } from "tsyringe"

@injectable()
export class CustomerSupportAdapter implements CustomerSupportDao {
    async contactInfo() {
        return {
            mobile: "(02) 2345-6789",
            email: "service@landhelper.com",
            lineId: "@landhelper",
        } as ContactInfo
    }
}
