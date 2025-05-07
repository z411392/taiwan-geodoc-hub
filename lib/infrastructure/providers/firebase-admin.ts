import admin from "firebase-admin"

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.APP!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  })
} catch {}

export const app = admin.app()
