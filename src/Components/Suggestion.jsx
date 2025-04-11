import React, { useState } from "react";

const Suggestion = ({ items, setItems }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border border-t-0 border-gray-300 rounded-b-md max-h-48 overflow-y-auto bg-white shadow-md">
        {["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grapes"]
          .slice(0, 5)
          .map((item, index) => (
            <div
              onClick={() => setItems(item)}
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Suggestion;
