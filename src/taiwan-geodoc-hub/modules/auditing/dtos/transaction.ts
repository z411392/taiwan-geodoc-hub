import { type TransactionType } from "@/taiwan-geodoc-hub/modules/auditing/enums/transaction-type"

export type Transaction = {
    id: string
    type: `${TransactionType}`
    change: number
}

export type TransactionWithTimestamp = Transaction & {
    timestamp: number
}
