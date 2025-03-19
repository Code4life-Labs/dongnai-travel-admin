import { ColumnDef } from "@tanstack/react-table";

// Import components
import { ReportStatusBadge } from "./report-attribute-badges";
import { Button } from "src/components/ui/button";

// Import objects
import { UserUtils } from "src/objects/user/utils";

// Import states
import { useReportState } from "src/states/report";
import { useViewReportDialogState } from "src/states/dialogs/view-report-dialog";
import { useViewPlaceDialogState } from "src/states/dialogs/view-place-dialog";
import { useViewBlogDialogState } from "src/states/dialogs/view-blog-dialog";
import { useViewUserDialogState } from "src/states/dialogs/view-user-dialog";
import { usePlaceState } from "src/states/place";
import { useUserState } from "src/states/user";
import { useBlogState } from "src/states/blog";

// Import types
import type { ReportType } from "src/objects/report/types";

export const taskColumns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "_id",
    header: "id",
  },
  {
    accessorKey: "reporter",
    header: "Reporter",
    cell: ({ row }) => {
      const reporter = row.getValue("reporter") as any;

      return (
        <div className="flex items-center gap-2 justify-between">
          <p>{UserUtils.getFullName(reporter)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "reportedItem",
    header: "Reported Item",
    cell: ({ row }) => {
      const { open: openViewPlaceDialog } = useViewPlaceDialogState();
      const { open: openViewBlogDialog } = useViewBlogDialogState();
      const { open: openViewUserDialog } = useViewUserDialogState();
      const { setCurrentPlace } = usePlaceState();
      const { setCurrentBlog } = useBlogState();
      const { setCurrentViewUser } = useUserState();

      let children;
      let handlerItemClick: (() => void) | undefined;

      if (row.original.user) {
        children = <p>User</p>;
        handlerItemClick = function () {
          setCurrentViewUser(row.original.user);
          openViewUserDialog();
        };
      }

      if (row.original.place) {
        children = <p>Place</p>;
        handlerItemClick = function () {
          setCurrentPlace(row.original.place);
          openViewPlaceDialog();
        };
      }

      if (row.original.blog) {
        children = <p>Blog</p>;
        handlerItemClick = function () {
          setCurrentBlog(row.original.blog);
          openViewBlogDialog();
        };
      }

      return (
        <div className="flex items-center gap-2 justify-between">
          <Button
            onClick={() => handlerItemClick && handlerItemClick()}
            variant="link"
          >
            {children}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as any;

      return (
        <div className="flex items-center gap-2 justify-between">
          <p>{description}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as any;

      return (
        <div className="flex items-center gap-2 justify-between">
          <ReportStatusBadge data={status} />
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { setCurrentReport } = useReportState();
      const { open } = useViewReportDialogState();

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="link"
            onClick={() => {
              open();
              setCurrentReport(row.original);
            }}
          >
            View
          </Button>
          <Button variant="outline">Resolve</Button>
        </div>
      );
    },
  },
];
