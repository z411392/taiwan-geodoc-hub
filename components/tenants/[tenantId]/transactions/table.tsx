"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import { Badge } from "@/components/shadcn/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import { Input } from "@/components/shadcn/input"
import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { type Transaction } from "@/lib/adapters/transaction-dao"
import { TransactionTypes } from "@/lib/adapters/transaction-dao"
import { onListingTransactions } from "@/lib/modules/transaction-managing/presentation/controllers/on-listing-transactions"
import { onListingTransactionInsights } from "@/lib/modules/reporting/presentation/controllers/on-listing-transaction-insights"
import { type TransactionInsights } from "@/lib/adapters/insight-dao"
import { DateTime } from "luxon"
import TopUpButton from "@/components/tenants/[tenantId]/transactions/top-up-button"
import Paginator from "@/components/tenants/[tenantId]/paginator"
import { Routes } from "@/lib/constants/routes"

const useType = () => {
  const searchParams = useSearchParams()
  let type: TransactionTypes | "all" = "all"
  if (
    Object.values(TransactionTypes).includes(
      searchParams.get("type") as TransactionTypes,
    )
  )
    type = searchParams.get("type") as TransactionTypes
  return useState<TransactionTypes | "all">(type)
}

const usePage = () => {
  const searchParams = useSearchParams()
  let page = 1
  if (searchParams.get("page")) page = Number(searchParams.get("page"))
  return useState<number>(page)
}

export default function TransactionsTable() {
  const __ = useTranslations(Routes.Tenant)
  const t = useTranslations(Routes.Transactions)
  const { tenantId } = useParams() as { tenantId: string }
  const router = useRouter()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [type, setType] = useType()
  const [page, setPage] = usePage()
  const [total, setTotal] = useState<number>(0)
  const form = useRef<HTMLFormElement>(null)
  const [insights, setInsights] = useState<TransactionInsights>(
    {} as unknown as TransactionInsights,
  )
  const datetime = new Date()
  const [year] = useState<string>(String(datetime.getFullYear()))
  const [month] = useState<string>(
    ("00" + String(datetime.getMonth() + 1)).slice(-2),
  )
  useEffect(() => {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set("type", type)
    newSearchParams.set("page", String(page))
    router.replace(`?${newSearchParams.toString()}`)
    onListingTransactionInsights({
      tenantId,
    }).then((insights) => setInsights(insights))
    onListingTransactions({
      tenantId,
      type: type === "all" ? undefined : type,
      page,
    }).then(({ records: transactions, total }) => {
      setTransactions(transactions)
      setTotal(total)
    })
  }, [tenantId, type, page, router])
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {/* {t("metadata.title")} */}
        </h1>
        <div className="flex gap-2">
          <TopUpButton currentPoints={insights.points} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t("sections.transactions.title")}</CardTitle>
            <CardDescription>
              {t("sections.transactions.description", {
                date: DateTime.fromMillis(
                  insights.updatedAt || Date.now(),
                ).toFormat("yyyy-MM-dd"),
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{insights.points}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t("sections.this-month.title")}</CardTitle>
            <CardDescription>
              {t("sections.this-month.description", {
                year,
                month,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {insights.pointsUsedThisMonth}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t("sections.this-month.title")}</CardTitle>
            <CardDescription>
              {t("sections.this-month.description", {
                year,
                month,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {insights.pointsTopUpedThisMonth}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("metadata.title")}</CardTitle>
          <CardDescription>{t("metadata.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <form ref={form} className="flex flex-wrap gap-4">
              <Select
                name="type"
                value={type}
                onValueChange={(value) => setType(value as TransactionTypes)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("filters.type.name")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("filters.type.options.all")}
                  </SelectItem>
                  <SelectItem value="top-up">
                    {t("filters.type.options.top-up")}
                  </SelectItem>
                  <SelectItem value="usage">
                    {t("filters.type.options.usage")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <Input type="hidden" name="page" value={String(page)} />
            </form>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("fields.date")}</TableHead>
                    <TableHead>{t("fields.type")}</TableHead>
                    <TableHead>{t("fields.amount")}</TableHead>
                    <TableHead>{t("fields.balance")}</TableHead>
                    <TableHead>{t("fields.operator")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {DateTime.fromMillis(transaction.createdAt).toFormat(
                          "yyyy-MM-dd",
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.type === TransactionTypes.TopUp
                              ? "info"
                              : "default"
                          }
                        >
                          {__(`transactions.${transaction.type}`)}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={
                          transaction.type === TransactionTypes.TopUp
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                        }
                      >
                        {String(transaction.change)}
                      </TableCell>
                      <TableCell>{transaction.balance}</TableCell>
                      <TableCell>{transaction.operator}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Paginator
              page={page}
              length={transactions.length}
              total={total}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
