import Image from "next/image";
import React from "react";

interface IAvatar {
  avatarUrl: string;
  username: string;
  width?: number;
  height?: number;
  size?: string;
  online?: boolean | null;
}

export const Avatar = ({
  avatarUrl,
  username,
  height,
  width,
  online = null,
  size = "",
}: IAvatar) => {
  const getInitials = (name: string): string => {
    const names = name?.split(" ");
    return names?.map((name) => name.charAt(0).toUpperCase()).join("");
  };

  const sizes = `h-${size || "14"} w-${size || "14"}`;


  console.log(username)

  return (
    <div className="relative inline-block">
      {avatarUrl ? (
        <>
          <Image
            src={avatarUrl}
            alt={`${username} avatar`}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "56px", height: "56px" }}
            className="rounded-full" // optional
          />
        </>
      ) : (
        <div
          className={`flex ${sizes} items-center justify-center rounded-full bg-gray-300 text-gray-600`}
        >
          <span className="text-xl">{getInitials(username)}</span>
        </div>
      )}
      {online !== null && (
        <span
          className={`absolute right-0 top-0 h-4 w-4 rounded-full border border-black ${online ? "bg-green-600" : "bg-red-600"}`}
        ></span>
      )}
    </div>
  );
};
