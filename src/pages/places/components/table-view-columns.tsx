import { ColumnDef } from "@tanstack/react-table";

// Import components
import { PlaceRecommendationBadge } from "./place-attribute-badges";
import { Button } from "src/components/ui/button";

// Import states
import { usePlaceState } from "src/states/place";
import { usePlaceDialogState } from "src/states/dialogs/place-dialog";
import { useViewPlaceDialogState } from "src/states/dialogs/view-place-dialog";

// Import types
import type { PlaceType } from "src/objects/place/types";

export const taskColumns: ColumnDef<PlaceType>[] = [
  {
    accessorKey: "_id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as any;

      return (
        <div className="flex items-center gap-2 justify-between">
          <p>{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "isRecommended",
    header: "Recommended",
    cell: ({ row }) => {
      const isRecommended = row.getValue("isRecommended") as any;

      return (
        <div className="flex items-center gap-2 justify-between">
          <PlaceRecommendationBadge data={isRecommended} />
        </div>
      );
    },
  },
  {
    accessorKey: "totalFavorites",
    header: "Favorites",
    cell: ({ row }) => {
      const totalFavorites = row.getValue("totalFavorites") as any;

      return (
        <div className="flex items-center gap-2 justify-between">
          <p>{totalFavorites}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalVisits",
    header: "Visits",
    cell: ({ row }) => {
      const totalVisits = row.getValue("totalVisits") as any;

      return (
        <div className="flex items-center gap-2 justify-between">
          <p>{totalVisits}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as any;

      return (
        <div className="flex items-center gap-2 justify-between">
          <p>{rating || 0}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { setCurrentPlace } = usePlaceState();
      const { open: openViewPlace } = useViewPlaceDialogState();
      const { open } = usePlaceDialogState();

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="link"
            onClick={() => {
              openViewPlace();
              setCurrentPlace(row.original);
            }}
          >
            View
          </Button>
          <Button
            onClick={() => {
              open();
              setCurrentPlace(row.original);
            }}
          >
            Edit
          </Button>

          <Button variant="destructive">Delete</Button>
        </div>
      );
    },
  },
];
