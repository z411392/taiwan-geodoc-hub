export type NonAbstractClass<T> = new (...args: unknown[]) => T

export const loggerToken = Symbol("logger")
export const requestIdToken = Symbol("requestId")
export const idTokenToken = Symbol("idToken")
export const userIdToken = Symbol("userIdToken")
export const tenantIdToken = Symbol("tenantId")
export const snapshotIdToken = Symbol("snapshotId")
