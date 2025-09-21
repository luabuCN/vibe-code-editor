import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/featrues/dashboard/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider>
        <div className="flex min-h-screen w-full overflwo-x-hidden">
          <DashboardSidebar initialPlayground={[]}/>
          <main className="flex-1">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  )
}