import React, { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

import Button from "../button/custom-button.component";

interface IModal {
  title: string;
  subtitle: string;
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
  open: boolean;
}

export const Modal = ({
  title,
  subtitle,
  children,
  onClose,
  onSave,
  open,
}: IModal) => {
  return (
    <>
      {open && (
        <main className="fixed left-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-900 bg-opacity-80">
          <section className="relative max-h-full w-full max-w-2xl p-4">
            <section className="relative rounded-lg bg-mainDark p-5 shadow">
              <section className="item flex justify-between gap-3 rounded-t p-4 md:p-5">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-white">{title}</h3>
                  <h3 className="text-white">{subtitle}</h3>
                </div>
                <span
                  onClick={onClose}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-grayDark hover:bg-grayDark hover:text-white"
                >
                  <IoClose className="text-xl" />
                </span>
              </section>
              {children}
              <section className="flex items-center justify-end rounded-b border-t border-gray-200 p-4 pt-7">
                <div className="flex w-8/12 gap-2">
                  <Button
                    label="Cancel"
                    id="cancel"
                    onClick={onClose}
                    variant="white"
                  />
                  <Button
                    label="Create"
                    id="crete"
                    onClick={onSave}
                    variant="dark"
                  />
                </div>
              </section>
            </section>
          </section>
        </main>
      )}
    </>
  );
};
