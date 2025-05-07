export const serviceAccount = {
    projectId: process.env.PROJECT_ID!,
    clientEmail: process.env.CLIENT_EMAIL!,
    privateKey: process.env.PRIVATE_KEY!,
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
