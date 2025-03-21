import React from "react";

// Import components
import { Button } from "src/components/ui/button";
import MainDashboardView from "src/layouts/main-dashboard-view";
import BannerListView from "./components/banner-list-view";

// Import objects
import { BannerAPI } from "src/objects/banner/api";

// Import states
import { useBannerState } from "src/states/banner";
import { useBannerDialogState } from "src/states/dialogs/banner-dialog";

export default function BannersPage() {
  const { setCurrentBanner, setBanners, clearBanners } = useBannerState();
  const { open } = useBannerDialogState();

  React.useEffect(() => {
    // Fetch some values
    if (import.meta.env.VITE_MODE === "dev") {
      // In development
      // Fetch data from mock data
    } else if (import.meta.env.VITE_MODE === "prod") {
      // In production
      // Fetch data from server
      BannerAPI.getBanners().then((result) => {
        setBanners(result?.data!);
      });
    }

    return function () {
      clearBanners();
    };
  }, []);

  return (
    <MainDashboardView title="Banners">
      <BannerListView />
      <Button
        onClick={() => {
          setCurrentBanner(null);
          open();
        }}
        className="absolute bottom-0 right-0 me-6 mb-6"
      >
        Create banner
      </Button>
    </MainDashboardView>
  );
}
