import { type TransactionTypes } from "@/taiwan-geodoc-hub/modules/transaction-managing/constants/transaction-types"
import { type Transaction } from "@/taiwan-geodoc-hub/modules/transaction-managing/dtos/transaction"

export abstract class TransactionDao {
    abstract byPage(
        transactionType: `${TransactionTypes}` | undefined,
        page: number,
    ): Promise<{ records: Transaction[]; total: number }>
}
