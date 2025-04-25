import React, { useEffect, useState } from "react";

const Suggestion = ({ items, setItems }) => {

  const [suggestionsArray, setSuggestionsArray] = useState([]);
  useEffect(() => {
    let prefix = items;
    //To handle the trailing spaces in the query string encodeURIComponent was added
    if (prefix) {
      fetch(`http://localhost:8000/api/v1/getWords?prefix=${encodeURIComponent(prefix)}`)

        .then((res) => res.json()
        ).then((res) => {
          const newArray = [];

          res.data.map((element) => {
            newArray.push(element.word);
            // element.transliterations.map((transWord) => {
            //   newArray.push(transWord);
            // })
            newArray.push(...element.transliterations);
          });
          return newArray;
        }).then((res) => {
          setSuggestionsArray(res);
        })
    }
    else {
      setSuggestionsArray([]);
    }

    console.log(prefix);


  }, [items])


  //To add the clicked suggestion in the input box
  const handleClick = (e) => {
    setItems(e.target.innerHTML);
  }


  return (
    <div className="w-full max-w-md mx-auto h-auto">
      <div className="border border-t-0 border-gray-300 rounded-b-md max-h-screen overflow-y-auto bg-white shadow-md">
        {suggestionsArray
          .map((item, index) => {
            return (
              <div
                onClick={handleClick}
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </div>
            )
          })}
      </div>
    </div>
  );
};

export default Suggestion;



//   "्": [""],