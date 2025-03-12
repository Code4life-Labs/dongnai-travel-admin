import { Link, useLocation } from "react-router-dom";
import { cn } from "src/lib/utils";
import { MessageCircleWarning, Newspaper, Earth } from "lucide-react";

// Import components
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "src/components/ui/sidebar";
import { NavUser } from "./nav-user";

// Import data
import { AuthenticatedRoutesMetadata } from "src/routes/RootRoutes";

// Menu items.
const items = [
  {
    url: "/places",
    icon: Earth,
  },
  {
    url: "/blogs",
    icon: Newspaper,
  },
  {
    url: "/reports",
    icon: MessageCircleWarning,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter((part) => part !== "");

  console.log("Parts:", parts);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src="/logo.svg" />
            <AvatarFallback className="rounded-lg">App</AvatarFallback>
          </Avatar>
          <div className="truncate grid flex-1 text-left text-sm leading-tight">
            <h1 className="font-bold">DongNaiTravel Admin</h1>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Accessibles</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className={cn({
                    "bg-slate-100": parts.includes(item.url.slice(1)),
                  })}
                  key={AuthenticatedRoutesMetadata.get(item.url)}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{AuthenticatedRoutesMetadata.get(item.url)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
