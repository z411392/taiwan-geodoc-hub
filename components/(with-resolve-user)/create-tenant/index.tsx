"use client"
import { Dialog, DialogContent } from "~/components/shadcn/dialog"
import { useState } from "react"
import { CreateTenantPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/create-tenant-port"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { useContainer } from "~/composables/providers/trace-id-provider/user-provider"
import { useToast } from "~/composables/shadcn/use-toast"
import { ExceptionUnserializer } from "@/taiwan-geodoc-hub/infrastructure/formatters/exception-unserializer"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { TenantStatus } from "@/taiwan-geodoc-hub/modules/tenant-managing/enums/tenant-status"
import { RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"
import DialogTrigger from "~/components/(with-resolve-user)/create-tenant/dialog-trigger"
import DialogHeader from "~/components/(with-resolve-user)/create-tenant/dialog-header"
import Name from "~/components/(with-resolve-user)/create-tenant/name"
import DialogFooter from "~/components/(with-resolve-user)/create-tenant/dialog-footer"
import { useTranslations } from "next-intl"

const unserializeException = new ExceptionUnserializer()

type OnTenantCreated = (event: {
    traceId: string
    tenant: TenantWithRole
}) => void | Promise<void>

export default function ({
    onTenantCreated,
}: {
    onTenantCreated: OnTenantCreated
}) {
    const t = useTranslations("(with-resolve-user)/create-tenant")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const openDialog = () => setIsDialogOpen(true)
    const closeDialog = () => setIsDialogOpen(false)
    const [name, setName] = useState<string>("")
    const [isProgressing, setIsProgressing] = useState(false)
    const { toast } = useToast()
    const container = useContainer()
    const createTenantPort = container.resolve(
        CreateTenantPort as NonAbstractClass<CreateTenantPort>,
    )
    const isValid = () => !!name.trim()
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!isValid()) return
        setIsProgressing(true)
        try {
            const { tenantId, traceId } = await createTenantPort.create(name)
            const tenant: TenantWithRole = {
                id: tenantId,
                name,
                points: 0,
                status: `${TenantStatus.Pending}`,
                role: `${RoleType.Manager}`,
            }
            await onTenantCreated({ traceId, tenant })
            toast({
                variant: "success",
                title: "",
                description: t("succeeded"),
            })
        } catch (thrown) {
            const exception = unserializeException(thrown)
            toast({
                variant: "destructive",
                title: "",
                description: exception.message,
            })
        } finally {
            setName("")
            setIsProgressing(false)
            setIsDialogOpen(false)
        }
    }
    return (
        <div className="mb-8 space-y-4">
            <DialogTrigger openDialog={openDialog} />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader />
                        <div className="grid gap-4 py-4">
                            <Name name={name} setName={setName} />
                        </div>
                        <DialogFooter
                            isProgressing={isProgressing}
                            closeDialog={closeDialog}
                            valid={isValid()}
                        />
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
