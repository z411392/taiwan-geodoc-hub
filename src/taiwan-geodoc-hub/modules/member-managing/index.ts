import { registry } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { SearchMembersPort } from "@/taiwan-geodoc-hub/modules/member-managing/domain/ports/search-members-port"
import { MemberHttpAdapter } from "@/taiwan-geodoc-hub/adapters/http/member-http-adapter"

@registry([
    {
        token: SearchMembersPort as NonAbstractClass<SearchMembersPort>,
        useClass: MemberHttpAdapter,
    },
])
export abstract class MemberManagingModule {}
