"use client"

import { DropdownMenuTrigger } from "~/components/shadcn/dropdown-menu"
import { Button } from "~/components/shadcn/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/shadcn/avatar"
import { useUser } from "~/composables/providers/trace-id-provider/user-provider"

export default function () {
    const user = useUser()!
    return (
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage
                        src="/placeholder-user.jpg"
                        alt={user.displayName}
                    />
                    <AvatarFallback>
                        {user.displayName.slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
    )
}
