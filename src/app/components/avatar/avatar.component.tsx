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
  const getUsernameColor = (name: string): string => {
    const colors = [
      "bg-[#FF5733]",
      "bg-[#9B59B6]",
      "bg-[#3498DB]",
      "bg-[#2ECC71]",
      "bg-[#9B59B6]",
      "bg-[#1ABC9C]",
      "bg-[#F39C12]",
      "bg-[#8E44AD]",
      "bg-[#2980B9]",
      "bg-[#27AE60]",
      "bg-[#C0392B]",
      "bg-[#16A085]",
      "bg-[#F1C40F]",
      "bg-[#34495E]",
      "bg-[#D35400]",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };
  const usernameColor = getUsernameColor(username);
  console.log(usernameColor);
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
          className={`flex ${sizes} items-center justify-center rounded-full ${usernameColor}`}
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
