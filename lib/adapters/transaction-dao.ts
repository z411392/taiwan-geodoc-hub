export interface Transaction {
  id: string
  createdAt: number
  type: TransactionType
  change: number
  balance: string
  operator: string
}

export enum TransactionTypes {
  TopUp = "top-up",
  Use = "use",
}

export type TransactionType = `${TransactionTypes}`

export class TransactionDao {
  constructor({ tenantId: _tenantId }: { tenantId: string }) {}
  async byPage({
    type: _type,
    page: _page,
  }: {
    type?: TransactionType
    page: number
  }) {
    const transctions: Transaction[] = [
      {
        id: "1",
        createdAt: Date.parse("2023/12/15"),
        type: TransactionTypes.TopUp,
        change: 100,
        balance: "250",
        operator: "系統管理員",
      },
      {
        id: "2",
        createdAt: Date.parse("2023/12/14"),
        type: TransactionTypes.Use,
        change: -2,
        balance: "150",
        operator: "張小明",
      },
      {
        id: "3",
        createdAt: Date.parse("2023/12/12"),
        type: TransactionTypes.Use,
        change: -1,
        balance: "152",
        operator: "張小明",
      },
      {
        id: "4",
        createdAt: Date.parse("2023/12/10"),
        type: TransactionTypes.Use,
        change: -2,
        balance: "153",
        operator: "李小華",
      },
      {
        id: "5",
        createdAt: Date.parse("2023/12/05"),
        type: TransactionTypes.TopUp,
        change: 50,
        balance: "155",
        operator: "系統管理員",
      },
      {
        id: "6",
        createdAt: Date.parse("2023/12/01"),
        type: TransactionTypes.Use,
        change: -1,
        balance: "105",
        operator: "王小美",
      },
      {
        id: "7",
        createdAt: Date.parse("2023/11/28"),
        type: TransactionTypes.Use,
        change: -2,
        balance: "106",
        operator: "張小明",
      },
      {
        id: "8",
        createdAt: Date.parse("2023/11/25"),
        type: TransactionTypes.TopUp,
        change: 100,
        balance: "108",
        operator: "系統管理員",
      },
      {
        id: "9",
        createdAt: Date.parse("2023/11/20"),
        type: TransactionTypes.Use,
        change: -2,
        balance: "8",
        operator: "李小華",
      },
      {
        id: "10",
        createdAt: Date.parse("2023/11/15"),
        type: TransactionTypes.Use,
        change: -1,
        balance: "10",
        operator: "王小美",
      },
    ]
    const total = 50
    return {
      records: transctions,
      total,
    }
  }
}
