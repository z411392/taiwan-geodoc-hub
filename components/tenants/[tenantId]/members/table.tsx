"use client"

import { Button } from "~/components/shadcn/button"
import { Input } from "~/components/shadcn/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/shadcn/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/shadcn/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/shadcn/dropdown-menu"
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
} from "~/components/shadcn/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/shadcn/avatar"
import { Trash, Search, MoreHorizontal, Crown } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/shadcn/card"
import { useTranslations } from "next-intl"
import { type Member } from "@/taiwan-geodoc-hub/modules/member-managing/dtos/member"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import { Roles } from "@/taiwan-geodoc-hub/modules/access-managing/constants/roles"
import { DateTime } from "luxon"
import InviteNewMemberButton from "~/components/tenants/[tenantId]/members/invite-new-member-button"
import Paginator from "~/components/tenants/[tenantId]/paginator"
import { Pages } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"
import { useContainer } from "~/composables/providers/tenant-provider"
import { ListMembers } from "@/taiwan-geodoc-hub/modules/member-managing/application/list-members"

const useQueryParams = () => {
    const searchParams = useSearchParams()

    const initRole = (): Roles | "all" => {
        const role = searchParams.get("role")
        return Object.values(Roles).includes(role as Roles)
            ? (role as Roles)
            : "all"
    }

    const initPage = (): number => {
        const page = parseInt(searchParams.get("page") || "1")
        return isNaN(page) || page < 1 ? 1 : page
    }

    const initKeyword = (): string => searchParams.get("keyword") || ""

    const [role, setRole] = useState<Roles | "all">(initRole())
    const [page, setPage] = useState<number>(initPage())
    const [keyword, setKeyword] = useState<string>(initKeyword())
    const [debouncedKeyword, setDebouncedKeyword] = useState<string>(keyword)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(keyword)
        }, 300)
        return () => clearTimeout(timer)
    }, [keyword])

    const router = useRouter()
    useEffect(() => {
        const params = new URLSearchParams()
        params.set("role", role)
        params.set("keyword", debouncedKeyword)
        params.set("page", String(page))
        const next = `?${params.toString()}`
        if (next !== window.location.search)
            router.replace(next, { scroll: false })
    }, [role, debouncedKeyword, page, router])

    return {
        role,
        setRole,
        page,
        setPage,
        keyword,
        setKeyword,
        debouncedKeyword,
    }
}

export default function MembersTable() {
    const _ = useTranslations(Pages.Root)
    const t = useTranslations(Pages.Members)
    const [members, setMembers] = useState<Member[]>([])
    const [total, setTotal] = useState<number>(0)
    const [loaded, setLoaded] = useState(false)
    const {
        role,
        setRole,
        page,
        setPage,
        keyword,
        setKeyword,
        debouncedKeyword,
    } = useQueryParams()
    const container = useContainer()
    const listMembers = useMemo(
        () => container.resolve(ListMembers),
        [container],
    )
    useEffect(() => {
        let cancelled = false
        setLoaded(false)
        const run = async () => {
            const { records, total } = await listMembers(
                role === "all" ? undefined : role,
                debouncedKeyword,
                page,
            )
            if (cancelled) return
            setMembers(records)
            setTotal(total)
            setLoaded(true)
        }
        run()
        return () => {
            cancelled = true
        }
    }, [role, debouncedKeyword, page, setTotal, listMembers])

    if (!loaded) return null

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {/* {t("metadata.title")} */}
                </h1>
                <div className="flex gap-2">
                    <InviteNewMemberButton />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t("metadata.title")}</CardTitle>
                    <CardDescription>
                        {t("metadata.description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <form className="flex flex-wrap gap-4">
                            <Select
                                name="role"
                                value={role}
                                onValueChange={(value) =>
                                    setRole(value as Roles)
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="成員角色" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">全部</SelectItem>
                                    <SelectItem value="admin">
                                        管理員
                                    </SelectItem>
                                    <SelectItem value="member">成員</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        name="keyword"
                                        value={keyword}
                                        onChange={(event) =>
                                            setKeyword(event.target.value)
                                        }
                                        placeholder="搜尋成員..."
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <Input
                                type="hidden"
                                name="page"
                                value={String(page)}
                            />
                        </form>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            {t("fields.member")}
                                        </TableHead>
                                        <TableHead>
                                            {t("fields.role")}
                                        </TableHead>
                                        <TableHead>
                                            {t("fields.join-date")}
                                        </TableHead>
                                        <TableHead>
                                            {t("fields.last-activity")}
                                        </TableHead>
                                        <TableHead className="text-right">
                                            {t("fields.actions")}
                                        </TableHead>
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
                                                            {member.name.slice(
                                                                0,
                                                                2,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">
                                                            {member.name}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {member.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    {member.role ===
                                                        Roles.Manager && (
                                                        <Crown className="h-3 w-3 text-amber-500" />
                                                    )}
                                                    {_(`roles.${member.role}`)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {DateTime.fromMillis(
                                                    member.createdAt,
                                                ).toFormat("yyyy-MM-dd")}
                                            </TableCell>
                                            <TableCell>
                                                {DateTime.fromMillis(
                                                    member.updatedAt,
                                                ).toFormat("yyyy-MM-dd")}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {member.role ===
                                                    Roles.Member && (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only"></span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {member.role ===
                                                                Roles.Member && (
                                                                <DropdownMenuItem>
                                                                    <Crown className="mr-2 h-4 w-4" />
                                                                    {t(
                                                                        "buttons.promote-as-manager",
                                                                    )}
                                                                </DropdownMenuItem>
                                                            )}
                                                            {member.role ===
                                                                Roles.Member && (
                                                                <AlertDialog>
                                                                    <AlertDialogTrigger
                                                                        asChild
                                                                    >
                                                                        <DropdownMenuItem
                                                                            onSelect={(
                                                                                event,
                                                                            ) =>
                                                                                event.preventDefault()
                                                                            }
                                                                        >
                                                                            <Trash className="mr-2 h-4 w-4" />
                                                                            {t(
                                                                                "buttons.remove-member",
                                                                            )}
                                                                        </DropdownMenuItem>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>
                                                                                {t(
                                                                                    "sections.remove-member.title",
                                                                                )}
                                                                            </AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                {t(
                                                                                    "sections.remove-member.description",
                                                                                )}
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>
                                                                                {t(
                                                                                    "buttons.cancel",
                                                                                )}
                                                                            </AlertDialogCancel>
                                                                            <AlertDialogAction className="bg-destructive text-white">
                                                                                {t(
                                                                                    "buttons.remove-member",
                                                                                )}
                                                                            </AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>
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
                            length={members.length}
                            total={total}
                            onPageChange={(page) => {
                                setPage(page)
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
