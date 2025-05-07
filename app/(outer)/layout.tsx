"use client"

import Header from "@/components/(outer)/header"
import Footer from "@/components/(outer)/footer"
import React from "react"
import { usePathname } from "next/navigation"
import { PublicRoute } from "@/lib/constants/routes"

export default function PublicPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const route = usePathname() as PublicRoute
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-teal-50 to-emerald-50">
      <Header route={route} />
      <>{children}</>
      <Footer />
    </div>
  )
}
