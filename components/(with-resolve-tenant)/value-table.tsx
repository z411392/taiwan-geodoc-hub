"use client"

// import { Button } from "~/components/shadcn/button"
// import { Input } from "~/components/shadcn/input"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "~/components/shadcn/select"
// import { Badge } from "~/components/shadcn/badge"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "~/components/shadcn/dropdown-menu"
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "~/components/shadcn/table"
// import { Eye, RefreshCw, MoreHorizontal } from "lucide-react"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "~/components/shadcn/card"
// import { useTranslations } from "next-intl"
// import { useSearchParams, useRouter } from "next/navigation"
// import { useEffect, useState, useMemo } from "react"
// import { Region } from "@/taiwan-geodoc-hub/modules/general/enums/region"
// import CrawlValuesButton from "~/components/(with-resolve-tenant)/values/crawl-values"
// import Paginator from "~/components/(with-resolve-tenant)/paginator"
// import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
// import { ValueStatus } from "@/taiwan-geodoc-hub/modules/values-crawling/enums/value-status"
// import { type Value } from "@/taiwan-geodoc-hub/modules/values-crawling/dtos/value"
// import { useContainer } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider"
// import { ListValues } from "@/taiwan-geodoc-hub/modules/values-crawling/application/list-values"

// const useQueryParams = () => {
//     const searchParams = useSearchParams()

//     const initRegion = (): Region | "all" => {
//         const region = searchParams.get("region")
//         return Object.values(Region).includes(region as Region)
//             ? (region as Region)
//             : "all"
//     }

//     const initStatus = (): ValueStatus | "all" => {
//         const status = searchParams.get("status")
//         return Object.values(ValueStatus).includes(status as ValueStatus)
//             ? (status as ValueStatus)
//             : "all"
//     }

//     const initPage = (): number => {
//         const page = parseInt(searchParams.get("page") || "1")
//         return isNaN(page) || page < 1 ? 1 : page
//     }

//     const initKeyword = (): string => searchParams.get("keyword") || ""

//     const [region, setRegion] = useState<Region | "all">(initRegion())
//     const [status, setStatus] = useState<ValueStatus | "all">(initStatus())
//     const [page, setPage] = useState<number>(initPage())
//     const [keyword, setKeyword] = useState<string>(initKeyword())
//     const [debouncedKeyword, setDebouncedKeyword] = useState<string>(keyword)
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedKeyword(keyword)
//         }, 300)
//         return () => clearTimeout(timer)
//     }, [keyword])

//     const router = useRouter()
//     useEffect(() => {
//         const params = new URLSearchParams()
//         params.set("region", region)
//         params.set("status", status)
//         params.set("keyword", debouncedKeyword)
//         params.set("page", String(page))
//         const next = `?${params.toString()}`
//         if (next !== window.location.search)
//             router.replace(next, { scroll: false })
//     }, [region, status, debouncedKeyword, page, router])

//     return {
//         region,
//         setRegion,
//         status,
//         setStatus,
//         page,
//         setPage,
//         keyword,
//         setKeyword,
//         debouncedKeyword,
//     }
// }

