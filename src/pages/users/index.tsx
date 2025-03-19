import React from "react";

// Import components
import MainDashboardView from "src/layouts/main-dashboard-view";
import UserListView from "./components/user-list-view";
import ViewUserProfileDialog from "./components/view-user-dialog";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import states
import { useUserState } from "src/states/user";

export default function UsersPage() {
  const { setUsers, clearUsers } = useUserState();

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
    <MainDashboardView title="Users">
      <UserListView />
    </MainDashboardView>
  );
}
