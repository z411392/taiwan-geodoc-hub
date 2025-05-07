import { context } from "./context"
import { startup } from "./startup"
import { TraceIdGenerator } from "@/taiwan-geodoc-hub/infrastructure/generators/trace-id-generator"
import { TraceId } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"

export const startupWithResolveTraceId = async () => {
    if (!context["withTraceId"]) {
        const container = await startup()
        const nextTraceId = container.resolve(TraceIdGenerator)
        const traceId = nextTraceId()
        container.register(TraceId, { useValue: traceId })
        context["withTraceId"] = container
    }
    return context["withTraceId"]
}
