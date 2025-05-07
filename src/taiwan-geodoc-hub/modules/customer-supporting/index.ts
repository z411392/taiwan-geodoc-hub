import { registry } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { RetrieveContactInfoPort } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/retrieve-contact-info-port"
import { ContactInfoHttpAdapter } from "@/taiwan-geodoc-hub/adapters/http/contact-info-http-adapter"
import { SearchPlanPort } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/search-plan-port"
import { PlanHttpAdapter } from "@/taiwan-geodoc-hub/adapters/http/plan-http-adapter"

@registry([
    {
        token: RetrieveContactInfoPort as NonAbstractClass<RetrieveContactInfoPort>,
        useClass: ContactInfoHttpAdapter,
    },
    {
        token: SearchPlanPort as NonAbstractClass<SearchPlanPort>,
        useClass: PlanHttpAdapter,
    },
])
export abstract class CustomerSupportingModule {}
