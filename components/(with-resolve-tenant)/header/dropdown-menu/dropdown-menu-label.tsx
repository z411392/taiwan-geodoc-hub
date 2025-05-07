import { DropdownMenuLabel } from "~/components/shadcn/dropdown-menu"
import { useUser } from "~/composables/providers/trace-id-provider/user-provider"

export default function () {
    const user = useUser()!
    return (
        <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                    {user.displayName}
                </p>
            </div>
        </DropdownMenuLabel>
    )
}
