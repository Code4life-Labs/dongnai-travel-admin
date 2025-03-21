import { User, X } from "lucide-react";

// Import components
import { Avatar, AvatarImage, AvatarFallback } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import { UserVerificationBadge } from "./user-attribute-badges";

// Import hooks
import { useUserState } from "src/states/user";
import { useViewUserDialogState } from "src/states/dialogs/view-user-dialog";

// Import utils
import { UserUtils } from "src/objects/user/utils";
import { DatetimeUtils } from "src/utils/datetime";

// Import types
import type { UserType } from "src/objects/user/types";

type UserCardProps = {
  data: UserType;
};

export default function UserCard(props: UserCardProps) {
  const { open } = useViewUserDialogState();
  const { setCurrentViewUser } = useUserState();

  return (
    <div
      onClick={() => {
        open();
        setCurrentViewUser(props.data);
      }}
      className="relative grid grid-cols-12 cursor-pointer bg-white shadow w-full items-center px-3 py-2 rounded-lg border mb-3 hover:bg-slate-100"
    >
      {/* Avatar */}
      <div className="me-3 col-span-1">
        <Avatar>
          <AvatarImage src={props.data.avatar} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Name */}
      <div className="col-span-2">
        <p>{props.data.displayName || UserUtils.getFullName(props.data)}</p>
      </div>

      {/* Status (isVerified) */}
      <div className="col-span-1">
        <UserVerificationBadge data={props.data.isVerified} />
      </div>

      {/* Email */}
      <div className="col-span-4">
        <p className="truncate">{props.data.email}</p>
      </div>

      {/* Created Date */}
      <div className="col-span-2">
        <p>{DatetimeUtils.getShortDateStr(props.data.createdAt!)} (created)</p>
      </div>

      {/* Updated Date */}
      <div className="col-span-2">
        <p>{DatetimeUtils.getShortDateStr(props.data.updatedAt!)} (updated)</p>
      </div>
    </div>
  );
}
