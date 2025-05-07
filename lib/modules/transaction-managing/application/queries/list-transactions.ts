import CallableInstance from "callable-instance"
import {
  type TransactionType,
  type Transaction,
  TransactionDao,
} from "@/lib/adapters/transaction-dao"

export interface ListingTransactions {
  tenantId: string
  type?: TransactionType
  page: number
}

export class ListTransactions extends CallableInstance<
  [ListingTransactions],
  Promise<{ records: Transaction[]; total: number }>
> {
  protected transactionDao: TransactionDao
  constructor({ transactionDao }: { transactionDao: TransactionDao }) {
    super("execute")
    this.transactionDao = transactionDao
  }
  async execute({ type, page }: ListingTransactions) {
    return await this.transactionDao.byPage({ type, page })
  }
}
