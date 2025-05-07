import { Button } from "@/components/shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/shadcn/dialog"
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
import {
  CalendarIcon,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react"
import { Label } from "@/components/shadcn/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import { Calendar } from "@/components/shadcn/calendar"

const landValueRecords = [
  {
    id: 1,
    city: "台北市",
    section: "大安區",
    number: "10552-0001",
    queryDate: "2023/12/19",
    status: "處理中",
    attempts: 1,
    querier: "張小明",
    result: null,
  },
  {
    id: 2,
    city: "新北市",
    section: "板橋區",
    number: "0425-0012",
    queryDate: "2023/12/15",
    status: "成功",
    attempts: 1,
    querier: "張小明",
    result: "每平方公尺 NT$ 152,000",
  },
  {
    id: 3,
    city: "台北市",
    section: "信義區",
    number: "5274-0008",
    queryDate: "2023/12/10",
    status: "失敗",
    attempts: 2,
    querier: "李小華",
    result: null,
  },
  {
    id: 4,
    city: "新北市",
    section: "中和區",
    number: "1122-0045",
    queryDate: "2023/12/05",
    status: "成功",
    attempts: 1,
    querier: "王小美",
    result: "每平方公尺 NT$ 98,500",
  },
  {
    id: 5,
    city: "台北市",
    section: "中山區",
    number: "0356-0022",
    queryDate: "2023/12/01",
    status: "成功",
    attempts: 3,
    querier: "張小明",
    result: "每平方公尺 NT$ 175,000",
  },
  {
    id: 6,
    city: "新北市",
    section: "新莊區",
    number: "2245-0033",
    queryDate: "2023/11/28",
    status: "失敗",
    attempts: 3,
    querier: "李小華",
    result: null,
  },
  {
    id: 7,
    city: "台北市",
    section: "松山區",
    number: "4521-0017",
    queryDate: "2023/11/25",
    status: "成功",
    attempts: 1,
    querier: "王小美",
    result: "每平方公尺 NT$ 162,000",
  },
  {
    id: 8,
    city: "新北市",
    section: "三重區",
    number: "3311-0009",
    queryDate: "2023/11/20",
    status: "成功",
    attempts: 2,
    querier: "張小明",
    result: "每平方公尺 NT$ 105,000",
  },
  {
    id: 9,
    city: "台北市",
    section: "內湖區",
    number: "8754-0031",
    queryDate: "2023/11/15",
    status: "成功",
    attempts: 1,
    querier: "李小華",
    result: "每平方公尺 NT$ 128,000",
  },
  {
    id: 10,
    city: "新北市",
    section: "永和區",
    number: "5566-0024",
    queryDate: "2023/11/10",
    status: "成功",
    attempts: 1,
    querier: "王小美",
    result: "每平方公尺 NT$ 112,000",
  },
]

export default function AnnouncedValuesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">公告現值查詢紀錄</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Search className="mr-2 h-4 w-4" />
                公告現值
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>公告現值</DialogTitle>
                <DialogDescription>
                  請輸入地號資訊進行公告現值查詢。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">
                    縣市
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="請選擇縣市" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="taipei">台北市</SelectItem>
                      <SelectItem value="newtaipei">新北市</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="section" className="text-right">
                    段名
                  </Label>
                  <Input id="section" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="number" className="text-right">
                    地號
                  </Label>
                  <Input id="number" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">取消</Button>
                <Button>查詢</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>公告現值查詢紀錄</CardTitle>
          <CardDescription>查看所有公告現值查詢紀錄與結果</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[240px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>選擇日期範圍</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="縣市" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="taipei">台北市</SelectItem>
                  <SelectItem value="newtaipei">新北市</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="查詢狀態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="success">成功</SelectItem>
                  <SelectItem value="processing">處理中</SelectItem>
                  <SelectItem value="failed">失敗</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1">
                <Input placeholder="搜尋地號..." />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>縣市</TableHead>
                    <TableHead>段名</TableHead>
                    <TableHead>地號</TableHead>
                    <TableHead>查詢日期</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>嘗試次數</TableHead>
                    <TableHead>查詢者</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {landValueRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.city}</TableCell>
                      <TableCell>{record.section}</TableCell>
                      <TableCell className="font-medium">
                        {record.number}
                      </TableCell>
                      <TableCell>{record.queryDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "成功"
                              ? "success"
                              : record.status === "失敗"
                                ? "error"
                                : "info"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.attempts}/3</TableCell>
                      <TableCell>{record.querier}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">開啟選單</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {record.status === "成功" && (
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                查看結果
                              </DropdownMenuItem>
                            )}
                            {record.status === "失敗" &&
                              record.attempts < 3 && (
                                <DropdownMenuItem>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  重新查詢
                                </DropdownMenuItem>
                              )}
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              匯出資料
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                顯示 1 至 10 筆，共 22 筆
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
