"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
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
import { Badge } from "@/components/shadcn/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/shadcn/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar"
import {
  UserPlus,
  Trash,
  Copy,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Crown,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"

const members = [
  {
    id: 1,
    name: "張小明",
    email: "ming@example.com",
    role: "管理員",
    joinDate: "2022/10/15",
    lastActive: "2023/12/20",
    points: 120,
    status: "活躍",
  },
  {
    id: 2,
    name: "李小華",
    email: "hua@example.com",
    role: "成員",
    joinDate: "2022/11/05",
    lastActive: "2023/12/18",
    points: 85,
    status: "活躍",
  },
  {
    id: 3,
    name: "王小美",
    email: "mei@example.com",
    role: "成員",
    joinDate: "2023/01/20",
    lastActive: "2023/12/15",
    points: 65,
    status: "活躍",
  },
  {
    id: 4,
    name: "陳大偉",
    email: "david@example.com",
    role: "成員",
    joinDate: "2023/03/10",
    lastActive: "2023/12/10",
    points: 40,
    status: "活躍",
  },
  {
    id: 5,
    name: "林小玲",
    email: "ling@example.com",
    role: "成員",
    joinDate: "2023/05/22",
    lastActive: "2023/11/30",
    points: 25,
    status: "非活躍",
  },
  {
    id: 6,
    name: "黃小龍",
    email: "long@example.com",
    role: "成員",
    joinDate: "2023/06/15",
    lastActive: "2023/11/25",
    points: 15,
    status: "非活躍",
  },
  {
    id: 7,
    name: "吳小菁",
    email: "jing@example.com",
    role: "成員",
    joinDate: "2023/07/08",
    lastActive: "2023/11/20",
    points: 10,
    status: "非活躍",
  },
  {
    id: 8,
    name: "趙小雯",
    email: "wen@example.com",
    role: "成員",
    joinDate: "2023/08/12",
    lastActive: "2023/11/15",
    points: 5,
    status: "非活躍",
  },
  {
    id: 9,
    name: "周小強",
    email: "qiang@example.com",
    role: "成員",
    joinDate: "2023/09/25",
    lastActive: "2023/11/10",
    points: 0,
    status: "非活躍",
  },
  {
    id: 10,
    name: "孫小剛",
    email: "gang@example.com",
    role: "成員",
    joinDate: "2023/10/30",
    lastActive: "2023/11/05",
    points: 0,
    status: "非活躍",
  },
]

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">成員管理</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                邀請成員
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>邀請新成員</DialogTitle>
                <DialogDescription>
                  產生邀請連結並發送給新成員。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">邀請連結</label>
                  <div className="flex items-center gap-2">
                    <Input
                      readOnly
                      value="https://landhelper.example.com/invite/abc123xyz"
                    />
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    此連結有效期為 7 天，可邀請最多 5 位成員加入。
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">或直接發送邀請</label>
                  <Input placeholder="輸入電子郵件地址" type="email" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">取消</Button>
                <Button>發送邀請</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>公司成員</CardTitle>
          <CardDescription>管理公司內的所有成員與權限</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="成員角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="admin">管理員</SelectItem>
                  <SelectItem value="member">成員</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="成員狀態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="active">活躍</SelectItem>
                  <SelectItem value="inactive">非活躍</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="搜尋成員..." className="pl-8" />
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>成員</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>加入日期</TableHead>
                    <TableHead>最後活動</TableHead>
                    <TableHead>點數</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/placeholder-user.jpg`}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {member.role === "管理員" && (
                            <Crown className="h-3 w-3 text-amber-500" />
                          )}
                          {member.role}
                        </div>
                      </TableCell>
                      <TableCell>{member.joinDate}</TableCell>
                      <TableCell>{member.lastActive}</TableCell>
                      <TableCell>{member.points}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.status === "活躍" ? "success" : "outline"
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">開啟選單</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>查看詳情</DropdownMenuItem>
                            {member.role !== "管理員" && (
                              <DropdownMenuItem>
                                <Crown className="mr-2 h-4 w-4" />
                                設為管理員
                              </DropdownMenuItem>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  移除成員
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    確定要移除此成員？
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    此操作無法復原。移除後，該成員將無法再存取公司資料。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>取消</AlertDialogCancel>
                                  <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                    確定移除
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
                顯示 1 至 10 筆，共 10 筆
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  1
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
