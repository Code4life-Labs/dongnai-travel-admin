import React from "react";

// Import routes
import RootRoutes from "./routes/RootRoutes";

// Import objects
import { BlogAPI } from "./objects/blog/api";
import { PlaceAPI } from "./objects/place/api";
import { ReportAPI } from "./objects/report/api";

// Import states
import { useBlogState } from "./states/blog";
import { usePlaceState } from "./states/place";
import { useReportState } from "./states/report";

function App() {
  const { setBlogStatuses, setBlogTypes } = useBlogState();
  const { setPlaceTypes } = usePlaceState();
  const { setReportReasons, setReportStatuses } = useReportState();

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
      const promises = [
        PlaceAPI.getPlaceTypes(),
        BlogAPI.getBlogTypes(),
        ReportAPI.getReportReasons(),
        ReportAPI.getReportStatuses(),
        import("src/mock-data/statuses.json"),
      ];

      Promise.all(promises).then((values) => {
        const [
          placeTypesResponsePayload,
          blogTypesResponsePayload,
          reportReasonsPayload,
          reportStatusesPayload,
          blogStatuses,
        ] = values;
        setBlogStatuses((blogStatuses as any).default);
        setBlogTypes((blogTypesResponsePayload as any).data);
        setReportReasons((reportReasonsPayload as any).data);
        setReportStatuses((reportStatusesPayload as any).data);
        setPlaceTypes((placeTypesResponsePayload as any).data);
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
