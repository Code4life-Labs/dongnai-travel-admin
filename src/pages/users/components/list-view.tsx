// Import components
import UserCard from "./user-card";

// Import states
import { useUserState } from "src/states/user";

export default function UserListView() {
  const { users } = useUserState();

  return (
    <div className="w-full flex flex-col flex-1 border bg-secondary p-2 rounded-lg overflow-auto">
      {users === null ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => {
          return <UserCard key={user._id} data={user} />;
        })
      )}
    </div>
  );
}