export default function () {
    return <></>
    // const _ = useTranslations("_")
    // const t = useTranslations(Route.Values)
    // const {
    //     region,
    //     setRegion,
    //     status,
    //     setStatus,
    //     page,
    //     setPage,
    //     keyword,
    //     setKeyword,
    //     debouncedKeyword,
    // } = useQueryParams()

    // const [values, setValues] = useState<Value[]>([])
    // const [total, setTotal] = useState<number>(0)
    // const [loaded, setLoaded] = useState(false)

    // const container = useContainer()
    // const listValues = useMemo(() => container.resolve(ListValues), [container])

    // useEffect(() => {
    //     setLoaded(false)
    //     const run = async () => {
    //         const { records, total } = await listValues(
    //             region === "all" ? undefined : region,
    //             status === "all" ? undefined : status,
    //             debouncedKeyword,
    //             page,
    //         )
    //         setValues(records)
    //         setTotal(total)
    //         setLoaded(true)
    //     }
    //     run()
    // }, [region, status, debouncedKeyword, page, listValues])

    // if (!loaded) return null

    // return (
    //     <div className="space-y-6">
    //         <div className="flex items-center justify-between">
    //             <h1 className="text-2xl font-semibold tracking-tight"> </h1>
    //             <div className="flex gap-2">
    //                 <CrawlValuesButton />
    //             </div>
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
    //                             name="region"
    //                             value={region}
    //                             onValueChange={(value) =>
    //                                 setRegion(value as Region)
    //                             }
    //                         >
    //                             <SelectTrigger className="w-[180px]">
    //                                 <SelectValue
    //                                     placeholder={t("filters.region.name")}
    //                                 />
    //                             </SelectTrigger>
    //                             <SelectContent>
    //                                 <SelectItem value="all">
    //                                     {t("filters.region.options.all")}
    //                                 </SelectItem>
    //                                 <SelectItem value={Region.TaipeiCity}>
    //                                     {_("region.TPE")}
    //                                 </SelectItem>
    //                                 <SelectItem value={Region.NewTaipeiCity}>
    //                                     {_("region.NWT")}
    //                                 </SelectItem>
    //                             </SelectContent>
    //                         </Select>
    //                         <Select
    //                             name="status"
    //                             value={status}
    //                             onValueChange={(value) =>
    //                                 setStatus(value as ValueStatus)
    //                             }
    //                         >
    //                             <SelectTrigger className="w-[180px]">
    //                                 <SelectValue
    //                                     placeholder={t("filters.status.name")}
    //                                 />
    //                             </SelectTrigger>
    //                             <SelectContent>
    //                                 <SelectItem value="all">
    //                                     {t("filters.status.options.all")}
    //                                 </SelectItem>
    //                                 <SelectItem value="success">
    //                                     {t("filters.status.options.success")}
    //                                 </SelectItem>
    //                                 <SelectItem value="processing">
    //                                     {t("filters.status.options.processing")}
    //                                 </SelectItem>
    //                                 <SelectItem value="failed">
    //                                     {t("filters.status.options.failed")}
    //                                 </SelectItem>
    //                             </SelectContent>
    //                         </Select>
    //                         <div className="flex-1">
    //                             <Input
    //                                 name="keyword"
    //                                 value={keyword}
    //                                 onChange={(event) =>
    //                                     setKeyword(event.target.value)
    //                                 }
    //                                 placeholder={t(
    //                                     "filters.number.placeholder",
    //                                 )}
    //                             />
    //                         </div>
    //                         <Input type="hidden" name="page" value={page} />
    //                     </form>
    //                     <div className="rounded-md border">
    //                         <Table>
    //                             <TableHeader>
    //                                 <TableRow>
    //                                     <TableHead>
    //                                         {t("fields.region")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.section")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.number")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.query-date")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.status")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.attempts")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.querier")}
    //                                     </TableHead>
    //                                     <TableHead className="text-right">
    //                                         {t("fields.actions")}
    //                                     </TableHead>
    //                                 </TableRow>
    //                             </TableHeader>
    //                             <TableBody>
    //                                 {values.map((value) => (
    //                                     <TableRow key={value.id}>
    //                                         <TableCell>
    //                                             {_(`regions.${value.region}`)}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {value.section}
    //                                         </TableCell>
    //                                         <TableCell className="font-medium">
    //                                             {value.number}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {value.queryDate}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             <Badge
    //                                                 variant={
    //                                                     value.status ===
    //                                                     ValueStatus.Success
    //                                                         ? "success"
    //                                                         : value.status ===
    //                                                             ValueStatus.Failed
    //                                                           ? "error"
    //                                                           : "info"
    //                                                 }
    //                                             >
    //                                                 {_(
    //                                                     `statuses.values.${value.status}`,
    //                                                 )}
    //                                             </Badge>
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {value.attempts}/3
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {value.querier}
    //                                         </TableCell>
    //                                         <TableCell className="text-right">
    //                                             {value.status !==
    //                                                 ValueStatus.Pending && (
    //                                                 <DropdownMenu>
    //                                                     <DropdownMenuTrigger
    //                                                         asChild
    //                                                     >
    //                                                         <Button
    //                                                             variant="ghost"
    //                                                             size="icon"
    //                                                         >
    //                                                             <MoreHorizontal className="h-4 w-4" />
    //                                                             <span className="sr-only"></span>
    //                                                         </Button>
    //                                                     </DropdownMenuTrigger>
    //                                                     <DropdownMenuContent align="end">
    //                                                         {value.status ===
    //                                                             ValueStatus.Success && (
    //                                                             <DropdownMenuItem>
    //                                                                 <Eye className="mr-2 h-4 w-4" />
    //                                                                 {t(
    //                                                                     "buttons.view",
    //                                                                 )}
    //                                                             </DropdownMenuItem>
    //                                                         )}
    //                                                         {value.status ===
    //                                                             ValueStatus.Failed &&
    //                                                             value.attempts <
    //                                                                 3 && (
    //                                                                 <DropdownMenuItem>
    //                                                                     <RefreshCw className="mr-2 h-4 w-4" />
    //                                                                     {t(
    //                                                                         "buttons.reparse",
    //                                                                     )}
    //                                                                 </DropdownMenuItem>
    //                                                             )}
    //                                                     </DropdownMenuContent>
    //                                                 </DropdownMenu>
    //                                             )}
    //                                         </TableCell>
    //                                     </TableRow>
    //                                 ))}
    //                             </TableBody>
    //                         </Table>
    //                     </div>

    //                     <Paginator
    //                         page={page}
    //                         length={values.length}
    //                         total={total}
    //                         onPageChange={(page) => setPage(page)}
    //                     />
    //                 </div>
    //             </CardContent>
    //         </Card>
    //     </div>
    // )
}
