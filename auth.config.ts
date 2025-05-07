import { APIRoutes } from "@/taiwan-geodoc-hub/infrastructure/constants/routes"

export const serviceAccount = {
    projectId: process.env.APP!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!,
}

export const apiKey = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG!,
).apiKey

export const cookieName = "session"

export const cookieSerializeOptions = {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "lax" as const,
    maxAge: 86400 * 14,
}

export const cookieSignatureKeys = [process.env.COOKIE_SIGNATURE_KEY!]
