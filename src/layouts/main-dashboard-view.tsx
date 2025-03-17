import React from "react";
import { CircleAlert, Moon } from "lucide-react";
import { cn } from "src/lib/utils";

// Import components
import { Button } from "src/components/ui/button";

type MainDashboardViewProps = React.PropsWithChildren<{
  title: string | JSX.Element;
  containerClassName?: string;
  bodyClassName?: string;
}>;

export default function MainDashboardView(props: MainDashboardViewProps) {
  return (
    <div
      className={cn(
        "w-full h-[calc(100dvh-28px)] flex flex-col px-2 py-3",
        props.containerClassName
      )}
    >
      <header className="flex justify-between items-center px-3">
        <div className="w-1/4">
          <h1 className="text-lg font-bold">{props.title}</h1>
        </div>
        <div className="flex justify-end gap-2 w-3/4">
          <Button variant="outline">
            <CircleAlert />
            Report
          </Button>
          <Button variant="outline" size="icon">
            <Moon />
          </Button>
        </div>
      </header>

      <hr className="my-3" />
      <section
        className={cn("flex flex-1 overflow-hidden", props.bodyClassName)}
      >
        <div className="w-full flex flex-col flex-1 border bg-secondary p-2 rounded-lg overflow-auto">
          {props.children}
        </div>
      </section>
    </div>
  );
}
