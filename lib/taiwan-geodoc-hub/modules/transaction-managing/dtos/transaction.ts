import { type TransactionTypes } from "@/taiwan-geodoc-hub/modules/transaction-managing/constants/transaction-types"

export type Transaction = {
    id: string
    createdAt: number
    type: `${TransactionTypes}`
    change: number
    balance: string
    operator: string
}
