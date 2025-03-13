import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Check } from "lucide-react";

// Import components
import { DatePicker } from "src/components/date-picker";
import { Input } from "src/components/ui/input";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import states
import { useTaskState } from "src/states/blog";

// Import types
import type { TaskType } from "src/objects/blog/types";

export const taskColumns: ColumnDef<TaskType>[] = [
  {
    accessorKey: "_id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { updateTask } = useTaskState();
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
                    UserAPI.updateTask(taskId, {
                      name: inputRef.current.value,
                    }).then((response) => {
                      // Update task state
                      updateTask(response!.data);

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
      const { updateTask } = useTaskState();
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
                    UserAPI.updateTask(taskId, {
                      description: inputRef.current.value,
                    }).then((response) => {
                      // Update task state
                      updateTask(response!.data);

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
    accessorKey: "startAt",
    header: "Start date",
    cell: ({ row }) => {
      const { updateTask } = useTaskState();
      const taskId = row.getValue("_id") as string;
      const startAt = row.getValue("startAt") as any;

      return (
        <div className="flex items-center justify-between">
          <p>{new Date(startAt).toLocaleDateString()}</p>
          <DatePicker
            TriggerContent={
              <PencilLine className="cursor-pointer" color="gray" size="16px" />
            }
            date={new Date(startAt)}
            setDate={(date: any) => {
              UserAPI.updateTask(taskId, { startAt: date.getTime() }).then(
                (response) => {
                  // Update task state
                  updateTask(response!.data);
                }
              );
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "endAt",
    header: "End date",
    cell: ({ row }) => {
      const { updateTask } = useTaskState();
      const taskId = row.getValue("_id") as string;
      const endAt = row.getValue("endAt") as any;

      return (
        <div className="flex items-center justify-between">
          <p>{new Date(endAt).toLocaleDateString()}</p>
          <DatePicker
            TriggerContent={
              <PencilLine className="cursor-pointer" color="gray" size="16px" />
            }
            date={new Date(endAt)}
            setDate={(date: any) => {
              UserAPI.updateTask(taskId, { endAt: date.getTime() }).then(
                (response) => {
                  // Update task state
                  updateTask(response!.data);
                }
              );
            }}
          />
        </div>
      );
    },
  },
];
