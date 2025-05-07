"use client"

import { Button } from "@/components/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { Input } from "@/components/shadcn/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import { Download, MoreHorizontal } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { onListingSnapshots } from "@/lib/modules/snapshots-parsing/presentation/controllers/on-listing-snapshots"
import { type Snapshot } from "@/lib/adapters/snapshot-dao"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import UploadSnapshotButton from "@/components/tenants/[tenantId]/snapshots/upload-snapshot-button"
import Paginator from "@/components/tenants/[tenantId]/paginator"
import { Routes } from "@/lib/constants/routes"
import Link from "next/link"

const usePage = () => {
  const searchParams = useSearchParams()
  let page = parseInt(searchParams.get("page") || "1")
  if (isNaN(page) || page < 1) page = 1
  return useState<number>(page)
}

const useKeyword = () => {
  const searchParams = useSearchParams()
  return useState<string>(searchParams.get("keyword") || "")
}

export default function SnapshotsTable() {
  const t = useTranslations(Routes.Snapshots)
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const { tenantId } = useParams<{ tenantId: string }>()
  const router = useRouter()
  const [page, setPage] = usePage()
  const [total, setTotal] = useState<number>(0)
  const [keyword] = useKeyword()
  const form = useRef<HTMLFormElement>(null)
  useEffect(() => {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set("keyword", keyword)
    newSearchParams.set("page", String(page))
    router.replace(`?${newSearchParams.toString()}`)
    onListingSnapshots({
      tenantId,
      keyword,
      page,
    }).then(({ records: snapshots, total }) => {
      setSnapshots(snapshots)
      setTotal(total)
    })
  }, [tenantId, keyword, page, router])

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {/* {t("metadata.title")} */}
          </h1>
          <div className="flex gap-2">
            <UploadSnapshotButton />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("metadata.title")}</CardTitle>
            <CardDescription>{t("metadata.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <form ref={form} className="flex flex-wrap gap-4">
                <div className="flex-1">
                  <Input
                    name="keyword"
                    defaultValue={keyword}
                    placeholder={t("filters.keyword.placeholder")}
                  />
                </div>
                <Input type="hidden" name="page" value={page} />
              </form>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("fields.id")}</TableHead>
                      <TableHead>{t("fields.file-name")}</TableHead>
                      <TableHead>{t("fields.upload-date")}</TableHead>
                      <TableHead>{t("fields.file-size")}</TableHead>
                      <TableHead>{t("fields.uploader")}</TableHead>
                      <TableHead className="text-right">
                        {t("fields.actions")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {snapshots.map((snapshot) => (
                      <TableRow key={snapshot.id}>
                        <TableCell className="font-medium">
                          {snapshot.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          <Link
                            href={Routes.Registrations.replace(
                              "[tenantId]",
                              tenantId,
                            ).replace("[snapshotId]", snapshot.id)}
                          >
                            {snapshot.filename}
                          </Link>
                        </TableCell>
                        <TableCell>{snapshot.uploadDate}</TableCell>
                        <TableCell>{snapshot.fileSize}</TableCell>
                        <TableCell>{snapshot.uploader}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only"></span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                {t("buttons.export")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Paginator
                page={page}
                length={snapshots.length}
                total={total}
                onPageChange={(page) => setPage(page)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
