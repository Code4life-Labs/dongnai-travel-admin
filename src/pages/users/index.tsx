import React from "react";
import { CircleAlert, Moon } from "lucide-react";

// Import components
import { Button } from "src/components/ui/button";
import UserListView from "./components/list-view";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import states
import { useUserState } from "src/states/user";

export default function UsersPage() {
  const { users, setUsers, clearUsers } = useUserState();

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
      UserAPI.getUsers().then((result) => {
        setUsers(result?.data!);
      });
    }

    return function () {
      clearUsers();
    };
  }, []);

  return (
    <div className="w-full h-[calc(100dvh-28px)] flex flex-col px-2 py-3">
      <header className="flex justify-between items-center px-3">
        <div className="w-1/4">
          <h1 className="text-lg font-bold">Users</h1>
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
        <UserListView />
      </section>
    </div>
  );
}
