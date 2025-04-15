import React, { useEffect, useState } from "react";

const Suggestion = ({ items, setItems }) => {

  const hindiToEnglish = {
    अ: ["a"],
    आ: ["a", "aa"],
    इ: ["i"],
    ई: ["i", "ee"],
    उ: ["u"],
    ऊ: ["u", "oo"],
    ए: ["e"],
    ऐ: ["ai"],
    ओ: ["o"],
    औ: ["o", "au"],
    ख: ["kh", "kha"],
    घ: ["gh", "gha"],
    छ: ["chh", "chha"],
    च: ["ch", "cha"],
    झ: ["jh", "jha"],
    थ: ["th", "tha"],
    ध: ["dh", "dha"],
    फ: ["ph", "pha"],
    भ: ["bh", "bha"],
    श: ["sh", "sha"],
    क: ["k", "ka"],
    ग: ["g", "ga"],
    ज: ["j", "ja"],
    त: ["t", "ta"],
    ट: ["t", "ta"],
    द: ["d", "da"],
    ड: ["d", "da"],
    न: ["n", "na"],
    ण: ["n", "na"],
    प: ["p", "pa"],
    ब: ["b", "ba"],
    म: ["m", "ma"],
    य: ["y", "ya"],
    र: ["r", "ra"],
    ल: ["l", "la"],
    व: ["v", "va"],
    स: ["s", "sa"],
    ष: ["sh", "sha"],
    ह: ["h", "ha"],
    श्र: ["shra"],
    क्ष: ["ksha"],
    त्र: ["tra"],
    ज्ञ: ["gya"],
    ऋ: ["ri"],
    "ा": ["a", "aa"],
    "ि": ["i"],
    "ी": ["ee"],
    "ु": ["u"],
    "ू": ["oo"],
    "े": ["e", "ae"],
    "ै": ["ai"],
    "ो": ["o"],
    "ौ": ["au"],
    "ृ": ["ri"],
    "्": [""],
    " ँ": ["n"],
    "ं": ["n"],
  };
  
  function transliterateToEnglish(input) {
    let results = [];
  
    function backtrack(index, res) {
      if (index >= input.length) {
        results.push(res);
        return;
      }
  
      let char = input[index];
      for (let i = 0; i < hindiToEnglish[char].length; i++) {
        backtrack(index + 1, res + hindiToEnglish[char][i]);
      }
    }
  
    backtrack(0, "");
    return results;
  }

  const vowels = {
    a: ["अ", "आ"],
    aa: ["आ"],
    i: ["इ", "ई"],
    ee: ["ई"],
    u: ["उ", "ऊ"],
    oo: ["ऊ"],
    e: ["ए", "अ"],
    ai: ["ऐ"],
    o: ["ओ", "औ"],
    au: ["औ"],
  };
  
  const consonants = {
    kh: ["ख"],
    gh: ["घ"],
    chh: ["छ"],
    ch: ["च"],
    jh: ["झ"],
    th: ["थ"],
    dh: ["ध"],
    ph: ["फ"],
    bh: ["भ"],
    sh: ["श"],
    k: ["क"],
    g: ["ग"],
    j: ["ज"],
    t: ["त", "ट"],
    d: ["द", "ड"],
    n: ["न", "ण"],
    p: ["प"],
    b: ["ब"],
    m: ["म"],
    y: ["य"],
    r: ["र"],
    l: ["ल"],
    v: ["व"],
    s: ["स", "श"],
    h: ["ह"],
    ri: ["ऋ"],
  };
  
  const matras = {
    a: ["", "ा"],
    aa: ["ा"],
    i: ["ि"],
    ee: ["ी"],
    u: ["ु"],
    oo: ["ू"],
    e: ["े"],
    ai: ["ै"],
    o: ["ो"],
    au: ["ौ"],
  };
  
  function transliterateToHindi(input) {
    let results = [];
  
    function backtrack(res, index) {
      if (index >= input.length) {
        if (!(res in results)) results.push(res);
        return;
      }
  
      let str1 = input.slice(index, index + 1).toLowerCase();
      let str2 = input.slice(index, index + 2).toLowerCase();
      let str3 = input.slice(index, index + 3).toLowerCase();
  
      // vowel encounter in beginning
      if (index == 0 && (str1 in vowels || str2 in vowels)) {
        if (str2 in vowels) {
          // multiple mappings
          for (let j = 0; j < vowels[str2].length; j++) {
            backtrack(res + vowels[str2][j], index + 2);
          }
        } else {
          // multiple mappings
          for (let j = 0; j < vowels[str1].length; j++) {
            backtrack(res + vowels[str1][j], index + 1);
          }
        }
      }
  
      // vowel encounter in middle or end
      else if (str1 in vowels || str2 in vowels) {
        if (str2 in vowels) {
          // multiple mappings
          for (let j = 0; j < matras[str2].length; j++) {
            backtrack(res + matras[str2][j], index + 2);
          }
        } else {
          // multiple mappings
          for (let j = 0; j < matras[str1].length; j++) {
            backtrack(res + matras[str1][j], index + 1);
          }
        }
      }
  
      // consonant encounter
      else if (str1 in consonants || str2 in consonants || str3 in consonants) {
        if (str3 in consonants) {
          // multiple mappings
          for (let j = 0; j < consonants[str3][0].length; j++) {
            backtrack(res + consonants[str3][j], index + 3);
          }
        } else if (str2 in consonants) {
          // multiple mappings
          for (let j = 0; j < consonants[str2].length; j++) {
            backtrack(res + consonants[str2][j], index + 2);
          }
        } else {
          // multiple mappings
          for (let j = 0; j < consonants[str1].length; j++) {
            backtrack(res + consonants[str1][j], index + 1);
          }
        }
      }
    }
  
    backtrack("", 0);
    if (results.length === 0) {
      return "No valid transliteration found";
    }
    return results;
  }
 
  const [suggestionsArray, setSuggestionsArray] = useState([]);
  // let results=[];
  useEffect(()=>{
      // setSuggestionsArray([]);
      let prefix=items;
      let transiteratedPrefix="";
      if (prefix && prefix.length > 0) {
      if(prefix[0] in hindiToEnglish){
        transiteratedPrefix=transliterateToEnglish(prefix);
      }
      else{
        transiteratedPrefix=transliterateToHindi(prefix);
      }
    }

      let queryPrefix=`${prefix},${transiteratedPrefix}`;

     fetch(`http://localhost:8000/api/v1/getWords?prefix=${queryPrefix}`)
     .then((res)=>res.json()
     ).then((res)=>{
        if(items){
          setSuggestionsArray(res.data);
        }
     })

      console.log(transiteratedPrefix);
      

  },[items])
  
 




  return (
    <div className="w-full max-w-md mx-auto h-auto">
      <div className="border border-t-0 border-gray-300 rounded-b-md h-auto overflow-y-auto bg-white shadow-md">
        {suggestionsArray
          .map((item, index) =>{return (
            <div
              onClick={() => setItems(item)}
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