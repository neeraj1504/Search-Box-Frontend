import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const Searchbox = ({ items, setItems }) => {
  useEffect(() => {
    setItems(items);
    console.log(items);
  }, [items]);

  const handleInputChange = (e) => {
    setItems(e.target.value);
  };

  return (
    <div className="flex items-center border border-gray-300 border-b-0 rounded-t-md px-4 py-2 shadow-md bg-white w-full max-w-md mx-auto">
      <FiSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        value={items}
        onChange={handleInputChange}
        className="flex-1 outline-none text-gray-700"
      ></input>
    </div>
  );
};

export default Searchbox;
