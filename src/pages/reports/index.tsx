import React from "react";

// Import components
import MainDashboardView from "src/layouts/main-dashboard-view";
import ViewReportDialog from "./components/view-report-dialog";
import TableView from "./components/table-view";

// Import objects
import { ReportAPI } from "src/objects/report/api";

// Import states
import { useReportState } from "src/states/report";

export default function ReportsPage() {
  const { setReports, clearReports } = useReportState();

  React.useEffect(() => {
    // Fetch some values
    if (import.meta.env.VITE_MODE === "dev") {
      // In development
      // Fetch data from mock data
    } else if (import.meta.env.VITE_MODE === "prod") {
      // In production
      // Fetch data from server
      ReportAPI.getReports().then((result) => {
        console.log("Reports:", result?.data!);
        setReports(result?.data!);
      });
    }

    return function () {
      clearReports();
    };
  }, []);

  return (
    <MainDashboardView title="Reports">
      <TableView />
    </MainDashboardView>
  );
}
