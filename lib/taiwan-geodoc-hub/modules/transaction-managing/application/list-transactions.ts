import CallableInstance from "callable-instance"
import { type TransactionTypes } from "@/taiwan-geodoc-hub/modules/transaction-managing/constants/transaction-types"
import { type Transaction } from "@/taiwan-geodoc-hub/modules/transaction-managing/dtos/transaction"
import { injectable, inject } from "tsyringe"
import { TransactionDao } from "@/taiwan-geodoc-hub/modules/transaction-managing/domain/ports/transaction-dao"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class ListTransactions extends CallableInstance<
    [`${TransactionTypes}` | undefined, number],
    Promise<{ records: Transaction[]; total: number }>
> {
    constructor(
        @inject(TransactionDao as NonAbstractClass<TransactionDao>)
        protected transactionDao: TransactionDao,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute(
        transactionType: `${TransactionTypes}` | undefined,
        page: number,
    ) {
        const start = Date.now()
        try {
            const transactions = await this.transactionDao.byPage(
                transactionType,
                page,
            )
            const elapsed = Date.now() - start
            this.logger.info("ListTransactions executed", { elapsed })
            return transactions
        } catch (thrown) {
            this.logger.error("ListTransactions failed", { thrown })
            throw thrown
        }
    }
}
