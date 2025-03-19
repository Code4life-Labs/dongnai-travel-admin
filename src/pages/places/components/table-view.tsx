// Import components
import { TableViewDataTable } from "src/components/table/table-view-datatable";
import { taskColumns } from "./table-view-columns";

// Import states
import { usePlaceState } from "src/states/place";

export default function TableView() {
  const { places } = usePlaceState();

  return (
    <>
      {places === null ? (
        <p>Loading...</p>
      ) : (
        <TableViewDataTable columns={taskColumns} data={[...places]} />
      )}
    </>
  );
}
