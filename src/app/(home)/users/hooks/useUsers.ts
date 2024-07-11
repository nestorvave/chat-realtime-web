import { IUser } from "@/app/domain/models/users/users.model";
import { usersCase } from "@/app/domain/use-cases/users/users.use-case";

import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");

  const { getAllUsers } = usersCase();

  const getData = async () => {
    try {
      const response = await getAllUsers();
      console.log(response);
      setUsers(response);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return { users, search, setSearch };
};
