export default class TenantNotFound extends Error {
    constructor(tenantId: string) {
        super(
            JSON.stringify({
                tenantId,
            }),
        )
        this.name = "TenantNotFound"
    }
}
