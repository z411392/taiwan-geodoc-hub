"use client"

import Header from "~/components/(public)/header"
import Footer from "~/components/(public)/footer"
import { type ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-teal-50 to-emerald-50">
            <Header />
            <>{children}</>
            <Footer />
        </div>
    )
}
