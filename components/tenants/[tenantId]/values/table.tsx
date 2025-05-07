"use client"

import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"
import { Badge } from "@/components/shadcn/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import { Eye, RefreshCw, MoreHorizontal } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import { useTranslations } from "next-intl"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { type Value, ValueStatuses } from "@/lib/adapters/values-dao"
import { onListingValues } from "@/lib/modules/values-crawling/presentation/controllers/on-listing-values"
import { Regions } from "@/lib/constants/regions"
import CrawlValuesButton from "@/components/tenants/[tenantId]/values/crawl-values-button"
import Paginator from "@/components/tenants/[tenantId]/paginator"
import { Routes } from "@/lib/constants/routes"

const useRegions = () => {
  const searchParams = useSearchParams()
  let region: Regions | "all" = "all"
  if (Object.values(Regions).includes(searchParams.get("region") as Regions))
    region = searchParams.get("region") as Regions
  return useState<Regions | "all">(region)
}

const useStatus = () => {
  const searchParams = useSearchParams()
  let status: ValueStatuses | "all" = "all"
  if (
    Object.values(ValueStatuses).includes(
      searchParams.get("status") as ValueStatuses,
    )
  )
    status = searchParams.get("status") as ValueStatuses
  return useState<ValueStatuses | "all">(status)
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

export const ValuesTable = () => {
  const _ = useTranslations(Routes.Root)
  const t = useTranslations(Routes.Values)
  const [values, setValues] = useState<Value[]>([])
  const { tenantId } = useParams() as { tenantId: string }
  const router = useRouter()
  const [page, setPage] = usePage()
  const [total, setTotal] = useState<number>(0)
  const [keyword] = useKeyword()
  const [status, setStatus] = useStatus()
  const [region, setRegion] = useRegions()
  const form = useRef<HTMLFormElement>(null)
  useEffect(() => {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set("region", region)
    newSearchParams.set("status", status)
    newSearchParams.set("keyword", keyword)
    newSearchParams.set("page", String(page))
    router.replace(`?${newSearchParams.toString()}`)
    onListingValues({
      tenantId,
      keyword,
      page,
      status: status === "all" ? undefined : status,
      region: region === "all" ? undefined : region,
    }).then(({ records: values, total }) => {
      setValues(values)
      setTotal(total)
    })
  }, [tenantId, page, keyword, status, region, router])
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {/* {t("metadata.title")} */}
        </h1>
        <div className="flex gap-2">
          <CrawlValuesButton />
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
                name="region"
                value={region}
                onValueChange={(value) => setRegion(value as Regions)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("filters.region.name")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("filters.region.options.all")}
                  </SelectItem>
                  <SelectItem value={Regions.TaipeiCity}>
                    {_("regions.TPE")}
                  </SelectItem>
                  <SelectItem value={Regions.NewTaipeiCity}>
                    {_("regions.NWT")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                name="status"
                value={status}
                onValueChange={(value) => setStatus(value as ValueStatuses)}
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
                  placeholder={t("filters.number.placeholder")}
                />
              </div>
              <Input type="hidden" name="page" value={page} />
            </form>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("fields.region")}</TableHead>
                    <TableHead>{t("fields.section")}</TableHead>
                    <TableHead>{t("fields.number")}</TableHead>
                    <TableHead>{t("fields.query-date")}</TableHead>
                    <TableHead>{t("fields.status")}</TableHead>
                    <TableHead>{t("fields.attempts")}</TableHead>
                    <TableHead>{t("fields.querier")}</TableHead>
                    <TableHead className="text-right">
                      {t("fields.actions")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {values.map((value) => (
                    <TableRow key={value.id}>
                      <TableCell>{_(`regions.${value.region}`)}</TableCell>
                      <TableCell>{value.section}</TableCell>
                      <TableCell className="font-medium">
                        {value.number}
                      </TableCell>
                      <TableCell>{value.queryDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            value.status === ValueStatuses.Success
                              ? "success"
                              : value.status === ValueStatuses.Failed
                                ? "error"
                                : "info"
                          }
                        >
                          {_(`statuses.values.${value.status}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>{value.attempts}/3</TableCell>
                      <TableCell>{value.querier}</TableCell>
                      <TableCell className="text-right">
                        {value.status !== ValueStatuses.Pending && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only"></span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {value.status === ValueStatuses.Success && (
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  {t("buttons.view")}
                                </DropdownMenuItem>
                              )}
                              {value.status === ValueStatuses.Failed &&
                                value.attempts < 3 && (
                                  <DropdownMenuItem>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    {t("buttons.reparse")}
                                  </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Paginator
              page={page}
              length={values.length}
              total={total}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
