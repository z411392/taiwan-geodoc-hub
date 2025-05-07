import { type TransactionType } from "@/taiwan-geodoc-hub/modules/transaction-managing/enums/transaction-type"
import { type Transaction } from "@/taiwan-geodoc-hub/modules/transaction-managing/dtos/transaction"

export abstract class TransactionDao {
    abstract byPage(
        transactionType: `${TransactionType}` | undefined,
        page: number,
    ): Promise<{ records: Transaction[]; total: number }>
}
