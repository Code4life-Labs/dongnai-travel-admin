import React from "react";
import { CircleAlert, Moon } from "lucide-react";

// Import components
import MainDashboardView from "src/layouts/main-dashboard-view";
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
    <MainDashboardView title="Blogs">
      <BoardView />
    </MainDashboardView>
  );
}
