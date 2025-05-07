import { registry, type DependencyContainer } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { Base62 } from "@/taiwan-geodoc-hub/modules/general/domain/ports/base62"
import baseX from "base-x"
import {
    Logger,
    TraceId,
    UserId,
    TenantId,
    SnapshotId,
    RegistrationId,
    ApiEndpoint,
    UploadEndpoint,
} from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { createLogger } from "@/taiwan-geodoc-hub/utils/logging/create-logger"
import { WaitForProcessCompletionPort } from "@/taiwan-geodoc-hub/modules/general/domain/ports/wait-for-process-completion-port"
import { ProcessStateFirestoreAdapter } from "@/taiwan-geodoc-hub/adapters/firestore/process-state-firestore-adapter"

const loggerFactory = (container: DependencyContainer) => {
    let traceId: string | undefined = undefined
    let userId: string | undefined = undefined
    let tenantId: string | undefined = undefined
    let snapshotId: string | undefined = undefined
    let registrationId: string | undefined = undefined
    try {
        traceId = container.resolve(TraceId)
        userId = container.resolve(UserId)
        tenantId = container.resolve(TenantId)
        snapshotId = container.resolve(SnapshotId)
        registrationId = container.resolve(RegistrationId)
    } catch {}
    return createLogger({
        traceId,
        userId,
        tenantId,
        snapshotId,
        registrationId,
    })
}

@registry([
    {
        token: Logger,
        useFactory: loggerFactory,
    },
    {
        token: Base62 as NonAbstractClass<Base62>,
        useValue: baseX(
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        ),
    },
    {
        token: ApiEndpoint,
        useValue: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    },
    {
        token: UploadEndpoint,
        useValue: process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT!,
    },
    {
        token: WaitForProcessCompletionPort as NonAbstractClass<WaitForProcessCompletionPort>,
        useClass: ProcessStateFirestoreAdapter,
    },
])
export abstract class GeneralModule {}
