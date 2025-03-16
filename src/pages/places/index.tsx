import React from "react";
import { CircleAlert, Moon } from "lucide-react";

// Import components
import TableView from "./components/table-view";
import { Button } from "src/components/ui/button";
import PlaceFormDialog from "./components/place-form-dialog";
import ViewPlaceDialog from "./components/view-place-dialog";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import states
import { usePlaceState } from "src/states/place";

export default function PlacesPage() {
  const { places, setPlaces, clearPlaces } = usePlaceState();

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
    <div className="w-full h-[calc(100dvh-28px)] flex flex-col px-2 py-3">
      <header className="flex justify-between items-center px-3">
        <div className="w-1/4">
          <h1 className="text-lg font-bold">Places</h1>
        </div>
        <div className="flex justify-end gap-2 w-3/4">
          <Button variant="outline">
            <CircleAlert />
            Report
          </Button>
          <Button variant="outline" size="icon">
            <Moon />
          </Button>
        </div>
      </header>

      <hr className="my-3" />
      <section className="flex flex-1 overflow-hidden">
        <TableView />
        <PlaceFormDialog />
        <ViewPlaceDialog />
      </section>
    </div>
  );
}
