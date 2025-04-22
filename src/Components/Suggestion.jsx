import React, { useEffect, useState } from "react";
import { hindiToEnglishUtil } from "../Utils";
import { englishToHindiUtil } from "../Utils";

const Suggestion = ({ items, setItems }) => {

  const [suggestionsArray, setSuggestionsArray] = useState([]);
  useEffect(()=>{
      let prefix=items;
      let transiteratedPrefix="";
    if (prefix && prefix.length > 0) {
      if(prefix[0] in hindiToEnglishUtil.hindiToEnglish){
        transiteratedPrefix=hindiToEnglishUtil.transliterateToEnglish(prefix);
      }
      else{
        transiteratedPrefix=englishToHindiUtil.transliterateToHindi(prefix);
      }
    }
  

      let queryPrefix=`${prefix},${transiteratedPrefix}`;
      //TO handle the trailing spaces in the query string
     fetch(`http://localhost:8000/api/v1/getWords?prefix=${encodeURIComponent(queryPrefix)}`)
     .then((res)=>res.json()
     ).then((res)=>{
        if(items&&transiteratedPrefix.length
        ){
          setSuggestionsArray(res.data);
        }
        else{
          //To remove the persisiting suggestions from the div after the input box set to empty
          setSuggestionsArray([]);
        }
     })

      console.log(transiteratedPrefix);
      console.log(prefix);
      

  },[items])
  
 
//To add the clicked suggestion in the input box
const handleClick = (e)=>{
  setItems(e.target.innerHTML);
}


  return (
    <div className="w-full max-w-md mx-auto h-auto">
      <div className="border border-t-0 border-gray-300 rounded-b-md h-auto overflow-y-auto bg-white shadow-md">
        {suggestionsArray
          .map((item, index) =>{return (
            <div
              onClick={handleClick}
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.word}
            </div>
          )})}
      </div>
    </div>
  );
};

export default Suggestion;



//   "्": [""],