import Header from "~/components/(without-resolve-tenant)/header"
import Footer from "~/components/(without-resolve-tenant)/footer"
import { type ReactNode } from "react"

export default async function ({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-teal-50 to-emerald-50">
            <Header />
            <>{children}</>
            <Footer />
        </div>
    )
}
