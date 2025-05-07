import admin from "firebase-admin"

let app: admin.app.App | undefined = undefined

export const withFirebaseApp = () => {
    if (app) return app
    try {
        app = admin.app()
        if (app) return app
    } catch { }
    app = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.APP!,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        }),
    })
    return app
}
