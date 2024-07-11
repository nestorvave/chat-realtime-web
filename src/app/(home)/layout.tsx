import React from "react";
import { ActionsBar } from "./(components)/components/actions-bar/actions-bar.component";

export default function layout({ children }: { children: any }) {
  return (
    <main className="flex">
      <ActionsBar />
      <section className="w-full">{children}</section>
    </main>
  );
}
