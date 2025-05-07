import "reflect-metadata"
import {
    container as parentContainer,
    type DependencyContainer,
} from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { TenantDao } from "@/taiwan-geodoc-hub/modules/tenant-managing/domain/ports/tenant-dao"
import { TenantAdapter } from "@/taiwan-geodoc-hub/infrastructure/adapters/mocks/tenant-adapter"
import { RoleDao } from "@/taiwan-geodoc-hub/modules/access-managing/domain/ports/role-dao"
import { RoleAdapter } from "@/taiwan-geodoc-hub/infrastructure/adapters/mocks/role-adapter"
import { CustomerSupportDao } from "@/taiwan-geodoc-hub/modules/customer-supporting/domain/ports/customer-supprt-dao"
import { CustomerSupportAdapter } from "@/taiwan-geodoc-hub/infrastructure/adapters/mocks/customer-support-adapter"
import { MemberDao } from "@/taiwan-geodoc-hub/modules/member-managing/domain/ports/member-dao"
import { MemberAdapter } from "@/taiwan-geodoc-hub/infrastructure/adapters/mocks/member-adapter"
import { NotificationDao } from "@/taiwan-geodoc-hub/modules/notifying/domain/ports/notification-dao"
import { NotificationAdapter } from "@/taiwan-geodoc-hub/infrastructure/adapters/mocks/notification-adapter"
import { RegistrationDao } from "@/taiwan-geodoc-hub/modules/registration-managing/domain/ports/registration-dao"
import { RegistrationAdapter } from "@/taiwan-geodoc-hub/infrastructure/adapters/mocks/registration-adapter"
import { SnapshotDao } from "@/taiwan-geodoc-hub/modules/registration-managing/domain/ports/snapshot-dao"
import { SnapshotAdapter } from "@/taiwan-geodoc-hub/infrastructure/adapters/mocks/snapshot-adapter"
import { InsightDao } from "@/taiwan-geodoc-hub/modules/reporting/domain/ports/insight-dao"
import { InsightAdapter } from "@/taiwan-geodoc-hub/infrastructure/adapters/mocks/insight-adapter"
import { TransactionDao } from "@/taiwan-geodoc-hub/modules/transaction-managing/domain/ports/transaction-dao"
import { TransactionAdapter } from "@/taiwan-geodoc-hub/infrastructure/adapters/mocks/transaction-adapter"
import { ValueDao } from "@/taiwan-geodoc-hub/modules/values-crawling/domain/ports/value-dao"
import { ValueAdapter } from "@/taiwan-geodoc-hub/infrastructure/adapters/mocks/value-adapter"
import { Settings } from "luxon"
import { RequestIdGenerator } from "@/taiwan-geodoc-hub/modules/system-maintaining/domain/ports/request-id-generator"
import { RequestIdGeneratorAdapter } from "@/taiwan-geodoc-hub/infrastructure/utils/generators/request-id-generator-adapter"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { createLogger } from "@/taiwan-geodoc-hub/infrastructure/utils/logging"

async function* lifespan() {
    Settings.defaultZone = process.env.TZ!
    const container = parentContainer.createChildContainer()
    container.register(loggerToken, { useFactory: () => createLogger() })
    container.register(TenantDao as NonAbstractClass<TenantDao>, {
        useClass: TenantAdapter,
    })
    container.register(RoleDao as NonAbstractClass<RoleDao>, {
        useClass: RoleAdapter,
    })
    container.register(
        CustomerSupportDao as NonAbstractClass<CustomerSupportDao>,
        {
            useClass: CustomerSupportAdapter,
        },
    )
    container.register(MemberDao as NonAbstractClass<MemberDao>, {
        useClass: MemberAdapter,
    })
    container.register(NotificationDao as NonAbstractClass<NotificationDao>, {
        useClass: NotificationAdapter,
    })
    container.register(RegistrationDao as NonAbstractClass<RegistrationDao>, {
        useClass: RegistrationAdapter,
    })
    container.register(SnapshotDao as NonAbstractClass<SnapshotDao>, {
        useClass: SnapshotAdapter,
    })
    container.register(InsightDao as NonAbstractClass<InsightDao>, {
        useClass: InsightAdapter,
    })
    container.register(TransactionDao as NonAbstractClass<TransactionDao>, {
        useClass: TransactionAdapter,
    })
    container.register(ValueDao as NonAbstractClass<ValueDao>, {
        useClass: ValueAdapter,
    })
    container.register(
        RequestIdGenerator as NonAbstractClass<RequestIdGenerator>,
        {
            useClass: RequestIdGeneratorAdapter,
        },
    )
    yield container
}

let context: ReturnType<typeof lifespan>
let promise: Promise<DependencyContainer>

export const bootstrap = async () => {
    if (promise) return await promise
    context = lifespan()
    promise = new Promise<DependencyContainer>(async (resolve) => {
        const { value } = await context.next()
        resolve(value!)
    })
    return await promise
}

export const shutdown = async () => {
    if (!context) return
    await context.next()
}
