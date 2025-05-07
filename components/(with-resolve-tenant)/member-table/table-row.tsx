"use client"

import { TableRow, TableCell } from "~/components/shadcn/table"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/shadcn/avatar"
import { Trash, MoreHorizontal, Crown } from "lucide-react"
import { Button } from "~/components/shadcn/button"
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
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { type User } from "firebase/auth"
import { RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"
import { useTranslations } from "next-intl"
import { DateTime } from "luxon"

export default function ({ user }: { user: User & { role: `${RoleType}` } }) {
    const _ = useTranslations("_")
    const t = useTranslations(Route.Members)
    return (
        <TableRow key={user.uid}>
            <TableCell>
                <div
                    className="flex items-center gap-3"
                    data-user-id={user.uid}
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={`/placeholder-user.jpg`}
                            alt={user.displayName!}
                        />
                        <AvatarFallback>
                            {user.displayName!.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{user.displayName!}</div>
                        <div className="text-xs text-muted-foreground">
                            {user.email}
                        </div>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-1">
                    {user.role === RoleType.Manager && (
                        <Crown className="h-3 w-3 text-amber-500" />
                    )}
                    {_(`role-type.${user.role}`)}
                </div>
            </TableCell>
            <TableCell>
                {DateTime.fromMillis(
                    Date.parse(user.metadata.lastSignInTime!),
                ).toFormat("yyyy-LL-dd HH:mm:ss")}
            </TableCell>
            <TableCell className="text-right">
                {user.role === RoleType.Member && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only"></span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {user.role === RoleType.Member && (
                                <DropdownMenuItem>
                                    <Crown className="mr-2 h-4 w-4" />
                                    {t("buttons.promote-as-manager")}
                                </DropdownMenuItem>
                            )}
                            {user.role === RoleType.Member && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem
                                            onSelect={(event) =>
                                                event.preventDefault()
                                            }
                                        >
                                            <Trash className="mr-2 h-4 w-4" />
                                            {t("buttons.remove-member")}
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                {t(
                                                    "sections.remove-user.title",
                                                )}
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                {t(
                                                    "sections.remove-user.description",
                                                )}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                {t("buttons.cancel")}
                                            </AlertDialogCancel>
                                            <AlertDialogAction className="bg-destructive text-white">
                                                {t("buttons.remove-member")}
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
    )
}
