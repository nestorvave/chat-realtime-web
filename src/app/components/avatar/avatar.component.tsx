import Image from "next/image";
import React from "react";

interface IAvatar {
  avatarUrl: string;
  username: string;
  width?: number;
  height?: number;
  online?: boolean | null;
}

export const Avatar = ({
  avatarUrl,
  username,
  height,
  width,
  online = null,
}: IAvatar) => {
  const getInitials = (name: string): string => {
    const names = name.split(" ");
    console.log(names);
    return names.map((name) => name.charAt(0).toUpperCase()).join("");
  };
  return (
    <div className="relative inline-block">
      {avatarUrl ? (
        <>
          <Image
            src={
              avatarUrl 
            }
            alt={`${username} avatar`}
            className={"h-14 w-14 rounded-full"}
            width={width || 400}
            height={height || 500}
          />
        </>
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-300 text-gray-600">
          <span className="text-xl">{getInitials(username)}</span>
        </div>
      )}
      {online !== null && (
        <span
          className={`absolute top-0 right-0 h-4 w-4 rounded-full border border-black ${online ? "bg-green-600" : "bg-red-600"}`}
        ></span>
      )}
    </div>
  );
};
