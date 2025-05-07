import CallableInstance from "callable-instance"
import { SnapshotDao } from "@/taiwan-geodoc-hub/modules/registration-managing/domain/ports/snapshot-dao"
import { injectable, inject } from "tsyringe"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types"
import { type Snapshot } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/snapshot"
import {
    snapshotIdToken,
    loggerToken,
} from "@/taiwan-geodoc-hub/infrastructure/types"
import { type ConsolaInstance } from "consola"

export type RetrievingSnapshot = []

@injectable()
export class RetrieveSnapshot extends CallableInstance<
    RetrievingSnapshot,
    Promise<Snapshot>
> {
    constructor(
        @inject(SnapshotDao as NonAbstractClass<SnapshotDao>)
        protected readonly snapshotDao: SnapshotDao,
        @inject(snapshotIdToken) protected readonly snapshotId: string,
        @inject(loggerToken) protected readonly logger: ConsolaInstance,
    ) {
        super("execute")
    }

    async execute() {
        const timestamp = Date.now()
        const { snapshotId } = this
        try {
            const snapshot = await this.snapshotDao.byId(snapshotId)
            return snapshot
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
                data: {},
            })
        }
    }
}
