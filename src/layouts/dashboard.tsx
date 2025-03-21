// Import components
import { SidebarProvider, SidebarTrigger } from "src/components/ui/sidebar";
import { AppSidebar } from "src/components/app-sidebar";
import ViewReportDialog from "src/pages/reports/components/view-report-dialog";
import ViewUserProfileDialog from "src/pages/users/components/view-user-dialog";
import ViewBlogDialog from "src/pages/blogs/components/view-blog-dialog";
import ViewPlaceDialog from "src/pages/places/components/view-place-dialog";
import PlaceFormDialog from "src/pages/places/components/place-form-dialog";
import BannerFormDialog from "src/pages/banners/components/banner-form-dialog";
import ViewBannerDialog from "src/pages/banners/components/view-banner-dialog";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full overflow-hidden">
        <SidebarTrigger />
        {children}
        <ViewReportDialog />
        <ViewUserProfileDialog />
        <ViewBlogDialog />
        <ViewPlaceDialog />
        <PlaceFormDialog />
        <BannerFormDialog />
        <ViewBannerDialog />
      </main>
    </SidebarProvider>
  );
}
