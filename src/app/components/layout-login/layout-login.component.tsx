import Image from "next/image";
import React, { ReactNode } from "react";

export const LayoutLoginRegister = ({children}:{children:ReactNode}) => {
  return (
    <main className="w-full flex">
      <section className="w-full gap-8 flex flex-col items-center h-[90vh] justify-center md:w-1/2">
        {children}
      </section>
      <section className="w-1/2 h-[100vh] relative">
        <Image
          src="/bg.jpg"
          alt="Descripción de la imagen"
          layout="fill"
          objectFit="cover"
        />
      </section>
    </main>
  );
};
