import CallableInstance from "callable-instance"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
import { SnapshotDao } from "@/taiwan-geodoc-hub/modules/registration-managing/domain/ports/snapshot-dao"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type ListingSnapshots = [string, number]

@injectable()
export class ListSnapshots extends CallableInstance<
    ListingSnapshots,
    Promise<{ records: Snapshot[]; total: number }>
> {
    constructor(
        @inject(SnapshotDao as NonAbstractClass<SnapshotDao>)
        protected readonly snapshotDao: SnapshotDao,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute(keyword: string, page: number) {
        const timestamp = Date.now()
        try {
            const snapshots = await this.snapshotDao.byPage(keyword, page)
            return snapshots
        } catch (thrown) {
            this.logger.error({
                name: this.constructor.name,
                message:
                    thrown instanceof Error ? thrown.message : String(thrown),
            })
            throw thrown
        } finally {
            const duration = Date.now() - timestamp
            this.logger.info({
                name: this.constructor.name,
                timestamp,
                duration,
                data: {
                    keyword,
                    page,
                },
            })
        }
    }
}
