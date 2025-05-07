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
import { CardContent } from "~/components/shadcn/card"
import { useTranslations } from "next-intl"
import { type Member } from "@/taiwan-geodoc-hub/modules/member-managing/dtos/member"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import { RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"
import { DateTime } from "luxon"
import Paginator from "~/components/(with-resolve-tenant)/paginator"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { useContainer } from "~/composables/contexts/with-resolve-tenant"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { SearchMembersPort } from "@/taiwan-geodoc-hub/modules/member-managing/domain/ports/search-members-port"

const useQueryParams = () => {
    const searchParams = useSearchParams()
    const initRole = (): RoleType | "all" => {
        const role = searchParams.get("role")
        return Object.values(RoleType).includes(role as RoleType)
            ? (role as RoleType)
            : "all"
    }
    const initPage = (): number => {
        const page = parseInt(searchParams.get("page") || "1")
        return isNaN(page) || page < 1 ? 1 : page
    }
    const initKeyword = (): string => searchParams.get("keyword") || ""
    const [role, setRole] = useState<RoleType | "all">(initRole())
    const [page, setPage] = useState<number>(initPage())
    const [keyword, setKeyword] = useState<string>(initKeyword())
    const [debouncedKeyword, setDebouncedKeyword] = useState<string>(keyword)
    const [members, setMembers] = useState<Member[]>([])
    const [total, setTotal] = useState<number>(0)
    const [loaded, setLoaded] = useState(false)
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

    const container = useContainer()
    const searchMembersPort = container.resolve(
        SearchMembersPort as NonAbstractClass<SearchMembersPort>,
    )
    useEffect(() => {
        setLoaded(false)
        const run = async () => {
            const { records, total } = await searchMembersPort.search(
                role === "all" ? undefined : role,
                debouncedKeyword,
                page,
            )
            setMembers(records)
            setTotal(total)
            setLoaded(true)
        }
        run()
    }, [role, debouncedKeyword, page])

    return {
        role,
        setRole,
        page,
        setPage,
        keyword,
        setKeyword,
        debouncedKeyword,
        loaded,
        members,
        total,
    }
}

export default function () {
    const _ = useTranslations("_")
    const t = useTranslations(Route.Members)

    const {
        role,
        setRole,
        page,
        setPage,
        keyword,
        setKeyword,
        loaded,
        members,
        total,
    } = useQueryParams()
    if (!loaded) return null
    return (
        <>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <form className="flex flex-wrap gap-4">
                        <Select
                            name="role"
                            value={role}
                            onValueChange={(value) =>
                                setRole(value as RoleType)
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
                                                    RoleType.Manager && (
                                                        <Crown className="h-3 w-3 text-amber-500" />
                                                    )}
                                                {_(
                                                    `role-type.${member.role}`,
                                                )}
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
                                                RoleType.Member && (
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
                                                                RoleType.Member && (
                                                                    <DropdownMenuItem>
                                                                        <Crown className="mr-2 h-4 w-4" />
                                                                        {t(
                                                                            "buttons.promote-as-manager",
                                                                        )}
                                                                    </DropdownMenuItem>
                                                                )}
                                                            {member.role ===
                                                                RoleType.Member && (
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
        </>
    )
}
