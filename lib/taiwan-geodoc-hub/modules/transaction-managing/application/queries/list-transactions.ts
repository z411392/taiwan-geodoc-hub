import CallableInstance from "callable-instance"
import { type TransactionTypes } from "@/taiwan-geodoc-hub/modules/transaction-managing/constants/transaction-types"
import { type Transaction } from "@/taiwan-geodoc-hub/modules/transaction-managing/dtos/transaction"
import { injectable, inject } from "tsyringe"
import { TransactionDao } from "@/taiwan-geodoc-hub/modules/transaction-managing/domain/ports/transaction-dao"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type ListingTransactions = [`${TransactionTypes}` | undefined, number]

@injectable()
export class ListTransactions extends CallableInstance<
    ListingTransactions,
    Promise<{ records: Transaction[]; total: number }>
> {
    constructor(
        @inject(TransactionDao as NonAbstractClass<TransactionDao>)
        protected readonly transactionDao: TransactionDao,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute(
        transactionType: `${TransactionTypes}` | undefined,
        page: number,
    ) {
        const timestamp = Date.now()
        try {
            const transactions = await this.transactionDao.byPage(
                transactionType,
                page,
            )
            return transactions
        } catch (thrown) {
            this.logger.error({
                name: this.constructor.name,
                message:
                    thrown instanceof Error ? thrown.message : String(thrown),
            })
            throw thrown
        } finally {
            const duration = Date.now() - timestamp
            this.logger.info({
                name: this.constructor.name,
                timestamp,
                duration,
                data: {
                    transactionType,
                    page,
                },
            })
        }
    }
}
