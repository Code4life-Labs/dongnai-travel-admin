import React from "react";
import { Ellipsis } from "lucide-react";

// Import objects
import { UserAPI } from "src/objects/user/api";
import { BlogUtils } from "src/objects/blog/utils";

// Import components
import TaskFormDialog from "../../places/components/place-form-dialog";
import BoardViewTaskCard from "./board-view-blog-card";
import { Button } from "src/components/ui/button";

// Import states
import { useBlogState } from "src/states/blog";

function addOutlineClassName(elements: any, statusName: string) {
  let element = elements.get(statusName);
  if (element) {
    element.classList.add(
      "shadow-[0_0_0_2px_hsl(var(--primary))]",
      "border-primary"
    );
  }
}

function removeOutlineClassName(elements: any, statusName: string) {
  let element = elements.get(statusName);
  if (element) {
    element.classList.remove(
      "shadow-[0_0_0_2px_hsl(var(--primary))]",
      "border-primary"
    );
  }
}

/**
 * Render board view for tasks
 * @returns
 */
export default function BoardView() {
  const { blogsByStatus, blogStatuses, setCurrentBlog, updateBlog } =
    useBlogState();
  const columnRefs = React.useRef<Map<string, HTMLDivElement | null>>(
    new Map()
  );

  React.useEffect(() => {
    console.log("Blog by status:", blogsByStatus);
  }, []);

  return (
    <div className="relative w-full flex flex-1 border p-2 bg-secondary rounded-lg overflow-x-auto">
      <div className="flex justify-between gap-3 flex-1">
        {blogsByStatus === null ? (
          <p>Loading...</p>
        ) : (
          blogsByStatus
            .entries()
            .toArray()
            .map((taskByStatus) => {
              const [statusValue, tasks] = taskByStatus;
              const status = BlogUtils.getBlogAttributeByValue(
                blogStatuses,
                statusValue
              );

              if (!status) return;

              let statusCircleClassName =
                "w-5 h-5 rounded-full border border-[3px]";
              let statusCircleColor = BlogUtils.getStatusColor(
                status.value === "verified" ? true : false
              );

              if (statusCircleColor)
                statusCircleClassName += " " + statusCircleColor;

              return (
                <div
                  ref={(ref) => columnRefs.current.set(status.name, ref)}
                  key={status.value}
                  onDrop={(e) => {
                    const taskId = e.dataTransfer.getData("taskId");

                    // Update state: move task to order group
                    UserAPI.updateBlog(taskId, {
                      isApproved: status.value === "verified" ? true : false,
                    }).then((response) => {
                      if (response?.data) updateBlog(response?.data);
                    });

                    // Un-highlight column
                    removeOutlineClassName(columnRefs.current, status.name);
                  }}
                  onDragOver={(e) => {
                    // Allow drop
                    e.preventDefault();

                    // Highlight column
                    addOutlineClassName(columnRefs.current, status.name);
                  }}
                  onDragLeave={(e) => {
                    // Un-highlight column
                    removeOutlineClassName(columnRefs.current, status.name);
                  }}
                  className="flex flex-col bg-white rounded-lg border w-full min-w-[420px] h-full pt-5 pb-3 overflow-y-hidden"
                >
                  <header className="flex flex-col px-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={statusCircleClassName}></div>
                        <h3 className="ms-2 font-semibold">{status.name}</h3>
                      </div>
                      <Button variant="outline" size="icon">
                        <Ellipsis />
                      </Button>
                    </div>
                    <p className="mt-3">Description here</p>
                  </header>
                  <hr className="my-3" />
                  <div className="flex flex-1 flex-col pt-1 px-3 items-center overflow-y-auto">
                    {tasks === null || !Array.isArray(tasks) ? (
                      <p>Loading...</p>
                    ) : (
                      tasks.map((task) => {
                        return <BoardViewTaskCard key={task._id} data={task} />;
                      })
                    )}
                  </div>
                  {/* <TaskFormDialog
                    TriggerContent={
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => ssetCurrentBlog(null)}
                      >
                        <Plus /> Add new item
                      </Button>
                    }
                  /> */}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
