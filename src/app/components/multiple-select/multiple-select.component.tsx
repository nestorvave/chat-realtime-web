import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { PiLineVerticalBold } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { IUser } from "@/app/domain/models/users/users.model";

export const MultipleSelect = ({
  users,
  group,
  setGroup,
}: {
  users: IUser[];
  group: { users: string[]; name: string };
  setGroup: React.Dispatch<
    React.SetStateAction<{ users: string[]; name: string }>
  >;
}) => {
  const [allUsers, setallUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    setallUsers(users);
  }, [users]);

  const selectUser = (user: IUser) => {
    let newData = [...selectedUsers];
    newData.push(user);
    setGroup({ ...group, users: newData.map((item) => item._id) });
    setSelectedUsers(newData);
  };

  const usersFiltered = (): IUser[] => {
    const selectedUserMap = new Map(
      selectedUsers.map((user) => [user._id, true]),
    );
    return allUsers.filter((user) => !selectedUserMap.has(user._id));
  };

  const onDelete = (_id: string) => {
    let newData = [...selectedUsers];
    newData = newData.filter((user) => user._id !== _id);
    setGroup({ ...group, users: newData.map((item) => item._id) });
    setSelectedUsers([...newData]);
  };

  const onReset = () => {
    setSelectedUsers([]);
    setGroup({ ...group, users: [] });
  };

  return (
    <main className="relative w-full">
      <label
        htmlFor={"group-box"}
        className="mb-[8px] block pl-1 text-base text-white"
      >
        Members
        <span className="text-logo pl-1 text-xl">*</span>
      </label>
      <section className="text-main shadow-inputDefault focus:shadow-input flex min-h-[40px] w-full resize-none justify-between rounded-2xl bg-grayDark p-2 px-3 pl-5 text-base text-whiteDark focus:outline-none">
        <section className="flex flex-wrap gap-2">
          {selectedUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-center gap-1 rounded-md bg-whiteDark p-1 px-3 text-grayDark"
            >
              {user.name}
              <IoCloseSharp
                onClick={() => onDelete(user._id)}
                className="texst-xl cursor-pointer hover:text-red-600"
              />
            </div>
          ))}
        </section>
        <section className="flex items-center justify-center">
          <IoCloseSharp className="cursor-pointer text-xl" onClick={onReset} />
          <PiLineVerticalBold className="text-xl" />
          <span
            onClick={() => setOpenMenu(!openMenu)}
            className={`${!openMenu ? "" : "rotate-[-180deg]"} transition duration-200`}
          >
            <IoIosArrowDown className="cursor-pointer text-xl hover:text-black" />
          </span>
        </section>
      </section>
      {openMenu && (
        <section className="no-scrollbar absolute mt-2 max-h-[200px] w-full overflow-auto rounded-2xl bg-grayDark">
          {usersFiltered().map((user) => (
            <div
              key={user._id}
              onClick={() => selectUser(user)}
              className="cursor-pointer p-2 px-3 pl-5 text-whiteDark hover:bg-whiteDark hover:text-black"
            >
              {user.name}
            </div>
          ))}
        </section>
      )}
    </main>
  );
};
