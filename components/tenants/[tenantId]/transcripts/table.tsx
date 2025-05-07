"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import { Badge } from "@/components/shadcn/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { Input } from "@/components/shadcn/input"
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
import { Download, RefreshCw, MoreHorizontal, Play, Eye } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/shadcn/alert-dialog"
import { Checkbox } from "@/components/shadcn/checkbox"
import { useState, useEffect, useRef } from "react"
import { onListingTranscripts } from "@/lib/modules/transcripts-parsing/presentation/ui/on-listing-transcripts"
import { type Transcript } from "@/lib/adapters/transcript-dao"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { TranscriptStatuses } from "@/lib/adapters/transcript-dao"
import { useTranslations } from "next-intl"
import UploadTranscriptButton from "@/components/tenants/[tenantId]/transcripts/upload-transcript-button"
import ParseTranscriptsButton from "@/components/tenants/[tenantId]/transcripts/parse-transcripts-button"
import Paginator from "@/components/tenants/[tenantId]/paginator"
import { Routes } from "@/lib/constants/routes"

const useStatus = () => {
  const searchParams = useSearchParams()
  let status: TranscriptStatuses | "all" = "all"
  if (
    Object.values(TranscriptStatuses).includes(
      searchParams.get("status") as TranscriptStatuses,
    )
  )
    status = searchParams.get("status") as TranscriptStatuses
  return useState<TranscriptStatuses | "all">(status)
}

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

