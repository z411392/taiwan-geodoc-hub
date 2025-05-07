export default class PermissionDenied extends Error {
    constructor(tenantId: string) {
        super(
            JSON.stringify({
                tenantId,
            }),
        )
        this.name = "PermissionDeinied"
    }
}
