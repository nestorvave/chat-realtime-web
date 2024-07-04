import React from "react";

export default function layout({ children }: { children: any }) {
  return (
    <>
      <nav className="h-12 w-full bg-main"></nav>
      <main className="bg-[#0C111D] max-h-full overflow-auto">{children}</main>
    </>
  );
}
