import { resolveUser } from "~/auth/resolve-user"

export type User = ReturnType<typeof resolveUser>
