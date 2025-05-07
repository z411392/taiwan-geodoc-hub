"use client"

import { useTranslations } from "next-intl"
import { Button } from "~/components/shadcn/button"
import { Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/shadcn/dialog"
import { useState } from "react"
import { Label } from "~/components/shadcn/label"
import { Input } from "~/components/shadcn/input"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"
import { CreateTenantPort } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/create-tenant-port"
import { type NonAbstractClass } from "~/src/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { useContainer } from "~/composables/contexts/with-resolve-user"
import { useToast } from "~/composables/shadcn/use-toast"
import { ExceptionUnserializer } from "@/taiwan-geodoc-hub/infrastructure/formatters/exception-unserializer"
import { Loader2Icon } from "lucide-react"
import { type TenantWithRole } from "@/taiwan-geodoc-hub/modules/tenant-managing/dtos/tenant"
import { TenantStatus } from "@/taiwan-geodoc-hub/modules/tenant-managing/enums/tenant-status"
import { RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"

const unserializeException = new ExceptionUnserializer()

type OnTenantCreated = (event: {
    traceId: string
    tenant: TenantWithRole
}) => void | Promise<void>

export default function CreateTenantButton({
    onTenantCreated,
}: {
    onTenantCreated: OnTenantCreated
}) {
    const t = useTranslations(Route.TenantSelection)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [name, setName] = useState("")
    const [isProgressing, setIsProgressing] = useState(false)

    const { toast } = useToast()
    const container = useContainer()
    const createTenantPort = container.resolve(
        CreateTenantPort as NonAbstractClass<CreateTenantPort>,
    )
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!name.trim()) return
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
        <>
            <Button
                variant="outline"
                className="flex w-full items-center justify-center gap-2 border-dashed p-4 text-gray-500"
                onClick={() => setIsDialogOpen(true)}
            >
                <Plus className="h-5 w-5" />
                <span>
                    {t("sections.create-new-tenant.buttons.open-modal")}
                </span>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {t("sections.create-new-tenant.title")}
                        </DialogTitle>
                        <DialogDescription>
                            {t("sections.create-new-tenant.description")}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-left">
                                    {t(
                                        "sections.create-new-tenant.inputs.name.label",
                                    )}
                                </Label>
                                <Input
                                    id="name"
                                    placeholder={t(
                                        "sections.create-new-tenant.inputs.name.placeholder",
                                    )}
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    className="col-span-3"
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                {t("sections.create-new-tenant.buttons.cancel")}
                            </Button>
                            <Button
                                type="submit"
                                disabled={isProgressing || !name.trim()}
                            >
                                {isProgressing && (
                                    <>
                                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                        {t(
                                            "sections.create-new-tenant.buttons.progressing",
                                        )}
                                    </>
                                )}

                                {!isProgressing && (
                                    <>
                                        {t(
                                            "sections.create-new-tenant.buttons.create",
                                        )}
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
