"use client"

// import { useEffect, useState, useMemo } from "react"
// import { useParams } from "next/navigation"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "~/components/shadcn/card"
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "~/components/shadcn/table"
// import { Button } from "~/components/shadcn/button"
// import { Badge } from "~/components/shadcn/badge"
// import { Checkbox } from "~/components/shadcn/checkbox"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "~/components/shadcn/dropdown-menu"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "~/components/shadcn/dialog"
// import {
//     Download,
//     Eye,
//     FileText,
//     MoreHorizontal,
//     Play,
//     RefreshCw,
//     Loader2,
// } from "lucide-react"
// import { useTranslations } from "next-intl"
// import { type Registration } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/registration"
// import { RegistrationStatus } from "@/taiwan-geodoc-hub/modules/registration-managing/enums/registration-status"
// import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
// import { ParcelType } from "@/taiwan-geodoc-hub/modules/registration-managing/enums/parcel-type"
// import { useContainer } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/snapshot-provider"
// import { RetrieveSnapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/application/retrieve-snapshot"
// import { ListRegistrations } from "@/taiwan-geodoc-hub/modules/registration-managing/application/list-registrations"

export default function () {
    return <></>
    // const { tenantId, snapshotId } = useParams() as {
    //     tenantId: string
    //     snapshotId: string
    // }
    // const [snapshot, setSnapshot] = useState<Snapshot>(
    //     {} as unknown as Snapshot,
    // )
    // const [registrations, setRegistrations] = useState<Registration[]>([])
    // const [loaded, setLoaded] = useState(false)
    // const container = useContainer()

    // const retrieveSnapshot = useMemo(
    //     () => container.resolve(RetrieveSnapshot),
    //     [container],
    // )
    // useEffect(() => {
    //     const run = async () => {
    //         const snapshot = await retrieveSnapshot()
    //         setSnapshot(snapshot)
    //     }
    //     run()
    // }, [tenantId, snapshotId, retrieveSnapshot])

    // const listRegistrations = useMemo(
    //     () => container.resolve(ListRegistrations),
    //     [container],
    // )
    // useEffect(() => {
    //     setLoaded(false)
    //     const run = async () => {
    //         const registrations = await listRegistrations()
    //         setRegistrations(registrations)
    //         setLoaded(true)
    //     }
    //     run()
    // }, [tenantId, snapshotId, listRegistrations])

    // // 選中的項目
    // const [selectedItems, setSelectedItems] = useState<string[]>([])
    // const _ = useTranslations("/")
    // const t = useTranslations(
    //     "/tenants/[tenantId]/snapshots/[snapshotId]/registrations",
    // )

    // // 可選擇的項目（未開始或失敗狀態）
    // const selectableItems = registrations.filter(
    //     (item) =>
    //         item.status === RegistrationStatus.Pending ||
    //         item.status === RegistrationStatus.Failed,
    // )

    // // 當前已選中的可選擇項目
    // const selectedSelectableItems = selectedItems.filter((id) =>
    //     registrations.some((item) => item.id === id),
    // )

    // // 檢查是否全選（所有可選擇項目）
    // const isAllSelected =
    //     selectableItems.length > 0 &&
    //     selectableItems.every((item) => selectedItems.includes(item.id))

    // // 檢查是否部分選中
    // const isIndeterminate = selectedSelectableItems.length > 0 && !isAllSelected

    // // 處理全選/取消全選
    // const handleSelectAll = (checked: boolean) => {
    //     if (checked) {
    //         const newSelected = [...selectedItems]
    //         selectableItems.forEach((item) => {
    //             if (!newSelected.includes(item.id)) {
    //                 newSelected.push(item.id)
    //             }
    //         })
    //         setSelectedItems(newSelected)
    //     } else {
    //         const selectableIds = selectableItems.map((item) => item.id)
    //         setSelectedItems(
    //             selectedItems.filter((id) => !selectableIds.includes(id)),
    //         )
    //     }
    // }

    // // 處理單個項目選擇
    // const handleSelectItem = (id: string, checked: boolean) => {
    //     if (checked) {
    //         setSelectedItems([...selectedItems, id])
    //     } else {
    //         setSelectedItems(selectedItems.filter((item) => item !== id))
    //     }
    // }

    // // 處理批次解析
    // const handleBatchParse = () => {
    //     if (selectedItems.length === 0) return

    //     // 更新選中項目的狀態為"解析中"
    //     setRegistrations((prev) =>
    //         prev.map((item) =>
    //             selectedItems.includes(item.id)
    //                 ? { ...item, status: RegistrationStatus.Parsing }
    //                 : item,
    //         ),
    //     )

    //     // 清空選中項目
    //     setSelectedItems([])

    //     // 模擬解析過程（3秒後隨機設置為成功或失敗）
    //     setTimeout(() => {
    //         setRegistrations((prev) =>
    //             prev.map((item) => {
    //                 if (selectedItems.includes(item.id)) {
    //                     // 90% 成功率
    //                     const isSuccess = Math.random() > 0.1
    //                     return {
    //                         ...item,
    //                         status: isSuccess
    //                             ? RegistrationStatus.Success
    //                             : RegistrationStatus.Failed,
    //                     }
    //                 }
    //                 return item
    //             }),
    //         )
    //     }, 3000)
    // }

    // // 處理單個解析
    // const handleParse = (id: string) => {
    //     setRegistrations((prev) =>
    //         prev.map((item) =>
    //             item.id === id
    //                 ? { ...item, status: RegistrationStatus.Parsing }
    //                 : item,
    //         ),
    //     )

    //     // 模擬解析過程
    //     setTimeout(() => {
    //         setRegistrations((prev) =>
    //             prev.map((item) => {
    //                 if (item.id === id) {
    //                     const isSuccess = Math.random() > 0.1
    //                     return {
    //                         ...item,
    //                         status: isSuccess
    //                             ? RegistrationStatus.Success
    //                             : RegistrationStatus.Failed,
    //                     }
    //                 }
    //                 return item
    //             }),
    //         )
    //     }, 2000)
    // }

    // // 處理重新解析操作
    // const handleReparse = (id: string) => {
    //     handleParse(id)
    // }

    // // 檢查項目是否可選擇
    // const isItemSelectable = (status: `${RegistrationStatus}`) => {
    //     return (
    //         status === RegistrationStatus.Pending ||
    //         status === RegistrationStatus.Failed
    //     )
    // }

    // // 格式化完整地號/建號顯示
    // const formatFullParcelNumber = (registration: Registration) => {
    //     return `${registration.city}${registration.district}${registration.section}${registration.parcelNumber}${registration.parcelType === ParcelType.Land ? "地號" : "建號"}`
    // }

    // if (!loaded) return null

    // return (
    //     <div className="space-y-6">
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>{t("sections.file-info.title")}</CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
    //                     <div>
    //                         <span className="text-muted-foreground">
    //                             {t("sections.file-info.fields.filename")}：
    //                         </span>
    //                         <span className="font-medium">
    //                             {snapshot.filename}
    //                         </span>
    //                     </div>
    //                     <div>
    //                         <span className="text-muted-foreground">
    //                             {t("sections.file-info.fields.upload-date")}：
    //                         </span>
    //                         <span>{snapshot.uploadDate}</span>
    //                     </div>
    //                     <div>
    //                         <span className="text-muted-foreground">
    //                             {t("sections.file-info.fields.uploader")}：
    //                         </span>
    //                         <span>{snapshot.uploader}</span>
    //                     </div>
    //                 </div>
    //             </CardContent>
    //         </Card>

    //         <div className="flex items-center justify-between">
    //             <div className="flex items-center gap-4"></div>
    //             <div className="flex gap-2">
    //                 {selectedItems.length > 0 && (
    //                     <Button size="sm" onClick={handleBatchParse}>
    //                         <Play className="mr-2 h-4 w-4" />
    //                         {t("buttons.batch-parse")} ({selectedItems.length})
    //                     </Button>
    //                 )}
    //                 <Button size="sm" variant="outline">
    //                     <Download className="mr-2 h-4 w-4" />
    //                     {t("buttons.export")}
    //                 </Button>
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
    //                     <div className="rounded-md border">
    //                         <Table>
    //                             <TableHeader>
    //                                 <TableRow>
    //                                     <TableHead className="w-12">
    //                                         <Checkbox
    //                                             checked={isAllSelected}
    //                                             onCheckedChange={
    //                                                 handleSelectAll
    //                                             }
    //                                             disabled={
    //                                                 selectableItems.length === 0
    //                                             }
    //                                             ref={(el) => {
    //                                                 if (el)
    //                                                     (
    //                                                         el as HTMLInputElement
    //                                                     ).indeterminate =
    //                                                         isIndeterminate
    //                                             }}
    //                                         />
    //                                     </TableHead>
    //                                     <TableHead className="w-16">
    //                                         {t("fields.id")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.region")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.section")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.parcel-number")}
    //                                     </TableHead>
    //                                     <TableHead>
    //                                         {t("fields.parcel-type")}
    //                                     </TableHead>
    //                                     <TableHead className="w-32">
    //                                         {t("fields.status")}
    //                                     </TableHead>
    //                                     <TableHead className="text-right w-20">
    //                                         {t("fields.actions")}
    //                                     </TableHead>
    //                                 </TableRow>
    //                             </TableHeader>
    //                             <TableBody>
    //                                 {registrations.map((registration) => (
    //                                     <TableRow key={registration.id}>
    //                                         <TableCell>
    //                                             <Checkbox
    //                                                 checked={selectedItems.includes(
    //                                                     registration.id,
    //                                                 )}
    //                                                 onCheckedChange={(
    //                                                     checked,
    //                                                 ) =>
    //                                                     handleSelectItem(
    //                                                         registration.id,
    //                                                         checked as boolean,
    //                                                     )
    //                                                 }
    //                                                 disabled={
    //                                                     !isItemSelectable(
    //                                                         registration.status,
    //                                                     )
    //                                                 }
    //                                             />
    //                                         </TableCell>
    //                                         <TableCell className="font-mono text-sm">
    //                                             {registration.id}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {registration.city}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {registration.district}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {registration.section}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {_(
    //                                                 `types.registrations.${registration.parcelType}`,
    //                                             )}
    //                                         </TableCell>
    //                                         <TableCell className="font-medium">
    //                                             {registration.parcelNumber}
    //                                         </TableCell>
    //                                         <TableCell>
    //                                             {registration.status ===
    //                                                 RegistrationStatus.Success && (
    //                                                 <Badge variant="success">
    //                                                     {_(
    //                                                         "statuses.registrations.success",
    //                                                     )}
    //                                                 </Badge>
    //                                             )}
    //                                             {registration.status ===
    //                                                 RegistrationStatus.Parsing && (
    //                                                 <Badge
    //                                                     variant="outline"
    //                                                     className="text-blue-600"
    //                                                 >
    //                                                     <Loader2 className="mr-1 h-3 w-3 animate-spin" />
    //                                                     {_(
    //                                                         "statuses.registrations.parsing",
    //                                                     )}
    //                                                 </Badge>
    //                                             )}
    //                                             {registration.status ===
    //                                                 RegistrationStatus.Failed && (
    //                                                 <Badge variant="error">
    //                                                     {_(
    //                                                         "statuses.registrations.failed",
    //                                                     )}
    //                                                 </Badge>
    //                                             )}
    //                                             {registration.status ===
    //                                                 RegistrationStatus.Pending && (
    //                                                 <Badge variant="outline">
    //                                                     {_(
    //                                                         "statuses.registrations.pending",
    //                                                     )}
    //                                                 </Badge>
    //                                             )}
    //                                         </TableCell>
    //                                         <TableCell className="text-right">
    //                                             <DropdownMenu>
    //                                                 <DropdownMenuTrigger
    //                                                     asChild
    //                                                 >
    //                                                     <Button
    //                                                         variant="ghost"
    //                                                         size="icon"
    //                                                     >
    //                                                         <MoreHorizontal className="h-4 w-4" />
    //                                                         <span className="sr-only"></span>
    //                                                     </Button>
    //                                                 </DropdownMenuTrigger>
    //                                                 <DropdownMenuContent align="end">
    //                                                     {/* 解析 - 只有未開始狀態才顯示 */}
    //                                                     {registration.status ===
    //                                                         RegistrationStatus.Pending && (
    //                                                         <DropdownMenuItem
    //                                                             onClick={() =>
    //                                                                 handleParse(
    //                                                                     registration.id,
    //                                                                 )
    //                                                             }
    //                                                         >
    //                                                             <Play className="mr-2 h-4 w-4" />
    //                                                             {t(
    //                                                                 "buttons.parse",
    //                                                             )}
    //                                                         </DropdownMenuItem>
    //                                                     )}

    //                                                     {/* 重新解析 - 只有失敗狀態才顯示 */}
    //                                                     {registration.status ===
    //                                                         RegistrationStatus.Failed && (
    //                                                         <DropdownMenuItem
    //                                                             onClick={() =>
    //                                                                 handleReparse(
    //                                                                     registration.id,
    //                                                                 )
    //                                                             }
    //                                                         >
    //                                                             <RefreshCw className="mr-2 h-4 w-4" />
    //                                                             {t(
    //                                                                 "buttons.reparse",
    //                                                             )}
    //                                                         </DropdownMenuItem>
    //                                                     )}

    //                                                     {/* 查看原文 - 所有狀態都可以查看 */}
    //                                                     <Dialog>
    //                                                         <DialogTrigger
    //                                                             asChild
    //                                                         >
    //                                                             <DropdownMenuItem
    //                                                                 onSelect={(
    //                                                                     e,
    //                                                                 ) =>
    //                                                                     e.preventDefault()
    //                                                                 }
    //                                                             >
    //                                                                 <FileText className="mr-2 h-4 w-4" />
    //                                                                 {t(
    //                                                                     "buttons.show-original",
    //                                                                 )}
    //                                                             </DropdownMenuItem>
    //                                                         </DialogTrigger>
    //                                                         <DialogContent className="max-w-4xl max-h-[80vh]">
    //                                                             <DialogHeader>
    //                                                                 <DialogTitle>
    //                                                                     {t(
    //                                                                         "sections.original.title",
    //                                                                     )}
    //                                                                 </DialogTitle>
    //                                                                 <DialogDescription>
    //                                                                     {formatFullParcelNumber(
    //                                                                         registration,
    //                                                                     )}
    //                                                                 </DialogDescription>
    //                                                             </DialogHeader>
    //                                                             <div className="max-h-[60vh] overflow-y-auto">
    //                                                                 <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md">
    //                                                                     {
    //                                                                         registration.text
    //                                                                     }
    //                                                                 </pre>
    //                                                             </div>
    //                                                         </DialogContent>
    //                                                     </Dialog>

    //                                                     {/* 查看結果 - 只有已完成狀態才顯示 */}
    //                                                     {registration.status ===
    //                                                         RegistrationStatus.Success && (
    //                                                         <Dialog>
    //                                                             <DialogTrigger
    //                                                                 asChild
    //                                                             >
    //                                                                 <DropdownMenuItem
    //                                                                     onSelect={(
    //                                                                         e,
    //                                                                     ) =>
    //                                                                         e.preventDefault()
    //                                                                     }
    //                                                                 >
    //                                                                     <Eye className="mr-2 h-4 w-4" />
    //                                                                     {t(
    //                                                                         "buttons.show-result",
    //                                                                     )}
    //                                                                 </DropdownMenuItem>
    //                                                             </DialogTrigger>
    //                                                             <DialogContent className="max-w-2xl">
    //                                                                 <DialogHeader>
    //                                                                     <DialogTitle>
    //                                                                         {t(
    //                                                                             "sections.result.title",
    //                                                                         )}
    //                                                                     </DialogTitle>
    //                                                                     <DialogDescription>
    //                                                                         {formatFullParcelNumber(
    //                                                                             registration,
    //                                                                         )}
    //                                                                     </DialogDescription>
    //                                                                 </DialogHeader>
    //                                                                 <div className="max-h-[60vh] overflow-y-auto">
    //                                                                     <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md">
    //                                                                         {JSON.stringify(
    //                                                                             registration.json,
    //                                                                             null,
    //                                                                             2,
    //                                                                         )}
    //                                                                     </pre>
    //                                                                 </div>
    //                                                             </DialogContent>
    //                                                         </Dialog>
    //                                                     )}
    //                                                 </DropdownMenuContent>
    //                                             </DropdownMenu>
    //                                         </TableCell>
    //                                     </TableRow>
    //                                 ))}
    //                             </TableBody>
    //                         </Table>
    //                     </div>
    //                 </div>
    //             </CardContent>
    //         </Card>
    //     </div>
    // )
}
