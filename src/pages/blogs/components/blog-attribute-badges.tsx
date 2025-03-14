import React from "react";

// Import components
import { Badge } from "src/components/ui/badge";

// Import objects
import { BlogUtils } from "src/objects/blog/utils";

import { cn } from "src/lib/utils";

type BadgeProps = {
  data: any;
} & React.HTMLAttributes<HTMLDivElement>;

export function BlogStatusBadge({ className, data, ...props }: BadgeProps) {
  return (
    <Badge
      className={cn(BlogUtils.getStatusColor(data), className)}
      variant="outline"
      {...props}
    >
      {data ? "Verified" : "Unverified"}
    </Badge>
  );
}
