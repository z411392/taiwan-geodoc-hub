import { type TransactionType } from "@/taiwan-geodoc-hub/modules/transaction-managing/enums/transaction-type"

export type Transaction = {
    id: string
    createdAt: number
    type: `${TransactionType}`
    change: number
    balance: string
    operator: string
}
