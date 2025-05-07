import CallableInstance from "callable-instance"
import { AxiosError } from "axios"

export class ExceptionUnserializer<
    T extends Error = any,
> extends CallableInstance<[unknown], T> {
    constructor() {
        super(`execute`)
    }

    execute(thrown: unknown) {
        if (thrown instanceof AxiosError) {
            const { status, data } = thrown.response!
            if (status === 500) return new Error(data.message)
            // if (data.name === "") return
        }
        if (thrown instanceof Error) return thrown
        return new Error(String(thrown))
    }
}
