import React from "react";

// Import components
import { Badge } from "src/components/ui/badge";

// Import objects
import { UserUtils } from "src/objects/user/utils";

import { cn } from "src/lib/utils";

type BadgeProps = {
  data: any;
} & React.HTMLAttributes<HTMLDivElement>;

export function UserVerificationBadge({
  className,
  data,
  ...props
}: BadgeProps) {
  return (
    <Badge
      className={cn(UserUtils.getStatusColor(data), className)}
      variant="outline"
      {...props}
    >
      {data ? "Verified" : "Unverified"}
    </Badge>
  );
}
