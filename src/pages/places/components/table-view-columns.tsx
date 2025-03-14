import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Check } from "lucide-react";

// Import components
import { DatePicker } from "src/components/date-picker";
import { Input } from "src/components/ui/input";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import states
import { usePlaceState } from "src/states/place";

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
      const { updatePlace } = usePlaceState();
      const [canEdit, setCanEdit] = React.useState(false);
      const taskId = row.getValue("_id") as string;
      const name = row.getValue("name") as any;

      const inputRef = React.useRef<HTMLInputElement | null>(null);

      return (
        <div className="flex items-center gap-2 justify-between">
          {canEdit ? (
            <Input
              ref={inputRef}
              autoFocus
              className="w-full shadow-none bg-white h-fit p-0"
              type="text"
              defaultValue={name}
            />
          ) : (
            <p>{name}</p>
          )}
          <div className="flex items-center">
            {canEdit && (
              <Check
                onClick={() => {
                  if (inputRef.current) {
                    // Update task
                    UserAPI.updatePlace(taskId, {
                      name: inputRef.current.value,
                    }).then((response) => {
                      // Update task state
                      updatePlace(response!.data);

                      setCanEdit(false);
                    });
                  }
                }}
                className="cursor-pointer me-2"
                color="gray"
                size="16px"
              />
            )}
            <PencilLine
              onClick={() => setCanEdit((state) => !state)}
              className="cursor-pointer"
              color="gray"
              size="16px"
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const { updatePlace } = usePlaceState();
      const [canEdit, setCanEdit] = React.useState(false);
      const taskId = row.getValue("_id") as string;
      const description = row.getValue("description") as any;

      const inputRef = React.useRef<HTMLInputElement | null>(null);

      return (
        <div className="flex items-center gap-2 justify-between">
          {canEdit ? (
            <Input
              ref={inputRef}
              autoFocus
              className="w-full shadow-none bg-white h-fit p-0"
              type="text"
              defaultValue={description}
            />
          ) : (
            <p>{description}</p>
          )}
          <div className="flex items-center">
            {canEdit && (
              <Check
                onClick={() => {
                  if (inputRef.current) {
                    // Update task
                    UserAPI.updatePlace(taskId, {
                      description: inputRef.current.value,
                    }).then((response) => {
                      // Update task state
                      updatePlace(response!.data);

                      setCanEdit(false);
                    });
                  }
                }}
                className="cursor-pointer me-2"
                color="gray"
                size="16px"
              />
            )}
            <PencilLine
              onClick={() => setCanEdit((state) => !state)}
              className="cursor-pointer"
              color="gray"
              size="16px"
            />
          </div>
        </div>
      );
    },
  },
];
