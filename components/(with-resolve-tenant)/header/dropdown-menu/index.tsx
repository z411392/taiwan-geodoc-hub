import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
} from "~/components/shadcn/dropdown-menu"
import SignOutButton from "~/components/(with-resolve-tenant)/header/dropdown-menu/sign-out-button"
import DropdownMenuTrigger from "~/components/(with-resolve-tenant)/header/dropdown-menu/dropdown-menu-trigger"
import DropdownMenuLabel from "~/components/(with-resolve-tenant)/header/dropdown-menu/dropdown-menu-label"

export default function () {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger />
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel />
                <DropdownMenuSeparator />
                <SignOutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
