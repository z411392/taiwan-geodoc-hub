import { v5, v1, v4 } from "uuid"
import { Base62Encoder } from "@/taiwan-geodoc-hub/infrastructure/utils/encoders/base62-encoder"
import { type RequestIdGenerator } from "@/taiwan-geodoc-hub/modules/system-maintaining/domain/ports/request-id-generator"
import CallableInstance from "callable-instance"
import { injectable } from "tsyringe"

@injectable()
export class RequestIdGeneratorAdapter
    extends CallableInstance<[], string>
    implements RequestIdGenerator
{
    protected base62Encoder: Base62Encoder
    constructor(base62Encoder: Base62Encoder) {
        super(`execute`)
        this.base62Encoder = base62Encoder
    }
    execute() {
        return this.base62Encoder.encodeUUID(v5(v4(), v1()))
    }
}
