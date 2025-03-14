import React from "react";

// Import components
import { Badge } from "src/components/ui/badge";

// Import objects
import { PlaceUtils } from "src/objects/place/utils";

import { cn } from "src/lib/utils";

type BadgeProps = {
  data: any;
} & React.HTMLAttributes<HTMLDivElement>;

export function PlaceRecommendationBadge({
  className,
  data,
  ...props
}: BadgeProps) {
  return (
    <Badge
      className={cn(PlaceUtils.getStatusColor(data), className)}
      variant="outline"
      {...props}
    >
      {data ? "Yes" : "No"}
    </Badge>
  );
}
