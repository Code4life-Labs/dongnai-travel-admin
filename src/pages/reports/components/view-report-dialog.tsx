import { format } from "date-fns";

// Import components
import { ReportStatusBadge } from "./report-attribute-badges";
import { Button } from "src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { Badge } from "src/components/ui/badge";

// Import objects
import { ReportAPI } from "src/objects/report/api";

// Import hooks
import { useReportState } from "src/states/report";
import { useViewReportDialogState } from "src/states/dialogs/view-report-dialog";

export default function ViewReportDialog() {
  const { currentReport, reportStatuses, setCurrentReport } = useReportState();
  const { isOpen, close } = useViewReportDialogState();

  const isReportResolve = currentReport
    ? currentReport.status.value === "resolved"
    : false;

  return (
    <Dialog open={isOpen} modal defaultOpen={isOpen} onOpenChange={close}>
      <DialogContent className="min-w-[720px] border-b border-b-2 pb-3 mb-6 max-h-[calc(100dvh-4rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Report Details</DialogTitle>
        </DialogHeader>
        {currentReport ? (
          <>
            {/* Reporter */}
            <div>
              <h3 className="font-semibold mb-2">Reporter</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={currentReport.reporter.avatar} />
                  <AvatarFallback>
                    {currentReport.reporter.firstName?.charAt(0)}
                    {currentReport.reporter.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {currentReport.reporter.displayName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {currentReport.reporter.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Reported User */}
            {currentReport.user && (
              <div>
                <h3 className="font-semibold mb-2">Reported User</h3>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={currentReport.user.avatar} />
                    <AvatarFallback>
                      {currentReport.user.firstName?.charAt(0)}
                      {currentReport.user.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {currentReport.user.displayName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {currentReport.user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reported Place */}
            {currentReport.place && (
              <div>
                <h3 className="font-semibold mb-2">Reported Place</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={currentReport.place.photos[0]}
                    alt={currentReport.place.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <p className="font-medium">{currentReport.place.name}</p>
                    <p className="text-gray-500 text-sm">
                      Created at:{" "}
                      {format(
                        new Date(currentReport.place.createdAt),
                        "MMMM dd, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reported Blog */}
            {currentReport.blog && (
              <div>
                <h3 className="font-semibold mb-2">Reported Blog</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={currentReport.blog.coverImage}
                    alt={currentReport.blog.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <p className="font-medium">{currentReport.blog.name}</p>
                    <p className="text-gray-500 text-sm">
                      Created at:{" "}
                      {format(
                        new Date(currentReport.blog.createdAt),
                        "MMMM dd, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reason */}
            <div>
              <h3 className="font-semibold mb-1">Reason</h3>
              <Badge variant="outline">{currentReport.reason.name}</Badge>
            </div>

            {/* Status */}
            <div>
              <h3 className="font-semibold mb-1">Status</h3>
              <ReportStatusBadge data={currentReport.status} />
            </div>

            {/* Description */}
            {currentReport.description && (
              <div>
                <h3 className="font-semibold mb-1">Description</h3>
                <p className="text-sm text-gray-700 break-words">
                  {currentReport.description}
                </p>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Created At</p>
                <p className="font-medium">
                  {format(
                    new Date(currentReport.createdAt),
                    "MMMM dd, yyyy HH:mm"
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Updated At</p>
                <p className="font-medium">
                  {format(
                    new Date(currentReport.updatedAt),
                    "MMMM dd, yyyy HH:mm"
                  )}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Actions</h3>
              <div className="flex gap-3">
                <Button
                  disabled={isReportResolve}
                  onClick={() => {
                    if (reportStatuses) {
                      const reviewedStatus = reportStatuses.find(
                        (status) => status.value === "reviewed"
                      )!;

                      if (reviewedStatus.value !== currentReport.status.value) {
                        ReportAPI.updateReportStatus(
                          currentReport._id!,
                          reviewedStatus
                        ).then(() => {
                          currentReport.status = { ...reviewedStatus };
                          setCurrentReport(currentReport);
                        });
                      }
                    }
                  }}
                  className="w-full"
                >
                  Mark as reviewd
                </Button>
                <Button
                  disabled={isReportResolve}
                  onClick={() => {
                    if (reportStatuses) {
                      const resolvedStatus = reportStatuses.find(
                        (status) => status.value === "resolved"
                      )!;
                      ReportAPI.updateReportStatus(
                        currentReport._id!,
                        resolvedStatus
                      ).then(() => {
                        currentReport.status = { ...resolvedStatus };
                        setCurrentReport(currentReport);
                      });
                    }
                  }}
                  className="w-full"
                  variant="outline"
                >
                  Resolve
                </Button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No report selected.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
