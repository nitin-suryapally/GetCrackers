  // components/Popup.tsx
  "use client";
  import React from "react";

  interface PopupProps {
    message: string;
    onClose: () => void;
  }

  const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded shadow-md">
          <p className="text-center text-black">{message}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  export default Popup;
