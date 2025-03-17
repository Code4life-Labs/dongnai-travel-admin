import React from "react";

// Import components
import MainDashboardView from "src/layouts/main-dashboard-view";
import TableView from "./components/table-view";
import PlaceFormDialog from "./components/place-form-dialog";
import ViewPlaceDialog from "./components/view-place-dialog";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import states
import { usePlaceState } from "src/states/place";

export default function PlacesPage() {
  const { setPlaces, clearPlaces } = usePlaceState();

  React.useEffect(() => {
    // Fetch some values
    if (import.meta.env.VITE_MODE === "dev") {
      // In development
      // Fetch data from mock data
    } else if (import.meta.env.VITE_MODE === "prod") {
      // In production
      // Fetch data from server
      UserAPI.getPlaces().then((result) => {
        setPlaces(result?.data!);
      });
    }

    return function () {
      clearPlaces();
    };
  }, []);

  return (
    <MainDashboardView title="Places">
      <TableView />
      <PlaceFormDialog />
      <ViewPlaceDialog />
    </MainDashboardView>
  );
}
