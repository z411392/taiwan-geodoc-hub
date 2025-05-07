import {
  type ListingTransactions,
  ListTransactions,
} from "@/lib/modules/transaction-managing/application/queries/list-transactions"
import { TransactionDao } from "@/lib/adapters/transaction-dao"

export const onListingTransactions = async (query: ListingTransactions) => {
  const handler = new ListTransactions({
    transactionDao: new TransactionDao({ tenantId: query.tenantId }),
  })
  return await handler(query)
}
