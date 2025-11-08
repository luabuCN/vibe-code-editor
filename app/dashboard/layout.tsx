import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/featrues/dashboard/actions";
import DashboardSidebar from "@/featrues/dashboard/components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const playgroundData = await getAllPlaygroundForUser()

  const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "Terminal",
  }

  const formattedPlaygroundData = playgroundData?.map((playerground) => ({
    id: playerground.id,
    name: playerground.title,
    icon: technologyIconMap[playerground.template] || "Code2",
    starred: playerground.Starmark?.[0].isMarked || false,
  })) || []
  return (
    <div>
      <SidebarProvider>
        <div className="flex min-h-screen w-full overflwo-x-hidden">
          <DashboardSidebar initialPlayground={formattedPlaygroundData}/>
          <main className="flex-1">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  )
}