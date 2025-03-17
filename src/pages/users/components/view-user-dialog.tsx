// Import components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import { Badge } from "src/components/ui/badge";

// Import hooks
import { useUserState } from "src/states/user";
import { useViewUserDialogState } from "src/states/dialogs/view-user-dialog";

// Import utils
import { DatetimeUtils } from "src/utils/datetime";

export default function ViewUserProfileDialog() {
  const { isOpen, close } = useViewUserDialogState();
  const { currentViewUser } = useUserState();

  return (
    <Dialog open={isOpen} modal defaultOpen={isOpen} onOpenChange={close}>
      <DialogContent className="min-w-[720px] border-b border-b-2 pb-3 mb-6 max-h-[calc(100dvh-4rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        {currentViewUser ? (
          <>
            {/* User Avatar */}
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24">
                <AvatarImage src={currentViewUser.avatar} />
                <AvatarFallback>
                  {currentViewUser.firstName?.charAt(0)}
                  {currentViewUser.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="mt-2 text-lg font-semibold">
                {currentViewUser.displayName}
              </p>
              <Badge variant="outline">{currentViewUser.role.name}</Badge>
            </div>

            {/* User Info */}
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="font-medium">
                  {currentViewUser.firstName} {currentViewUser.lastName}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Username</p>
                <p className="font-medium">@{currentViewUser.username}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">{currentViewUser.email}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Birthday</p>
                <p className="font-medium">
                  {DatetimeUtils.getShortDateStr(currentViewUser.birthday)}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Account Status</p>
                <Badge
                  variant={
                    currentViewUser.isVerified ? "default" : "destructive"
                  }
                >
                  {currentViewUser.isVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Joined On</p>
                <p className="font-medium">
                  {DatetimeUtils.getShortDateStr(currentViewUser.createdAt!)}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No user selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
