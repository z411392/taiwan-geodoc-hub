import { getApp, deleteApp } from "firebase/app"

export const disposeFirebase = async () => {
    try {
        const app = getApp()
        await deleteApp(app)
    } catch {}
}
