import { PublicRoutes } from "@/lib/constants/routes"

export const isPublic = (pathname: string) => {
  for (const route of PublicRoutes) {
    if (pathname.startsWith(route)) return true
  }
  return false
}
