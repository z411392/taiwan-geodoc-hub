import { getTokens } from "next-firebase-auth-edge"
import { cookies as getCookies } from "next/headers"
import {
    apiKey,
    serviceAccount,
    cookieName,
    cookieSignatureKeys,
} from "~/auth.config"

export const resolveTokens = async () => {
    const cookies = await getCookies()
    const tokens = await getTokens(cookies, {
        apiKey,
        serviceAccount,
        cookieName,
        cookieSignatureKeys,
    })
    if (!tokens) return undefined
    return tokens
}
