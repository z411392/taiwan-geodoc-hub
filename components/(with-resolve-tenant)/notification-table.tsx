"use client"

// import { useState, useEffect, useMemo } from "react"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "~/components/shadcn/card"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "~/components/shadcn/select"
// import { useSearchParams, useRouter } from "next/navigation"
// import { CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react"
// import { useTranslations } from "next-intl"
// import { HumanReadableFormatter } from "@/taiwan-geodoc-hub/infrastructure/formatters/human-readable-formatter"
// import { Input } from "~/components/shadcn/input"
// import Paginator from "~/components/(with-resolve-tenant)/paginator"
// import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
// import { useContainer } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider"
// import { type Notification } from "@/taiwan-geodoc-hub/modules/notifying/dtos/notification"
// import { ListNotifications } from "@/taiwan-geodoc-hub/modules/notifying/application/list-notifications"
// import { useTick } from "~/composables/use-tick"

// const toHumanReadable = new HumanReadableFormatter()

// const useQueryParams = () => {
// const searchParams = useSearchParams()
// const initSeverity = (): Severity | "all" => {
//     const severity = searchParams.get("severity")
//     return Object.values(Severity).includes(severity as Severity)
//         ? (severity as Severity)
//         : "all"
// }
// const initPage = (): number => {
//     const page = parseInt(searchParams.get("page") || "1")
//     return isNaN(page) || page < 1 ? 1 : page
// }

// const [severity, setSeverity] = useState<Severity | "all">(initSeverity())
// const [page, setPage] = useState<number>(initPage())
// const router = useRouter()
// useEffect(() => {
//     const params = new URLSearchParams()
//     params.set("severity", severity)
//     params.set("page", String(page))
//     const next = `?${params.toString()}`
//     if (next !== window.location.search)
//         router.replace(next, { scroll: false })
// }, [severity, page, router])
// return {
//     severity,
//     setSeverity,
//     page,
//     setPage,
// }
// }

export default function () {
    return <></>

    // const [notifications, setNotifications] = useState<Notification[]>([])
    // const t = useTranslations(Route.Notifications)
    // const __ = useTranslations(Route.Tenant)

    // const [total, setTotal] = useState<number>(0)
    // const [loaded, setLoaded] = useState(false)
    // const { severity, setSeverity, page, setPage } = useQueryParams()

    // const container = useContainer()
    // const listNotifications = useMemo(
    //     () => container.resolve(ListNotifications),
    //     [container],
    // )
    // const { millis: timestamp } = useTick()
    // useEffect(() => {
    //     setLoaded(false)
    //     const run = async () => {
    //         const { records: notifications, total } = await listNotifications(
    //             severity === "all" ? undefined : severity,
    //             page,
    //         )
    //         setNotifications(notifications)
    //         setTotal(total)
    //         setLoaded(true)
    //     }
    //     run()
    // }, [page, severity, setTotal, listNotifications])

    // if (!loaded) return null

    // return (
    //     <>
    //         <div className="space-y-6">
    //             <div className="flex items-center justify-between">
    //                 <h1 className="text-2xl font-bold tracking-tight">
    //                     {/* {t("metadata.title")} */}
    //                 </h1>
    //             </div>
    //             <Card>
    //                 <CardHeader>
    //                     <CardTitle>{t("metadata.title")}</CardTitle>
    //                     <CardDescription>
    //                         {t("metadata.description")}
    //                     </CardDescription>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <div className="flex flex-col gap-4">
    //                         <form className="flex flex-wrap gap-4">
    //                             <Select
    //                                 value={severity}
    //                                 onValueChange={(value) =>
    //                                     setSeverity(value as Severity)
    //                                 }
    //                             >
    //                                 <SelectTrigger className="w-[180px]">
    //                                     <SelectValue
    //                                         placeholder={t(
    //                                             "filters.severity.name",
    //                                         )}
    //                                     />
    //                                 </SelectTrigger>
    //                                 <SelectContent>
    //                                     <SelectItem value={"all"}>
    //                                         {t("filters.severity.options.all")}
    //                                     </SelectItem>
    //                                     <SelectItem
    //                                         value={`${Severity.Success}`}
    //                                     >
    //                                         {t(
    //                                             "filters.severity.options.success",
    //                                         )}
    //                                     </SelectItem>
    //                                     <SelectItem
    //                                         value={`${Severity.Warning}`}
    //                                     >
    //                                         {t(
    //                                             "filters.severity.options.warning",
    //                                         )}
    //                                     </SelectItem>
    //                                     <SelectItem value={`${Severity.Error}`}>
    //                                         {t(
    //                                             "filters.severity.options.error",
    //                                         )}
    //                                     </SelectItem>
    //                                     <SelectItem value={`${Severity.Info}`}>
    //                                         {t("filters.severity.options.info")}
    //                                     </SelectItem>
    //                                 </SelectContent>
    //                             </Select>
    //                             <Input
    //                                 type="hidden"
    //                                 name="page"
    //                                 value={String(page)}
    //                             />
    //                         </form>

    //                         <div className="space-y-4 mt-4">
    //                             {notifications.length > 0 ? (
    //                                 notifications.map((notification) => (
    //                                     <Card
    //                                         key={""}
    //                                         className="overflow-hidden"
    //                                     >
    //                                         <CardContent className="p-4">
    //                                             <div className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
    //                                                 <div className="mt-0.5">
    //                                                     {notification.severity ===
    //                                                         Severity.Success && (
    //                                                         <CheckCircle className="h-4 w-4 text-green-500" />
    //                                                     )}
    //                                                     {notification.severity ===
    //                                                         Severity.Warning && (
    //                                                         <AlertTriangle className="h-4 w-4 text-amber-500" />
    //                                                     )}
    //                                                     {notification.severity ===
    //                                                         Severity.Error && (
    //                                                         <AlertCircle className="h-4 w-4 text-red-500" />
    //                                                     )}
    //                                                     {notification.severity ===
    //                                                         Severity.Info && (
    //                                                         <Info className="h-4 w-4 text-blue-500" />
    //                                                     )}
    //                                                 </div>
    //                                                 <div className="flex-1">
    //                                                     <div className="flex items-start justify-between">
    //                                                         <h4 className="text-sm font-medium">
    //                                                             {""}
    //                                                         </h4>
    //                                                         <span className="text-xs text-muted-foreground ml-2">
    //                                                             {((
    //                                                                 moment,
    //                                                                 payload,
    //                                                             ) =>
    //                                                                 _(
    //                                                                     `moment.${moment}`,
    //                                                                     payload,
    //                                                                 ))(
    //                                                                 ...toHumanReadable(
    //                                                                     0,
    //                                                                     timestamp,
    //                                                                 ),
    //                                                             )}
    //                                                         </span>
    //                                                     </div>
    //                                                     <p className="text-xs mt-1 text-muted-foreground">
    //                                                         {""}
    //                                                     </p>
    //                                                 </div>
    //                                             </div>
    //                                         </CardContent>
    //                                     </Card>
    //                                 ))
    //                             ) : (
    //                                 <div className="text-center py-8">
    //                                     <p className="text-muted-foreground">
    //                                         {t("notices.no-notifications")}
    //                                     </p>
    //                                 </div>
    //                             )}
    //                         </div>

    //                         <Paginator
    //                             page={page}
    //                             length={notifications.length}
    //                             total={total}
    //                             onPageChange={(page) => setPage(page)}
    //                         />
    //                     </div>
    //                 </CardContent>
    //             </Card>
    //         </div>
    //     </>
    // )
}
