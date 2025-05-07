"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/shadcn/card"
import { Badge } from "~/components/shadcn/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/shadcn/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/shadcn/table"
import { Input } from "~/components/shadcn/input"
import { useState, useEffect, useMemo } from "react"
import { useTranslations } from "next-intl"
import { useSearchParams, useRouter } from "next/navigation"
import TopUpButton from "~/components/tenants/[tenantId]/transactions/top-up-button"
import Paginator from "~/components/tenants/[tenantId]/paginator"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/routes"
import { type Transaction } from "@/taiwan-geodoc-hub/modules/transaction-managing/dtos/transaction"
import { TransactionTypes } from "@/taiwan-geodoc-hub/modules/transaction-managing/constants/transaction-types"
import { type TransactionInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/transaction-insights"
import { useContainer } from "~/composables/providers/tenant-provider"
import { ListTransactions } from "@/taiwan-geodoc-hub/modules/transaction-managing/application/queries/list-transactions"
import { CollectTransactionInsights } from "@/taiwan-geodoc-hub/modules/reporting/application/queries/collect-transaction-insights"
import { useInterval } from "~/composables/date-time"
import { DateTime } from "luxon"

const useQueryParams = () => {
    const searchParams = useSearchParams()

    const initType = (): TransactionTypes | "all" => {
        let type: TransactionTypes | "all" = "all"
        if (
            Object.values(TransactionTypes).includes(
                searchParams.get("type") as TransactionTypes,
            )
        )
            type = searchParams.get("type") as TransactionTypes
        return type
    }
    const [type, setType] = useState<TransactionTypes | "all">(initType())

    const initPage = (): number => {
        const page = parseInt(searchParams.get("page") || "1")
        return isNaN(page) || page < 1 ? 1 : page
    }
    const [page, setPage] = useState<number>(initPage())

    const router = useRouter()
    useEffect(() => {
        const params = new URLSearchParams()
        params.set("page", String(page))
        params.set("type", String(type))
        const next = `?${params.toString()}`
        if (next !== window.location.search)
            router.replace(next, { scroll: false })
    }, [page, type, router])
    return { page, setPage, type, setType }
}

export default function TransactionsTable() {
    const __ = useTranslations(Pages.Tenant)
    const t = useTranslations(Pages.Transactions)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [total, setTotal] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)
    const { page, setPage, type, setType } = useQueryParams()
    const [insights, setInsights] = useState<TransactionInsights>(
        {} as unknown as TransactionInsights,
    )

    const [year, setYear] = useState(undefined as unknown as string)
    const [month, setMonth] = useState(undefined as unknown as string)
    const [date, setDate] = useState(undefined as unknown as string)

    useInterval((millis) => {
        const now = DateTime.fromMillis(millis)
        setYear(now.toFormat("yyyy"))
        setMonth(now.toFormat("LL"))
        setDate(now.toFormat("yyyy-LL-dd"))
    })

    const container = useContainer()
    const listTransactions = useMemo(
        () => container.resolve(ListTransactions),
        [container],
    )
    useEffect(() => {
        let cancelled = false
        const run = async () => {
            const { records: transactions, total } = await listTransactions(
                type === "all" ? undefined : type,
                page,
            )
            if (cancelled) return
            setTransactions(transactions)
            setTotal(total)
            setLoaded(true)
        }
        run()
        return () => {
            cancelled = true
        }
    }, [type, page, listTransactions])
    const collectTransactionInsights = useMemo(
        () => container.resolve(CollectTransactionInsights),
        [container],
    )
    useEffect(() => {
        let cancelled = false
        const run = async () => {
            const insights = await collectTransactionInsights()
            if (cancelled) return
            setInsights(insights)
        }
        run()
        return () => {
            cancelled = true
        }
    }, [collectTransactionInsights])

    if (!loaded) return null
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
                        <CardTitle>
                            {t("sections.transactions.title")}
                        </CardTitle>
                        <CardDescription>
                            {t("sections.transactions.description", {
                                date,
                            })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {insights.points}
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
                    <CardDescription>
                        {t("metadata.description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <form className="flex flex-wrap gap-4">
                            <Select
                                name="type"
                                value={type}
                                onValueChange={(value) =>
                                    setType(value as TransactionTypes)
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue
                                        placeholder={t("filters.type.name")}
                                    />
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
                            <Input
                                type="hidden"
                                name="page"
                                value={String(page)}
                            />
                        </form>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            {t("fields.date")}
                                        </TableHead>
                                        <TableHead>
                                            {t("fields.type")}
                                        </TableHead>
                                        <TableHead>
                                            {t("fields.amount")}
                                        </TableHead>
                                        <TableHead>
                                            {t("fields.balance")}
                                        </TableHead>
                                        <TableHead>
                                            {t("fields.operator")}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>
                                                {DateTime.fromMillis(
                                                    transaction.createdAt,
                                                ).toFormat("yyyy-MM-dd")}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        transaction.type ===
                                                        TransactionTypes.TopUp
                                                            ? "info"
                                                            : "default"
                                                    }
                                                >
                                                    {__(
                                                        `transactions.${transaction.type}`,
                                                    )}
                                                </Badge>
                                            </TableCell>
                                            <TableCell
                                                className={
                                                    transaction.type ===
                                                    TransactionTypes.TopUp
                                                        ? "text-green-600 font-medium"
                                                        : "text-red-600 font-medium"
                                                }
                                            >
                                                {String(transaction.change)}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.balance}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.operator}
                                            </TableCell>
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
