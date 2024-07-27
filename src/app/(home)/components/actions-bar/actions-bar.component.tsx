"use client";
import { AiFillMessage } from "react-icons/ai";
import { PiUsersFill } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "@/app/store/modules/user.module";
import { deleteCookie } from "cookies-next";
import { RootState } from "@/app/store";
import { Avatar } from "@/app/components/avatar/avatar.component";
import { IoExitOutline } from "react-icons/io5";
import { resetSelectedChat } from "@/app/store/modules/selected-user.module";
import { signOut } from "next-auth/react";


export const ActionsBar = () => {
  const user = useSelector((state: RootState) => state.users);
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const routes = useRouter();
  const logOut = () => {
    dispatch(resetUser());
    dispatch(resetSelectedChat());
    deleteCookie("token");
    signOut();
    routes.push("/");
  };

  const links = [
    { link: "/chat", icon: <AiFillMessage />, execute: () => {} },
    { link: "/users", icon: <PiUsersFill />, execute: () => {} },
    { link: "/", icon: <IoExitOutline />, execute: logOut },
  ];

  return (
    <nav className="mt-3 flex items-center justify-between border-t border-grayDark px-3 md:mt-0 md:h-screen md:w-20 md:flex-col md:border-r md:p-2">
      <section className="mt-4 flex w-9/12 gap-4 md:flex-col">
        {links.map(({ link, icon, execute }) => (
          <Link
            className={`flex w-full cursor-pointer items-center justify-center rounded-lg p-3 text-2xl ${currentPath.startsWith(link) && link !== "/" ? "bg-grayDark text-whiteDark" : "text-grayDark hover:bg-grayDark hover:text-whiteDark"}`}
            href={link}
            passHref
            key={link}
            onClick={execute}
          >
            {icon}
          </Link>
        ))}
      </section>
      <section className="flex w-auto items-center justify-center md:mb-4">
        <Avatar
          avatarUrl={user.avatarUrl || ""}
          username={user.name}
          online={true}
        />
      </section>
    </nav>
  );
};
