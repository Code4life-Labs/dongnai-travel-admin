import { User, X } from "lucide-react";

// Import components
import { Avatar, AvatarImage, AvatarFallback } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";

// Import hooks
import { useBannerState } from "src/states/banner";
import { useBannerDialogState } from "src/states/dialogs/banner-dialog";
import { useViewBannerDialogState } from "src/states/dialogs/view-banner-dialog";

// Import utils
import { UserUtils } from "src/objects/user/utils";
import { DatetimeUtils } from "src/utils/datetime";

// Import types
import type { BannerType } from "src/objects/banner/types";

type BannerCardProps = {
  data: BannerType;
};

export default function BannerCard(props: BannerCardProps) {
  const { setCurrentBanner } = useBannerState();
  const { open: openBannerDialog } = useBannerDialogState();
  const { open: openViewBannerDialog } = useViewBannerDialogState();

  return (
    <div className="relative grid grid-cols-12 bg-white shadow w-full items-center px-3 py-2 rounded-lg border mb-3 hover:bg-slate-100">
      {/* Name */}
      <div
        onClick={() => {
          openViewBannerDialog();
          setCurrentBanner(props.data);
        }}
        className="flex flex-col col-span-2 cursor-pointer"
      >
        <p className="font-bold">{props.data.brand.name}</p>
        <p>
          Website:{" "}
          <a
            className="text-blue-500 underline"
            href={props.data.brand.website}
            target="_blank"
          >
            Our website
          </a>
        </p>
      </div>

      {/* Banner */}
      <div className="flex justify-center col-span-3">
        <img
          src={props.data.image}
          className="aspect-video h-24 object-cover rounded-lg"
        />
      </div>

      {/* Target */}
      <div className="col-span-2">
        <a
          className="text-blue-500 underline"
          href={props.data.target}
          target="_blank"
        >
          click here
        </a>
      </div>

      {/* Start Date */}
      <div className="col-span-2">
        <p>{DatetimeUtils.getShortDateStr(props.data.startDate)} (Start)</p>
      </div>

      {/* End Date */}
      <div className="col-span-2">
        <p>{DatetimeUtils.getShortDateStr(props.data.endDate)} (End)</p>
      </div>

      {/* Actions */}
      <div className="flex justify-end col-span-1">
        <Button
          onClick={() => {
            openBannerDialog();
            setCurrentBanner(props.data);
          }}
          size="icon"
          variant="outline"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
