import Image from "next/image";
import React, { ReactNode } from "react";

export const LayoutLoginRegister = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <section className="flex w-full flex-col items-center justify-center md:border border-gray-600  md:w-auto">
        {children}
      </section>
    </main>
  );
};
