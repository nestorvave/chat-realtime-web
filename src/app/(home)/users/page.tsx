import { EmptyScreen } from "../(components)/components/empty-screen/empty-screen";
import { UserList } from "./components/user-list.component";

function page() {
  return (
    <main className="flex w-full">
      <UserList />
      <EmptyScreen />
    </main>
  );
}

export default page;