export default function TranscriptsTable() {
  const t = useTranslations(Routes.Transcripts)
  const _ = useTranslations(Routes.Root)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [jsonDialogContent, setJsonDialogContent] = useState<unknown>(null)
  const [jsonDialogOpen, setJsonDialogOpen] = useState(false)
  const [transcripts, setTranscripts] = useState<Transcript[]>([])
  const { tenantId } = useParams<{ tenantId: string }>()
  const router = useRouter()
  const [status, setStatus] = useStatus()
  const [page, setPage] = usePage()
  const [total, setTotal] = useState<number>(0)
  const [keyword] = useKeyword()
  const form = useRef<HTMLFormElement>(null)
  useEffect(() => {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set("status", status)
    newSearchParams.set("keyword", keyword)
    newSearchParams.set("page", String(page))
    router.replace(`?${newSearchParams.toString()}`)
    onListingTranscripts({
      tenantId,
      status: status === "all" ? undefined : status,
      keyword,
      page,
    }).then(({ records: transcripts, total }) => {
      setTranscripts(transcripts)
      setTotal(total)
    })
  }, [tenantId, status, keyword, page, router])

  const calculateTotalPoints = () => {
    return selectedItems.reduce((total, id) => {
      const record = transcripts.find((item) => item.id === id)
      if (!record) return total
      if (record.status.includes(TranscriptStatuses.Failed)) return total
      return total + record.points
    }, 0)
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) return setSelectedItems([...selectedItems, id])
    setSelectedItems(selectedItems.filter((item) => item !== id))
  }

  const handleSelectAll = (checked: boolean) => {
    if (!checked) return setSelectedItems([])
    const availableItems = transcripts
      .filter(
        (record) =>
          record.status === TranscriptStatuses.Pending ||
          record.status.includes(TranscriptStatuses.Failed),
      )
      .map((record) => record.id)
    setSelectedItems(availableItems)
  }

  const isItemSelectable = (status: string) => {
    return (
      status === TranscriptStatuses.Pending ||
      status.includes(TranscriptStatuses.Failed)
    )
  }

  const showJsonContent = (content: unknown) => {
    setJsonDialogContent(content)
    setJsonDialogOpen(true)
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            {/* {t("metadata.title")} */}
          </h1>
          <div className="flex gap-2">
            <UploadTranscriptButton />
            <ParseTranscriptsButton
              selectedItems={selectedItems.length}
              totalPoints={calculateTotalPoints()}
            />
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
                <Select
                  value={status}
                  name="status"
                  onValueChange={(value) =>
                    setStatus(value as TranscriptStatuses)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("filters.status.name")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("filters.status.options.all")}
                    </SelectItem>
                    <SelectItem value="success">
                      {t("filters.status.options.success")}
                    </SelectItem>
                    <SelectItem value="processing">
                      {t("filters.status.options.processing")}
                    </SelectItem>
                    <SelectItem value="failed">
                      {t("filters.status.options.failed")}
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                      <TableHead className="w-[50px]">
                        <Checkbox
                          onCheckedChange={(checked) =>
                            handleSelectAll(checked as boolean)
                          }
                          checked={
                            selectedItems.length > 0 &&
                            selectedItems.length ===
                              transcripts.filter((r) =>
                                isItemSelectable(r.status),
                              ).length
                          }
                        />
                      </TableHead>
                      <TableHead>{t("fields.file-name")}</TableHead>
                      <TableHead>{t("fields.upload-date")}</TableHead>
                      <TableHead>{t("fields.status")}</TableHead>
                      <TableHead>{t("fields.file-size")}</TableHead>
                      <TableHead>{t("fields.points")}</TableHead>
                      <TableHead className="text-right">
                        {t("fields.actions")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transcripts.map((transcript) => (
                      <TableRow key={transcript.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.includes(transcript.id)}
                            onCheckedChange={(checked) =>
                              handleSelectItem(
                                transcript.id,
                                checked as boolean,
                              )
                            }
                            disabled={
                              transcript.status ===
                                TranscriptStatuses.Success ||
                              transcript.status === TranscriptStatuses.Pending
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {transcript.filename}
                        </TableCell>
                        <TableCell>{transcript.uploadDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transcript.status === TranscriptStatuses.Success
                                ? "success"
                                : transcript.status.includes(
                                      TranscriptStatuses.Failed,
                                    )
                                  ? "error"
                                  : transcript.status ===
                                      TranscriptStatuses.Failed
                                    ? "secondary"
                                    : "outline"
                            }
                          >
                            {_(`statuses.transcripts.${transcript.status}`)}
                          </Badge>
                        </TableCell>
                        <TableCell>{transcript.fileSize}</TableCell>
                        <TableCell>{transcript.points}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">
                                  {t("buttons.open-menu")}
                                </span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {transcript.status ===
                                TranscriptStatuses.Success && (
                                <>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    {t("buttons.download-excel")}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      showJsonContent(transcript.jsonContent)
                                    }
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    {t("buttons.view-json-content")}
                                  </DropdownMenuItem>
                                </>
                              )}
                              {transcript.status ===
                                TranscriptStatuses.Pending && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(event) =>
                                        event.preventDefault()
                                      }
                                    >
                                      <Play className="mr-2 h-4 w-4" />
                                      {t("buttons.parse")}
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        {t(
                                          "notices.confirm-parse-transcript.title",
                                        )}
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        {t(
                                          "notices.confirm-parse-transcript.description",
                                          {
                                            points: transcript.points,
                                          },
                                        )}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        {t("buttons.cancel")}
                                      </AlertDialogCancel>
                                      <AlertDialogAction>
                                        {t("buttons.confirm")}
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                              {transcript.status.includes(
                                TranscriptStatuses.Failed,
                              ) &&
                                transcript.attempts < 3 && (
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem
                                        onSelect={(event) =>
                                          event.preventDefault()
                                        }
                                      >
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        {t("buttons.reparse")}
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          {t(
                                            "notices.confirm-reparse-transcript.title",
                                          )}
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          {t(
                                            "notices.confirm-reparse-transcript.description",
                                          )}
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          {t("buttons.cancel")}
                                        </AlertDialogCancel>
                                        <AlertDialogAction>
                                          {t("buttons.confirm")}
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
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
                length={transcripts.length}
                total={total}
                onPageChange={(page) => setPage(page)}
              />
            </div>
          </CardContent>
        </Card>

        {/* JSON 內容對話框 */}
        <Dialog open={jsonDialogOpen} onOpenChange={setJsonDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>JSON 內容</DialogTitle>
              <DialogDescription>
                謄本解析結果的 JSON 格式數據
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted p-4 rounded-md overflow-auto max-h-96">
              <pre className="text-sm">
                {JSON.stringify(jsonDialogContent, null, 2)}
              </pre>
            </div>
            <DialogFooter>
              <Button onClick={() => setJsonDialogOpen(false)}>關閉</Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                下載 JSON
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
