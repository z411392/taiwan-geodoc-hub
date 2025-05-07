import { Button } from "@/components/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import { Badge } from "@/components/shadcn/badge"
import { Download } from "lucide-react"
import { Plus } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover"
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
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/shadcn/calendar"
import { Input } from "@/components/shadcn/input"
import { ChevronLeft, ChevronRight } from "lucide-react"

const pointRecords = [
  {
    id: 1,
    date: "2023/12/15",
    type: "儲值",
    amount: "+100",
    balance: 250,
    description: "線下儲值",
    operator: "系統管理員",
  },
  {
    id: 2,
    date: "2023/12/14",
    type: "使用",
    amount: "-2",
    balance: 150,
    description: "謄本解析",
    operator: "張小明",
  },
  {
    id: 3,
    date: "2023/12/12",
    type: "使用",
    amount: "-1",
    balance: 152,
    description: "公告現值查詢",
    operator: "張小明",
  },
  {
    id: 4,
    date: "2023/12/10",
    type: "使用",
    amount: "-2",
    balance: 153,
    description: "謄本解析",
    operator: "李小華",
  },
  {
    id: 5,
    date: "2023/12/05",
    type: "儲值",
    amount: "+50",
    balance: 155,
    description: "線下儲值",
    operator: "系統管理員",
  },
  {
    id: 6,
    date: "2023/12/01",
    type: "使用",
    amount: "-1",
    balance: 105,
    description: "公告現值查詢",
    operator: "王小美",
  },
  {
    id: 7,
    date: "2023/11/28",
    type: "使用",
    amount: "-2",
    balance: 106,
    description: "謄本解析",
    operator: "張小明",
  },
  {
    id: 8,
    date: "2023/11/25",
    type: "儲值",
    amount: "+100",
    balance: 108,
    description: "線下儲值",
    operator: "系統管理員",
  },
  {
    id: 9,
    date: "2023/11/20",
    type: "使用",
    amount: "-2",
    balance: 8,
    description: "謄本解析",
    operator: "李小華",
  },
  {
    id: 10,
    date: "2023/11/15",
    type: "使用",
    amount: "-1",
    balance: 10,
    description: "公告現值查詢",
    operator: "王小美",
  },
]

export default function PointsHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">點數紀錄</h1>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            匯出紀錄
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            儲值點數
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>目前點數餘額</CardTitle>
            <CardDescription>最後更新: 2023/12/15</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">250</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>本月使用點數</CardTitle>
            <CardDescription>2023年12月</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>本月儲值點數</CardTitle>
            <CardDescription>2023年12月</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">150</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>點數使用紀錄</CardTitle>
          <CardDescription>查看所有點數變動紀錄</CardDescription>
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
                  <SelectValue placeholder="紀錄類型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="deposit">儲值</SelectItem>
                  <SelectItem value="usage">使用</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="操作人員" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="admin">系統管理員</SelectItem>
                  <SelectItem value="user1">張小明</SelectItem>
                  <SelectItem value="user2">李小華</SelectItem>
                  <SelectItem value="user3">王小美</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1">
                <Input placeholder="搜尋描述..." />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期</TableHead>
                    <TableHead>類型</TableHead>
                    <TableHead>點數變動</TableHead>
                    <TableHead>餘額</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead>操作人員</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pointRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={record.type === "儲值" ? "info" : "default"}
                        >
                          {record.type}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={
                          record.type === "儲值"
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                        }
                      >
                        {record.amount}
                      </TableCell>
                      <TableCell>{record.balance}</TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell>{record.operator}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                顯示 1 至 10 筆，共 24 筆
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
