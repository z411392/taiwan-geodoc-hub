"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { type User } from "firebase/auth"
import { RoleType } from "@/taiwan-geodoc-hub/modules/access-controlling/enums/role-type"
import { useContainer } from "~/composables/providers/trace-id-provider/user-provider/tenant-provider"
import { type NonAbstractClass } from "@/taiwan-geodoc-hub/infrastructure/types/non-abstract-class"
import { SearchMembersPort } from "@/taiwan-geodoc-hub/modules/member-managing/domain/ports/search-members-port"
import { createContext, useContext, type ReactNode } from "react"

export type FormData = {
    page: number
    role: `${RoleType}` | "all"
    q: string
}

type Context = FormData & {
    members: Array<User & { role: `${RoleType}` }>
    total: number
}

const context = createContext<Context>(undefined as unknown as Context)

export default function ({
    children,
    page,
    role,
    q,
    members,
    total,
}: Context & { children: ReactNode }) {
    return (
        <context.Provider
            value={{
                page,
                role,
                q,
                members,
                total,
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useFormData = () => {
    const { role, q } = useContext(context)
    return {
        role,
        q,
    }
}

export const usePage = () => {
    const { page } = useContext(context)
    return {
        page,
    }
}

export const useMembers = () => {
    const { members, total } = useContext(context)
    return {
        members,
        total,
    }
}

// const useFormData = () => {
//     const [formData, setFormData] = useState<FormData>({
//         page: 1,
//         role: "all",
//         q: "",
//     })

//     const router = useRouter()
//     useEffect(() => {
//         const searchParams = new URLSearchParams(window.location.search)
//         const page = parseInt(searchParams.get("page") || "0")
//         const role = searchParams.get("role")
//         const q = searchParams.get("q")
//         let redirect = false
//         if (!page || page < 0) {
//             searchParams.set("page", "1")
//             redirect = true
//         }
//         if (
//             role === null ||
//             ![...Object.values(RoleType), "all"].includes(role as `${RoleType}`)
//         ) {
//             searchParams.set("role", "all")
//             redirect = true
//         }
//         if (q === null) {
//             searchParams.set("q", "")
//             redirect = true
//         }
//         if (redirect) {
//             const next = `?${searchParams.toString()}`
//             router.replace(next, { scroll: false })
//             return
//         }
//         setFormData({
//             page: page,
//             role: role as `${RoleType}` | "all",
//             q: q!,
//         })
//     }, [router])
//     return {
//         formData,
//         setFormData,
//     }
// }

// export const useMembers = () => {
//     const { formData, setFormData } = useFormData()
//     const [members, setMembers] = useState<
//         Array<User & { role: `${RoleType}` }>
//     >([])
//     const [total, setTotal] = useState<number>(0)
//     const [isLoading, setIsLoading] = useState(false)
//     const container = useContainer()
//     const searchMembersPort = container.resolve(
//         SearchMembersPort as NonAbstractClass<SearchMembersPort>,
//     )
//     useEffect(() => {
//         const run = async () => {
//             setIsLoading(true)
//             const { page, role, q } = formData
//             try {
//                 const { records, total } = await searchMembersPort.search(
//                     page,
//                     role === "all" ? undefined : (role as `${RoleType}`),
//                     q,
//                 )
//                 setMembers(records)
//                 setTotal(total)
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//         run()
//     }, [formData])

//     return {
//         members,
//         total,
//         isLoading,
//         formData,
//         setFormData,
//     }
// }
