// Import components
import { TableViewDataTable } from "./table-view-datatable";
import { taskColumns } from "./table-view-columns";

// Import states
import { usePlaceState } from "src/states/place";

export default function TableView() {
  const { places } = usePlaceState();

  return (
    <div className="w-full flex flex-1 border bg-secondary rounded-lg overflow-auto">
      {places === null ? (
        <p>Loading...</p>
      ) : (
        <TableViewDataTable columns={taskColumns} data={[...places]} />
      )}
    </div>
  );
}
