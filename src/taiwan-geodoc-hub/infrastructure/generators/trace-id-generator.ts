import { v5, v1, NIL, type UUIDTypes } from "uuid"
import { Base62 } from "@/taiwan-geodoc-hub/modules/general/domain/ports/base62"
import CallableInstance from "callable-instance"
import { injectable, inject } from "tsyringe"
import { Namespace } from "@/taiwan-geodoc-hub/modules/general/enums/namespace"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"

type Options = {
    value?: string | Uint8Array
    namespace?: UUIDTypes
    autoIncrement?: boolean
    toBase62?: boolean
}

@injectable()
export class TraceIdGenerator extends CallableInstance<[Options?], string> {
    constructor(
        @inject(Base62 as NonAbstractClass<Base62>)
        protected base62: Base62,
    ) {
        super(`execute`)
    }
    execute({ value, namespace, autoIncrement, toBase62 }: Options = {}) {
        if (!value) value = autoIncrement === false ? NIL : v1()
        if (!namespace) namespace = String(Namespace.Traces)
        const uuid = v5(value, namespace)
        if (toBase62 === false) return uuid
        const hex = uuid.replace(/-/g, "")
        const bytes = Uint8Array.from(Buffer.from(hex, "hex"))
        return this.base62.encode(bytes)
    }
}
