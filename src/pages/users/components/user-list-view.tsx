// Import components
import UserCard from "./user-card";

// Import states
import { useUserState } from "src/states/user";

export default function UserListView() {
  const { users } = useUserState();

  return (
    <>
      {users === null ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => {
          return <UserCard key={user._id} data={user} />;
        })
      )}
    </>
  );
}
