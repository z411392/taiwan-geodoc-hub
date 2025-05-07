import { type Member } from "@/taiwan-geodoc-hub/modules/member-managing/dtos/member"
import { type MemberDao } from "@/taiwan-geodoc-hub/modules/member-managing/domain/ports/member-dao"
import { injectable, inject } from "tsyringe"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"

import { Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"
@injectable()
export class MemberAdapter implements MemberDao {
    constructor(
        @inject(idTokenToken) protected idToken: string,
        @inject(tenantIdToken) protected tenantId: string,
    ) {}
    async byPage(
        _role: `${Roles}` | undefined,
        _keyword: string,
        _page: number,
    ) {
        const members: Member[] = [
            {
                id: "1",
                name: "張小明",
                email: "ming@example.com",
                role: Roles.Manager,
                createdAt: Date.parse("2022/10/15"),
                updatedAt: Date.parse("2023/12/20"),
            },
            {
                id: "2",
                name: "李小華",
                email: "hua@example.com",
                role: Roles.Member,
                createdAt: Date.parse("2022/11/05"),
                updatedAt: Date.parse("2023/12/18"),
            },
            {
                id: "3",
                name: "王小美",
                email: "mei@example.com",
                role: Roles.Member,
                createdAt: Date.parse("2023/01/20"),
                updatedAt: Date.parse("2023/12/15"),
            },
            {
                id: "4",
                name: "陳大偉",
                email: "david@example.com",
                role: Roles.Member,
                createdAt: Date.parse("2023/03/10"),
                updatedAt: Date.parse("2023/12/10"),
            },
            {
                id: "5",
                name: "林小玲",
                email: "ling@example.com",
                role: Roles.Member,
                createdAt: Date.parse("2023/05/22"),
                updatedAt: Date.parse("2023/11/30"),
            },
            {
                id: "6",
                name: "黃小龍",
                email: "long@example.com",
                role: Roles.Member,
                createdAt: Date.parse("2023/06/15"),
                updatedAt: Date.parse("2023/11/25"),
            },
            {
                id: "7",
                name: "吳小菁",
                email: "jing@example.com",
                role: Roles.Member,
                createdAt: Date.parse("2023/07/08"),
                updatedAt: Date.parse("2023/11/20"),
            },
            {
                id: "8",
                name: "趙小雯",
                email: "wen@example.com",
                role: Roles.Member,
                createdAt: Date.parse("2023/08/12"),
                updatedAt: Date.parse("2023/11/15"),
            },
            {
                id: "9",
                name: "周小強",
                email: "qiang@example.com",
                role: Roles.Member,
                createdAt: Date.parse("2023/09/25"),
                updatedAt: Date.parse("2023/11/10"),
            },
            {
                id: "10",
                name: "孫小剛",
                email: "gang@example.com",
                role: Roles.Member,
                createdAt: Date.parse("2023/10/30"),
                updatedAt: Date.parse("2023/11/05"),
            },
        ]
        const total = 50
        return {
            records: members,
            total,
        }
    }
}
