// Import components
import { TableViewDataTable } from "src/components/table/table-view-datatable";
import { taskColumns } from "./table-view-columns";

// Import states
import { useReportState } from "src/states/report";

export default function TableView() {
  const { reports } = useReportState();

  return (
    <>
      {reports === null ? (
        <p>Loading...</p>
      ) : (
        <TableViewDataTable columns={taskColumns} data={[...reports]} />
      )}
    </>
  );
}
