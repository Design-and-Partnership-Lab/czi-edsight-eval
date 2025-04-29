// components/Modal.tsx
import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {title && <h2 className="text-2xl mb-4">{title}</h2>}
        <div className="mb-6">{children}</div>
        <div className="flex w-full justify-end">
            <button
                className="
                bg-[#001F5B] text-white rounded-full px-8 py-3 font-medium
                shadow-lg hover:bg-[#002A7A] transition-colors duration-150
                "         
                onClick={onClose}
                >
                Continue
            </button>
        </div>
      </div>
    </div>
  );
}
