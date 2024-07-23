import React, { ReactNode } from "react";
import { Conversations } from "./components/conversations/conversations";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className="md:flex">
      <Conversations />
      <section className="w-full">{children}</section>
    </main>
  );
}
