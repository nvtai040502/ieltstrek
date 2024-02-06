// components/TextToolbar.js
import React from "react";

const TextToolbar = () => {
  return (
    <div className="text-toolbar bg-gray-800 p-2 text-white">
      {/* Add your Tailwind-styled toolbar buttons and actions here */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Bold
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Italic
      </button>
      {/* Add more buttons as needed */}
    </div>
  );
};

export default TextToolbar;
