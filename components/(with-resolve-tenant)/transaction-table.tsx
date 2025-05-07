"use client"

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "~/components/shadcn/card"
// import { Badge } from "~/components/shadcn/badge"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "~/components/shadcn/select"
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "~/components/shadcn/table"
// import { Input } from "~/components/shadcn/input"
// import { useState, useEffect, useMemo } from "react"
// import { useTranslations } from "next-intl"
// import { useSearchParams, useRouter } from "next/navigation"
// import TopUpButton from "~/components/(with-resolve-tenant)/top-up"
// import Paginator from "~/components/(with-resolve-tenant)/paginator"
// import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
// import { type Transaction } from "@/taiwan-geodoc-hub/modules/auditing/dtos/transaction"
// import { TransactionType } from "@/taiwan-geodoc-hub/modules/auditing/enums/transaction-type"
// import { type TransactionInsights } from "@/taiwan-geodoc-hub/modules/reporting/dtos/transaction-insights"
// import { useContainer } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider"
// import { ListTransactions } from "@/taiwan-geodoc-hub/modules/auditing/application/list-transactions"
// import { CollectTransactionInsights } from "@/taiwan-geodoc-hub/modules/reporting/application/collect-transaction-insights"
// import { useInterval } from "~/composables/use-interval"
// import { DateTime } from "luxon"

// const useQueryParams = () => {
//     const searchParams = useSearchParams()

//     const initType = (): TransactionType | "all" => {
//         let type: TransactionType | "all" = "all"
//         if (
//             Object.values(TransactionType).includes(
//                 searchParams.get("type") as TransactionType,
//             )
//         )
//             type = searchParams.get("type") as TransactionType
//         return type
//     }
//     const [type, setType] = useState<TransactionType | "all">(initType())

//     const initPage = (): number => {
//         const page = parseInt(searchParams.get("page") || "1")
//         return isNaN(page) || page < 1 ? 1 : page
//     }
//     const [page, setPage] = useState<number>(initPage())

//     const router = useRouter()
//     useEffect(() => {
//         const params = new URLSearchParams()
//         params.set("page", String(page))
//         params.set("type", String(type))
//         const next = `?${params.toString()}`
//         if (next !== window.location.search)
//             router.replace(next, { scroll: false })
//     }, [page, type, router])
//     return { page, setPage, type, setType }
// }

