import { initializeApp, getApp } from "firebase/app"
import { onAuthStateChanged } from "firebase/auth"
import { getAuth, type User as UserRecord } from "firebase/auth"
import { withResolvers } from "@/taiwan-geodoc-hub/utils/asyncio"

export const setupFirebase = async () => {
    try {
        return getApp()
    } catch {
        const app = initializeApp(
            JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!),
        )
        const { promise, resolve } = withResolvers<UserRecord>()
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (!user) return
            resolve(user)
        })
        try {
            await promise
        } finally {
            unsubscribe()
        }
        return app
    }
}
