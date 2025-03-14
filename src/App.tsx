import React from "react";

// Import routes
import RootRoutes from "./routes/RootRoutes";

// Import objects
import { BlogAPI } from "./objects/blog/api";

// Import states
import { useBlogState } from "./states/blog";

function App() {
  const { setBlogStatuses } = useBlogState();

  React.useEffect(() => {
    // Fetch some values
    if (import.meta.env.VITE_MODE === "dev") {
      // In development
      // Fetch data from mock data
      import("src/mock-data/statuses.json").then((result) => {
        setBlogStatuses(result.default);
      });
    } else if (import.meta.env.VITE_MODE === "prod") {
      // In production
      // Fetch data from server
      import("src/mock-data/statuses.json").then((result) => {
        setBlogStatuses(result.default);
      });
    }
  }, []);

  return (
    <>
      <RootRoutes />
    </>
  );
}

export default App;
