import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Calendar } from "@/components/shadcn/calendar"
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
import {
  FileText,
  CalendarIcon,
  Download,
  RefreshCw,
  MoreHorizontal,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const transcriptRecords = [
  {
    id: 1,
    filename: "台北市大安區xxx.pdf",
    uploadDate: "2023/12/20",
    status: "成功",
    attempts: 1,
    fileSize: "2.5 MB",
    uploader: "張小明",
    downloadJson: true,
    downloadExcel: true,
  },
  {
    id: 2,
    filename: "台北市信義區xxx.pdf",
    uploadDate: "2023/12/18",
    status: "失敗",
    attempts: 2,
    fileSize: "3.1 MB",
    uploader: "張小明",
    downloadJson: false,
    downloadExcel: false,
  },
  {
    id: 3,
    filename: "新北市板橋區xxx.pdf",
    uploadDate: "2023/12/15",
    status: "成功",
    attempts: 1,
    fileSize: "1.8 MB",
    uploader: "李小華",
    downloadJson: true,
    downloadExcel: true,
  },
  {
    id: 4,
    filename: "台北市中山區xxx.pdf",
    uploadDate: "2023/12/10",
    status: "處理中",
    attempts: 1,
    fileSize: "2.2 MB",
    uploader: "王小美",
    downloadJson: false,
    downloadExcel: false,
  },
  {
    id: 5,
    filename: "新北市中和區xxx.pdf",
    uploadDate: "2023/12/05",
    status: "成功",
    attempts: 3,
    fileSize: "4.0 MB",
    uploader: "張小明",
    downloadJson: true,
    downloadExcel: true,
  },
  {
    id: 6,
    filename: "台北市松山區xxx.pdf",
    uploadDate: "2023/12/01",
    status: "失敗",
    attempts: 3,
    fileSize: "2.7 MB",
    uploader: "李小華",
    downloadJson: false,
    downloadExcel: false,
  },
  {
    id: 7,
    filename: "新北市新莊區xxx.pdf",
    uploadDate: "2023/11/28",
    status: "成功",
    attempts: 1,
    fileSize: "1.5 MB",
    uploader: "王小美",
    downloadJson: true,
    downloadExcel: true,
  },
  {
    id: 8,
    filename: "台北市內湖區xxx.pdf",
    uploadDate: "2023/11/25",
    status: "成功",
    attempts: 2,
    fileSize: "3.3 MB",
    uploader: "張小明",
    downloadJson: true,
    downloadExcel: true,
  },
  {
    id: 9,
    filename: "新北市三重區xxx.pdf",
    uploadDate: "2023/11/20",
    status: "失敗",
    attempts: 1,
    fileSize: "2.9 MB",
    uploader: "李小華",
    downloadJson: false,
    downloadExcel: false,
  },
  {
    id: 10,
    filename: "台北市文山區xxx.pdf",
    uploadDate: "2023/11/15",
    status: "成功",
    attempts: 1,
    fileSize: "2.1 MB",
    uploader: "王小美",
    downloadJson: true,
    downloadExcel: true,
  },
]

export default function TranscriptsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">謄本解析</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Upload className="mr-2 h-4 w-4" />
                上傳謄本
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>上傳謄本</DialogTitle>
                <DialogDescription>
                  請選擇要上傳的PDF格式謄本檔案，上傳後系統將自動解析。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed rounded-lg p-12 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <div className="text-sm font-medium mb-2">
                    拖曳檔案至此處或點擊上傳
                  </div>
                  <div className="text-xs text-muted-foreground mb-4">
                    支援 PDF 格式，檔案大小不超過 10MB
                  </div>
                  <Button size="sm">選擇檔案</Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">取消</Button>
                <Button>上傳並解析</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>謄本解析</CardTitle>
          <CardDescription>查看所有謄本解析與狀態</CardDescription>
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
                  <SelectValue placeholder="解析狀態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="success">成功</SelectItem>
                  <SelectItem value="processing">處理中</SelectItem>
                  <SelectItem value="failed">失敗</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="上傳者" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="user1">張小明</SelectItem>
                  <SelectItem value="user2">李小華</SelectItem>
                  <SelectItem value="user3">王小美</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1">
                <Input placeholder="搜尋檔案名稱..." />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>檔案名稱</TableHead>
                    <TableHead>上傳日期</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>嘗試次數</TableHead>
                    <TableHead>檔案大小</TableHead>
                    <TableHead>上傳者</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transcriptRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.filename}
                      </TableCell>
                      <TableCell>{record.uploadDate}</TableCell>
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
                      <TableCell>{record.fileSize}</TableCell>
                      <TableCell>{record.uploader}</TableCell>
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
                              <>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  下載 Excel
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  下載 JSON
                                </DropdownMenuItem>
                              </>
                            )}
                            {record.status === "失敗" &&
                              record.attempts < 3 && (
                                <DropdownMenuItem>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  重新解析
                                </DropdownMenuItem>
                              )}
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              查看詳情
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
