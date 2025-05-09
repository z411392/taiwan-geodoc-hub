import Header from "@/components/tenants/[tenantId]/header"
import Sidebar from "@/components/tenants/[tenantId]/sidebar"
import Footer from "@/components/tenants/[tenantId]/footer"
import { onRetrievingProfile } from "@/lib/modules/access-managing/presentation/ui/on-retrieving-profile"
import { ProfileProvider } from "@/composables/tenants/[tenantId]/use-profile"

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ tenantId: string }>
}) {
  const { tenantId } = await params
  const profile = (await onRetrievingProfile({ tenantId, sessionCookie: "" }))!

  return (
    <div className="flex min-h-screen flex-col">
      <Header profile={profile} />
      <div className="flex flex-1">
        <Sidebar profile={profile} />
        <main className="flex-1 p-4 md:p-6">
          <ProfileProvider profile={profile}>{children}</ProfileProvider>
          <Footer />
        </main>
      </div>
    </div>
  )
}
