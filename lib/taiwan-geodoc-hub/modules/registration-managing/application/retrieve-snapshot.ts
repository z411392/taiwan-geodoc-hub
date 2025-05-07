import CallableInstance from "callable-instance"
import { SnapshotDao } from "@/taiwan-geodoc-hub/modules/registration-managing/domain/ports/snapshot-dao"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
import {
    snapshotIdToken,
    loggerToken,
} from "@/taiwan-geodoc-hub/infrastructure/constants/types"
import { type ConsolaInstance } from "consola"

@injectable()
export class RetrieveSnapshot extends CallableInstance<[], Promise<Snapshot>> {
    constructor(
        @inject(SnapshotDao as NonAbstractClass<SnapshotDao>)
        protected snapshotDao: SnapshotDao,
        @inject(snapshotIdToken) protected snapshotId: string,
        @inject(loggerToken) protected logger: ConsolaInstance,
    ) {
        super("execute")
    }

    async execute() {
        const start = Date.now()
        const { snapshotId } = this
        try {
            const snapshot = await this.snapshotDao.byId(snapshotId)
            const elapsed = Date.now() - start
            this.logger.info("RetrieveSnapshot executed", { elapsed })
            return snapshot
        } catch (thrown) {
            const error =
                thrown instanceof Error ? thrown.message : String(thrown)
            this.logger.error("RetrieveSnapshot failed", { error })
            throw thrown
        }
    }
}
