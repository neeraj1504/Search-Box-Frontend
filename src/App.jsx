import React, { useState } from "react";
import Searchbox from "./Components/Searchbox.jsx";
import Suggestion from "./Components/Suggestion.jsx";


const App = () => {
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 pt-10 px-4">
      <Searchbox inputText={inputText} setInputText={setInputText} />
      <Suggestion inputText={inputText} setSuggestions={setSuggestions} />
      
    </div>
  );
};

export default App;
