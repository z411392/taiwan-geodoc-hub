import { type NextRequest } from "next/server"
import { Headers } from "@/lib/constants/headers"

export const getCSRFToken = (request: NextRequest) =>
  request.headers.get(Headers.CSRFToken)
