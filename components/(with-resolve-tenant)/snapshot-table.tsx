"use client"

// import { Button } from "~/components/shadcn/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "~/components/shadcn/card"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "~/components/shadcn/dropdown-menu"
// import { Input } from "~/components/shadcn/input"
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "~/components/shadcn/table"
// import { Download, MoreHorizontal } from "lucide-react"
// import { useState, useEffect, useMemo } from "react"
// import { useParams, useSearchParams, useRouter } from "next/navigation"
// import { useTranslations } from "next-intl"
// import UploadSnapshotButton from "~/components/(with-resolve-tenant)/snapshots/upload-snapshot"
// import Paginator from "~/components/(with-resolve-tenant)/paginator"
// import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
// import Link from "next/link"
// import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
// import { useContainer } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider"
// import { ListSnapshots } from "@/taiwan-geodoc-hub/modules/registration-managing/application/list-snapshots"

// const useQueryParams = () => {
//     const searchParams = useSearchParams()
//     const initPage = (): number => {
//         const page = parseInt(searchParams.get("page") || "1")
//         return isNaN(page) || page < 1 ? 1 : page
//     }
//     const initKeyword = (): string => {
//         return searchParams.get("keyword") || ""
//     }
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
//         params.set("keyword", debouncedKeyword)
//         params.set("page", String(page))
//         const next = `?${params.toString()}`
//         if (next !== window.location.search)
//             router.replace(next, { scroll: false })
//     }, [page, debouncedKeyword, router])
//     return { page, setPage, keyword, setKeyword, debouncedKeyword }
// }

export default function () {
    return <></>
    // const t = useTranslations(Route.Snapshots)
    // const [snapshots, setSnapshots] = useState<Snapshot[]>([])
    // const { tenantId } = useParams<{ tenantId: string }>()
    // const [total, setTotal] = useState<number>(0)
    // const [loaded, setLoaded] = useState(false)
    // const { page, setPage, keyword, setKeyword, debouncedKeyword } =
    //     useQueryParams()
    // const container = useContainer()
    // const listSnapshots = useMemo(
    //     () => container.resolve(ListSnapshots),
    //     [container],
    // )
    // useEffect(() => {
    //     setLoaded(false)
    //     const run = async () => {
    //         const { records: snapshots, total } = await listSnapshots(
    //             debouncedKeyword,
    //             page,
    //         )
    //         setSnapshots(snapshots)
    //         setTotal(total)
    //         setLoaded(true)
    //     }
    //     run()
    // }, [keyword, page, debouncedKeyword, listSnapshots])

    // if (!loaded) return null

    // return (
    //     <>
    //         <div className="space-y-6">
    //             <div className="flex items-center justify-between">
    //                 <h1 className="text-2xl font-semibold tracking-tight">
    //                     {/* {t("metadata.title")} */}
    //                 </h1>
    //                 <div className="flex gap-2">
    //                     <UploadSnapshotButton />
    //                 </div>
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
    //                             <div className="flex-1">
    //                                 <Input
    //                                     name="keyword"
    //                                     value={keyword}
    //                                     onChange={(event) =>
    //                                         setKeyword(event.target.value)
    //                                     }
    //                                     placeholder={t(
    //                                         "filters.keyword.placeholder",
    //                                     )}
    //                                 />
    //                             </div>
    //                             <Input type="hidden" name="page" value={page} />
    //                         </form>

    //                         <div className="rounded-md border">
    //                             <Table>
    //                                 <TableHeader>
    //                                     <TableRow>
    //                                         <TableHead>
    //                                             {t("fields.id")}
    //                                         </TableHead>
    //                                         <TableHead>
    //                                             {t("fields.file-name")}
    //                                         </TableHead>
    //                                         <TableHead>
    //                                             {t("fields.upload-date")}
    //                                         </TableHead>
    //                                         <TableHead>
    //                                             {t("fields.file-size")}
    //                                         </TableHead>
    //                                         <TableHead>
    //                                             {t("fields.uploader")}
    //                                         </TableHead>
    //                                         <TableHead className="text-right">
    //                                             {t("fields.actions")}
    //                                         </TableHead>
    //                                     </TableRow>
    //                                 </TableHeader>
    //                                 <TableBody>
    //                                     {snapshots.map((snapshot) => (
    //                                         <TableRow key={snapshot.id}>
    //                                             <TableCell className="font-medium">
    //                                                 {snapshot.id}
    //                                             </TableCell>
    //                                             <TableCell className="font-medium">
    //                                                 <Link
    //                                                     href={Route.Registrations.replace(
    //                                                         "[tenantId]",
    //                                                         tenantId,
    //                                                     ).replace(
    //                                                         "[snapshotId]",
    //                                                         snapshot.id,
    //                                                     )}
    //                                                 >
    //                                                     {snapshot.filename}
    //                                                 </Link>
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 {snapshot.uploadDate}
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 {snapshot.fileSize}
    //                                             </TableCell>
    //                                             <TableCell>
    //                                                 {snapshot.uploader}
    //                                             </TableCell>
    //                                             <TableCell className="text-right">
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
    //                                                         <DropdownMenuItem>
    //                                                             <Download className="mr-2 h-4 w-4" />
    //                                                             {t(
    //                                                                 "buttons.export",
    //                                                             )}
    //                                                         </DropdownMenuItem>
    //                                                     </DropdownMenuContent>
    //                                                 </DropdownMenu>
    //                                             </TableCell>
    //                                         </TableRow>
    //                                     ))}
    //                                 </TableBody>
    //                             </Table>
    //                         </div>

    //                         <Paginator
    //                             page={page}
    //                             length={snapshots.length}
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
