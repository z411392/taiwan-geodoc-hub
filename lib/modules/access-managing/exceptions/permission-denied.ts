export default class PermissionDeinied extends Error {
  constructor({ tenantId, userId }: { tenantId: string; userId: string }) {
    super(
      JSON.stringify({
        tenantId,
        userId,
        type: PermissionDeinied,
      }),
    )
  }
}
