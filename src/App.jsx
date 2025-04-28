import React, { useState } from "react";
import Searchbox from "./Components/Searchbox.jsx";
import Suggestion from "./Components/Suggestion.jsx";
const App = () => {
  const[items,setItems]=useState("");
  

  return (
    //Added some extra css like bg color 
    <div className="flex flex-col items-center justify-start min-h-screen overflow-y-auto pt-10 px-4 bg-indigo-200">
      <Searchbox items={items} setItems={setItems} />
      <Suggestion items={items} setItems={setItems} />
    </div>
  );
};

export default App;
