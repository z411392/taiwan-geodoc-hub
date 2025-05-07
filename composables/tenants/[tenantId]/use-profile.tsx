"use client"

import { createContext, useContext } from "react"
import { type Profile } from "@/lib/modules/access-managing/application/queries/retrieve-profile"

export const ProfileContext = createContext(undefined as unknown as Profile)
export const useProfile = () => useContext(ProfileContext)

export function ProfileProvider({
  children,
  profile,
}: {
  children: React.ReactNode
  profile: Profile
}) {
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  )
}
