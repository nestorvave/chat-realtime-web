import React, { ReactNode } from "react";
import { ActionsBar } from "./components/actions-bar/actions-bar.component";
import { AppWrapper } from "./context/socket.context";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <AppWrapper>
      <main className="flex w-screen max-w-screen">
        <ActionsBar />
        <section className="w-full">{children}</section>
      </main>
    </AppWrapper>
  );
}
