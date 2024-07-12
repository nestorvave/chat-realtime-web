import React, { ReactNode } from "react";
import { ActionsBar } from "./(components)/components/actions-bar/actions-bar.component";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex">
      <ActionsBar />
      <section className="w-full">{children}</section>
    </main>
  );
}
