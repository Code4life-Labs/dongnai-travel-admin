import React from "react";

// Import components
import { Badge } from "src/components/ui/badge";

// Import objects
import { ReportUtils } from "src/objects/report/utils";

import { cn } from "src/lib/utils";

type BadgeProps = {
  data: any;
} & React.HTMLAttributes<HTMLDivElement>;

export function ReportStatusBadge({ className, data, ...props }: BadgeProps) {
  return (
    <Badge
      className={cn(ReportUtils.getStatusColor(data.value), className)}
      variant="outline"
      {...props}
    >
      {data.name}
    </Badge>
  );
}
