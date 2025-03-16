import React from "react";
import { CircleAlert, Moon } from "lucide-react";

// Import components
import ViewBlogDialog from "./components/view-blog-dialog";
import BoardView from "./components/board-view";
import { Button } from "src/components/ui/button";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import states
import { useBlogState } from "src/states/blog";

export default function BlogsPage() {
  const { setBlogs, clearBlogs } = useBlogState();

  React.useEffect(() => {
    // Fetch some values
    if (import.meta.env.VITE_MODE === "dev") {
      // In development
      // Fetch data from mock data
      // import("src/mock-data/blogs.json").then((result) => {
      //   setBlogs(result.default as any);
      // });
    } else if (import.meta.env.VITE_MODE === "prod") {
      // In production
      // Fetch data from server
      UserAPI.getBlogs().then((result) => {
        console.log("Blogs:", result?.data);
        setBlogs(result?.data!);
      });
    }

    return function () {
      clearBlogs();
    };
  }, []);

  return (
    <div className="w-full h-[calc(100dvh-28px)] flex flex-col px-2 py-3">
      <header className="flex justify-between items-center px-3">
        <div className="w-1/4">
          <h1 className="text-lg font-bold">Blogs</h1>
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
        <ViewBlogDialog />
      </section>
    </div>
  );
}
