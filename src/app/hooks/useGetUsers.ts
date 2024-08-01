import React, { useEffect, useState } from "react";
import { usersCase } from "../domain/use-cases/users/users.use-case";
import { IUser } from "../domain/models/users/users.model";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useGetUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { getAllUsers } = usersCase();
  const { _id: owner } = useSelector((state: RootState) => state.users);

  const getData = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.filter((user) => user._id !== owner));
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return users;
};
