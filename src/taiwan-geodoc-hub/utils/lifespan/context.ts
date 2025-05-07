import { type DependencyContainer } from "tsyringe"

export type Context = {
    container?: DependencyContainer
}

export const context: Context = {
    container: undefined,
}
