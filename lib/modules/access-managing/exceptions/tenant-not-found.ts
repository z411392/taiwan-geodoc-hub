export default class TenantNotFound extends Error {
  constructor({ tenantId }: { tenantId: string }) {
    super(
      JSON.stringify({
        tenantId,
        type: TenantNotFound,
      }),
    )
  }
}
