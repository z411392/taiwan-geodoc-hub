"use client"

import { Table, TableBody } from "~/components/shadcn/table"
import TableRow from "~/components/(with-resolve-tenant)/member-table/table-row"
import TableHeader from "~/components/(with-resolve-tenant)/member-table/table-header"
import {
    useMembers,
    usePage,
} from "~/composables/providers/trace-id-provider/user-provider/tenant-provider/members-provider"
import Paginator from "~/components/(with-resolve-tenant)/paginator"
import { usePageChangeHandler } from "~/composables/use-page-change-handler"
import { useTraceId } from "~/composables/providers/trace-id-provider"
import { CardContent } from "~/components/shadcn/card"
import SearchForm from "~/components/(with-resolve-tenant)/member-table/search-form"

export default function () {
    const { members, total } = useMembers()
    const { page } = usePage()
    const { handlePageChange } = usePageChangeHandler()
    const traceId = useTraceId()
    return (
        <CardContent>
            <form id={traceId} className="flex flex-col gap-4">
                <SearchForm />
                <div className="rounded-md border">
                    <Table>
                        <TableHeader />
                        <TableBody>
                            {members.map((user) => (
                                <TableRow key={user.uid} user={user} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Paginator
                    page={page}
                    length={members.length}
                    total={total}
                    onPageChange={handlePageChange}
                />
            </form>
        </CardContent>
    )
}
