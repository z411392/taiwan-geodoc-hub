export class TenantNotFound extends Error {
    constructor(protected tenantId: string) {
        super(`TenantNotFound: ${tenantId}`)
        this.name = "TenantNotFound"
    }
    toJSON() {
        const { name, tenantId } = this
        return {
            name,
            tenantId,
        }
    }
}
