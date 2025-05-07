import { initializeApp, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"

try {
  initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!))
} catch {}

export const app = getApp()
export const auth = getAuth(app)
