import { ValueStatuses } from "@/taiwan-geodoc-hub/modules/values-crawling/constants/value-statuses"
import { Regions } from "@/taiwan-geodoc-hub/infrastructure/constants/regions"
import { type Value } from "@/taiwan-geodoc-hub/modules/values-crawling/dtos/value"
import { injectable, inject } from "tsyringe"
import {
    idTokenToken,
    tenantIdToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ValueDao } from "@/taiwan-geodoc-hub/modules/values-crawling/domain/ports/value-dao"

@injectable()
export class ValueAdapter implements ValueDao {
    constructor(
        @inject(idTokenToken) protected idToken: string,
        @inject(tenantIdToken) protected tenantId: string,
    ) {}

    async byPage(
        _region: `${Regions}` | undefined,
        _status: `${ValueStatuses}` | undefined,
        _keyword: string,
        _page: number,
    ) {
        const values: Value[] = [
            {
                id: "1",
                region: Regions.TaipeiCity,
                section: "大安區",
                number: "10552-0001",
                queryDate: "2023/12/19",
                status: `${ValueStatuses.Pending}`,
                attempts: 1,
                querier: "張小明",
                result: null,
            },
            {
                id: "2",
                region: Regions.NewTaipeiCity,
                section: "板橋區",
                number: "0425-0012",
                queryDate: "2023/12/15",
                status: `${ValueStatuses.Success}`,
                attempts: 1,
                querier: "張小明",
                result: "每平方公尺 NT$ 152,000",
            },
            {
                id: "3",
                region: Regions.TaipeiCity,
                section: "信義區",
                number: "5274-0008",
                queryDate: "2023/12/10",
                status: `${ValueStatuses.Failed}`,
                attempts: 2,
                querier: "李小華",
                result: null,
            },
            {
                id: "4",
                region: Regions.NewTaipeiCity,
                section: "中和區",
                number: "1122-0045",
                queryDate: "2023/12/05",
                status: `${ValueStatuses.Success}`,
                attempts: 1,
                querier: "王小美",
                result: "每平方公尺 NT$ 98,500",
            },
            {
                id: "5",
                region: Regions.TaipeiCity,
                section: "中山區",
                number: "0356-0022",
                queryDate: "2023/12/01",
                status: `${ValueStatuses.Success}`,
                attempts: 3,
                querier: "張小明",
                result: "每平方公尺 NT$ 175,000",
            },
            {
                id: "6",
                region: Regions.NewTaipeiCity,
                section: "新莊區",
                number: "2245-0033",
                queryDate: "2023/11/28",
                status: `${ValueStatuses.Failed}`,
                attempts: 3,
                querier: "李小華",
                result: null,
            },
            {
                id: "7",
                region: Regions.TaipeiCity,
                section: "松山區",
                number: "4521-0017",
                queryDate: "2023/11/25",
                status: `${ValueStatuses.Success}`,
                attempts: 1,
                querier: "王小美",
                result: "每平方公尺 NT$ 162,000",
            },
            {
                id: "8",
                region: Regions.NewTaipeiCity,
                section: "三重區",
                number: "3311-0009",
                queryDate: "2023/11/20",
                status: `${ValueStatuses.Success}`,
                attempts: 2,
                querier: "張小明",
                result: "每平方公尺 NT$ 105,000",
            },
            {
                id: "9",
                region: Regions.TaipeiCity,
                section: "內湖區",
                number: "8754-0031",
                queryDate: "2023/11/15",
                status: `${ValueStatuses.Success}`,
                attempts: 1,
                querier: "李小華",
                result: "每平方公尺 NT$ 128,000",
            },
            {
                id: "10",
                region: Regions.NewTaipeiCity,
                section: "永和區",
                number: "5566-0024",
                queryDate: "2023/11/10",
                status: `${ValueStatuses.Success}`,
                attempts: 1,
                querier: "王小美",
                result: "每平方公尺 NT$ 112,000",
            },
        ]
        const total = 50
        return {
            records: values,
            total,
        }
    }
}