export default function () {
    return <></>
    // const __ = useTranslations(Route.Tenant)
    // const t = useTranslations(Route.Transactions)
    // const [transactions, setTransactions] = useState<Transaction[]>([])
    // const [total, setTotal] = useState<number>(0)
    // const [loaded, setLoaded] = useState<boolean>(false)
    // const { page, setPage, type, setType } = useQueryParams()
    // const [insights, setInsights] = useState<TransactionInsights>(
    //     {} as unknown as TransactionInsights,
    // )

    // const [year, setYear] = useState(undefined as unknown as string)
    // const [month, setMonth] = useState(undefined as unknown as string)
    // const [date, setDate] = useState(undefined as unknown as string)

    // useInterval((millis) => {
    //     const now = DateTime.fromMillis(millis)
    //     setYear(now.toFormat("yyyy"))
    //     setMonth(now.toFormat("LL"))
    //     setDate(now.toFormat("yyyy-LL-dd"))
    // })

    // const container = useContainer()
    // const listTransactions = useMemo(
    //     () => container.resolve(ListTransactions),
    //     [container],
    // )
    // useEffect(() => {
    //     const run = async () => {
    //         const { records: transactions, total } = await listTransactions(
    //             type === "all" ? undefined : type,
    //             page,
    //         )
    //         setTransactions(transactions)
    //         setTotal(total)
    //         setLoaded(true)
    //     }
    //     run()
    // }, [type, page, listTransactions])
    // const collectTransactionInsights = useMemo(
    //     () => container.resolve(CollectTransactionInsights),
    //     [container],
    // )
    // useEffect(() => {
    //     const run = async () => {
    //         const insights = await collectTransactionInsights()
    //         setInsights(insights)
    //     }
    //     run()
    // }, [collectTransactionInsights])

    // if (!loaded) return null
    // return (
    //     <div className="space-y-6">
    //         <div className="flex items-center justify-between">
    //             <h1 className="text-2xl font-semibold tracking-tight">
    //                 {/* {t("metadata.title")} */}
    //             </h1>
    //             <div className="flex gap-2">
    //                 <TopUpButton currentPoints={insights.points} />
    //             </div>
    //         </div>

    //         <div className="grid gap-4 md:grid-cols-3">
    //             <Card>
    //                 <CardHeader className="pb-2">
    //                     <CardTitle>
    //                         {t("sections.transactions.title")}
    //                     </CardTitle>
    //                     <CardDescription>
    //                         {t("sections.transactions.description", {
    //                             date,
    //                         })}
    //                     </CardDescription>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <div className="text-3xl font-bold">
    //                         {insights.points}
    //                     </div>
    //                 </CardContent>
    //             </Card>
    //             <Card>
    //                 <CardHeader className="pb-2">
    //                     <CardTitle>{t("sections.this-month.title")}</CardTitle>
    //                     <CardDescription>
    //                         {t("sections.this-month.description", {
    //                             year,
    //                             month,
    //                         })}
    //                     </CardDescription>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <div className="text-3xl font-bold">
    //                         {insights.pointsUsedThisMonth}
    //                     </div>
    //                 </CardContent>
    //             </Card>
    //             <Card>
    //                 <CardHeader className="pb-2">
    //                     <CardTitle>{t("sections.this-month.title")}</CardTitle>
    //                     <CardDescription>
    //                         {t("sections.this-month.description", {
    //                             year,
    //                             month,
    //                         })}
    //                     </CardDescription>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <div className="text-3xl font-bold">
    //                         {insights.pointsTopUpedThisMonth}
    //                     </div>
    //                 </CardContent>
    //             </Card>
    //         </div>

    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>{t("metadata.title")}</CardTitle>
    //                 <CardDescription>
    //                     {t("metadata.description")}
    //                 </CardDescription>
    //             </CardHeader>
    //             <CardContent>
    //                 <div className="flex flex-col gap-4">
    //                     <form className="flex flex-wrap gap-4">
    //                         <Select
    //                             name="type"
    //                             value={type}
    //                             onValueChange={(value) =>
    //                                 setType(value as TransactionType)
    //                             }
    //                         >
    //                             <SelectTrigger className="w-[180px]">
    //                                 <SelectValue
    //                                     placeholder={t("filters.type.name")}
    //                                 />
    //                             </SelectTrigger>
    //                             <SelectContent>
    //                                 <SelectItem value="all">
    //                                     {t("filters.type.options.all")}
    //                                 </SelectItem>
    //                                 <SelectItem value="top-up">
    //                                     {t("filters.type.options.top-up")}
    //                                 </SelectItem>
    //                                 <SelectItem value="usage">
    //                                     {t("filters.type.options.usage")}
    //                                 </SelectItem>
    //                             </SelectContent>
    //                         </Select>
    //                         <Input
    //                             type="hidden"
    //                             name="page"
    //                             value={String(page)}
    //                         />
    //                     </form>
    //                     <div className="rounded-md border">
    //                         <Table>
    //                             <TableHeader>
    //                                 <TableRow>
    //                                     <TableHead>
    //                                         {t("fields.date")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.type")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.amount")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.balance")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.operator")}
    //                                     </TableHead>
    //                                 </TableRow>
    //                             </TableHeader>
    //                             <TableBody>
    //                                 {transactions.map((transaction) => (
    //                                     <TableRow key={transaction.id}>
    //                                         <TableCell>
    //                                             {DateTime.fromMillis(
    //                                                 transaction.createdAt,
    //                                             ).toFormat("yyyy-LL-dd")}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             <Badge
    //                                                 variant={
    //                                                     transaction.type ===
    //                                                     TransactionType.TopUp
    //                                                         ? "info"
    //                                                         : "default"
    //                                                 }
    //                                             >
    //                                                 {__(
    //                                                     `transactions.${transaction.type}`,
    //                                                 )}
    //                                             </Badge>
    //                                         </TableCell>
    //                                         <TableCell
    //                                             className={
    //                                                 transaction.type ===
    //                                                 TransactionType.TopUp
    //                                                     ? "text-green-600 font-medium"
    //                                                     : "text-red-600 font-medium"
    //                                             }
    //                                         >
    //                                             {String(transaction.change)}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {transaction.balance}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {transaction.operator}
    //                                         </TableCell>
    //                                     </TableRow>
    //                                 ))}
    //                             </TableBody>
    //                         </Table>
    //                     </div>

    //                     <Paginator
    //                         page={page}
    //                         length={transactions.length}
    //                         total={total}
    //                         onPageChange={(page) => setPage(page)}
    //                     />
    //                 </div>
    //             </CardContent>
    //         </Card>
    //     </div>
    // )
}
