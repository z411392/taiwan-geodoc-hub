"use client"

import { createContext, useContext, type ReactNode } from "react"
import { initializeApp, type FirebaseApp, getApps, getApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"

type Context = {
    app: FirebaseApp
    auth: Auth
}

const context = createContext<Context>(undefined as unknown as Context)

export default function FirebaseProvider({
    children,
}: {
    children: ReactNode
}) {
    if (!getApps().length) {
        initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!))
    }
    const app = getApp()
    const auth = getAuth(app)
    return <context.Provider value={{ app, auth }}>{children}</context.Provider>
}

export const useFirebaseApp = () => {
    const { app } = useContext(context)
    return app
}

export const useAuth = () => {
    const { auth } = useContext(context)
    return auth
}
