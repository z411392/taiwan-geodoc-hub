export abstract class CreateTenantPort {
    abstract create(
        name: string,
    ): Promise<{ tenantId: string; traceId: string }>
}
