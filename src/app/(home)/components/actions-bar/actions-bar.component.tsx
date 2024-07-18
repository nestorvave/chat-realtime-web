"use client";
import { AiFillMessage } from "react-icons/ai";
import { PiUsersFill } from "react-icons/pi";

import { usePathname } from "next/navigation";
import Link from "next/link";
export const ActionsBar = () => {
  const currentPath = usePathname();

  const links = [
    { link: "/chat", icon: <AiFillMessage /> },
    { link: "/users", icon: <PiUsersFill /> },
    { link: "/register", icon: <PiUsersFill /> },
  ];

  return (
    <nav className="flex h-screen w-20 flex-col items-center justify-between p-2">
      <section className="mt-4 flex w-9/12 flex-col gap-4">
        {links.map(({ link, icon }) => (
          <Link
            className={`flex w-full cursor-pointer ${currentPath.includes(link) ? "bg-grayDark text-whiteDark hover:bg-grayDark" : "text-grayDark hover:bg-grayDark hover:text-whiteDark"} items-center justify-center rounded-lg p-3 text-2xl`}
            href={link}
            passHref
            key={link}
          >
            {icon}
          </Link>
        ))}
      </section>
      <section className="mb-4 w-9/12">
        <div className="text-2xl">
          <AiFillMessage />
        </div>
      </section>
    </nav>
  );
};
