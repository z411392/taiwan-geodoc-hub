export class SnapshotNotFound extends Error {
    constructor(protected snapshotId: string) {
        super(`SnapshotNotFound: ${snapshotId}`)
        this.name = "SnapshotNotFound"
    }
    toJSON() {
        const { name, snapshotId } = this
        return {
            name,
            snapshotId,
        }
    }
}
