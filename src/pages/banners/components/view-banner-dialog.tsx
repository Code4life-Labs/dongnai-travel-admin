import React from "react";

// Import components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";

// Import state
import { useViewBannerDialogState } from "src/states/dialogs/view-banner-dialog";
import { useBannerState } from "src/states/banner";

// Import utils
import { DatetimeUtils } from "src/utils/datetime";

export default function ViewBannerDialog() {
  const { isOpen, close } = useViewBannerDialogState();
  const { currentBanner } = useBannerState();

  if (!currentBanner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="min-w-[720px] max-h-[calc(100dvh-4rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>View Banner</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <strong>Title:</strong>
            <p>{currentBanner.title}</p>
          </div>

          <div>
            <strong>Image:</strong>
            <div className="w-full aspect-video bg-gray-100 rounded-md overflow-hidden">
              <img
                src={currentBanner.image || "/placeholder-image.jpg"}
                alt="Banner"
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>

          <div>
            <strong>Target URL:</strong>
            <p>{currentBanner.target}</p>
          </div>

          <div>
            <strong>Brand Name:</strong>
            <p>{currentBanner.brand?.name}</p>
          </div>

          <div>
            <strong>Brand Logo URL:</strong>
            <p>{currentBanner.brand?.logoUrl}</p>
          </div>

          <div>
            <strong>Brand Website:</strong>
            <p>{currentBanner.brand?.website}</p>
          </div>

          <div>
            <strong>Active:</strong>
            <p>{currentBanner.isActive ? "Yes" : "No"}</p>
          </div>

          <div>
            <strong>Start Date:</strong>
            <p>{DatetimeUtils.getShortDateStr(currentBanner.startDate)}</p>
          </div>

          <div>
            <strong>End Date:</strong>
            <p>{DatetimeUtils.getShortDateStr(currentBanner.endDate)}</p>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={close}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
