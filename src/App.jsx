import React, { useState } from "react";
import Searchbox from "./Components/Searchbox.jsx";
import Suggestion from "./Components/Suggestion.jsx";
const App = () => {
  const[items,setItems]=useState("");
  

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 pt-10 px-4">
      <Searchbox items={items} setItems={setItems} />
      <Suggestion items={items} setItems={setItems} />
    </div>
  );
};

export default App;
