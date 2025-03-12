import React from "react";
import { CircleAlert, Moon } from "lucide-react";

// Import components
import BoardView from "./components/board-view";
import { Button } from "src/components/ui/button";
import { Progress } from "src/components/ui/progress";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import states
import { useTaskState } from "src/states/task";

export default function BlogsPage() {
  const { tasks, tasksByStatus, setTasks, clearTasks } = useTaskState();

  const completeTasks = tasksByStatus ? tasksByStatus.get("done") : null;
  let totalTask = tasks ? tasks.length : 0;
  let totalCompleteTask = completeTasks ? completeTasks.length : 0;
  let totalCompleteTaskPercent = completeTasks
    ? (totalCompleteTask / totalTask) * 100
    : 0;

  React.useEffect(() => {
    // Fetch some values
    if (import.meta.env.VITE_MODE === "dev") {
      // In development
      // Fetch data from mock data
      import("src/mock-data/tasks.json").then((result) => {
        setTasks(result.default as any);
      });
    } else if (import.meta.env.VITE_MODE === "prod") {
      // In production
      // Fetch data from server
      UserAPI.getTasks().then((result) => {
        setTasks(result?.data!);
      });
    }

    return function () {
      clearTasks();
    };
  }, []);

  return (
    <div className="w-full h-[calc(100dvh-28px)] flex flex-col px-2 py-3">
      <header className="flex justify-between items-center px-3">
        <div className="w-1/4">
          <h1 className="text-lg font-bold">Tasks</h1>
          <div className="flex items-center">
            <Progress
              value={totalCompleteTaskPercent}
              className="w-full h-[6px] me-3"
            />
            <span className="text-xs">
              {totalCompleteTask}/{totalTask}
            </span>
          </div>
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
      <section className="flex flex-1 overflow-hidden">
        <BoardView />
      </section>
    </div>
  );
}
