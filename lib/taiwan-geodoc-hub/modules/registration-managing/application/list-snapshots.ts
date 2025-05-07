import CallableInstance from "callable-instance"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
import { SnapshotDao } from "@/taiwan-geodoc-hub/modules/registration-managing/domain/ports/snapshot-dao"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { loggerToken } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class ListSnapshots extends CallableInstance<
    [string, number],
    Promise<{ records: Snapshot[]; total: number }>
> {
    constructor(
        @inject(SnapshotDao as NonAbstractClass<SnapshotDao>)
        protected snapshotDao: SnapshotDao,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }
    async execute(keyword: string, page: number) {
        const start = Date.now()
        try {
            const snapshots = await this.snapshotDao.byPage(keyword, page)
            const elapsed = Date.now() - start
            this.logger.info("ListSnapshots executed", { elapsed })
            return snapshots
        } catch (thrown) {
            this.logger.error("ListSnapshots failed", { thrown })
            throw thrown
        }
    }
}
