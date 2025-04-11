// import React, { useState } from "react";

// const Transliterator = () => {
//   const [hindiInput, setHindiInput] = useState("");
//   const [englishInput, setEnglishInput] = useState("");

//   const hindiToEnglishMap = {
//     "अ": "a", "आ": "aa", "इ": "i", "ई": "ee", "उ": "u", "ऊ": "oo", "ऋ": "ri",
//     "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au",
//     "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "ng",
//     "च": "ch", "छ": "chh", "ज": "j", "झ": "jh", "ञ": "ny",
//     "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh", "ण": "n",
//     "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
//     "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
//     "य": "y", "र": "r", "ल": "l", "व": "v",
//     "श": "sh", "ष": "sh", "स": "s", "ह": "h",
//     "ा": "aa", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo",
//     "े": "e", "ै": "ai", "ो": "o", "ौ": "au",
//     "ं": "n", "ः": "h", "ँ": "n",
//     "्": ""
//   };
  

//   const englishToHindiMap = {};
//   Object.entries(hindiToEnglishMap).forEach(([key, value]) => {
//     if (value) englishToHindiMap[value] = key;
//   });

//   const englishChunks = Object.keys(englishToHindiMap).sort((a, b) => b.length - a.length);

//   const transliterateHindiToEnglish = (text) => {
//     let result = "";
//     for (let i = 0; i < text.length; i++) {
//       let ch = text[i];
//       let nextCh = text[i + 1];

//       let mapped = hindiToEnglishMap[ch] || ch;

//       if (nextCh && "ािीुूेैोौंःँ".includes(nextCh)) {
//         mapped += hindiToEnglishMap[nextCh] || "";
//         i++;
//       }

//       result += mapped;
//     }
//     return result;
//   };

//   const transliterateEnglishToHindi = (text) => {
//     let result = "";
//     let i = 0;
//     while (i < text.length) {
//       let matched = false;
//       for (let chunk of englishChunks) {
//         if (text.substring(i, i + chunk.length).toLowerCase() === chunk) {
//           result += englishToHindiMap[chunk];
//           i += chunk.length;
//           matched = true;
//           break;
//         }
//       }
//       if (!matched) {
//         result += text[i];
//         i++;
//       }
//     }
//     return result;
//   };

//   const handleHindiChange = (e) => {
//     const val = e.target.value;
//     setHindiInput(val);
//     setEnglishInput(transliterateHindiToEnglish(val));
//   };

//   const handleEnglishChange = (e) => {
//     const val = e.target.value;
//     setEnglishInput(val);
//     setHindiInput(transliterateEnglishToHindi(val));
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 space-y-6">
//       <h2 className="text-2xl font-bold text-center">Hindi ⇄ English Transliterator</h2>

//       <div>
//         <label className="block font-semibold mb-1">Type in Hindi</label>
//         <textarea
//           value={hindiInput}
//           onChange={handleHindiChange}
//           rows={3}
//           className="w-full p-2 border rounded"
//           placeholder="नमस्ते"
//         />
//       </div>

//       <div>
//         <label className="block font-semibold mb-1">Type in English</label>
//         <textarea
//           value={englishInput}
//           onChange={handleEnglishChange}
//           rows={3}
//           className="w-full p-2 border rounded"
//           placeholder="namaste"
//         />
//       </div>
//     </div>
//   );
// };

// export default Transliterator;

import React, { useState } from "react";

// Consonant mappings
const consonantMap = {
  kh: "ख", gh: "घ", chh: "छ", jh: "झ", th: "थ", dh: "ध",
  ph: "फ", bh: "भ", sh: "श", tr: "त्र", gn: "ज्ञ",
  k: "क", g: "ग", ch: "च", j: "ज", t: "त", d: "द",
  n: "न", p: "प", b: "ब", m: "म", y: "य", r: "र",
  l: "ल", v: "व", s: "स", h: "ह", z: "ज़", ṛ: "ड़"
};

// Independent vowels (used at word start or without consonant)
const vowelMap = {
  ai: "ऐ", au: "औ", aa: "आ", ee: "ई", oo: "ऊ",
  a: "अ", i: "इ", u: "उ", e: "ए", o: "ओ"
};

// Dependent matras (used with consonants)
const matraMap = {
  a: "", aa: "ा", i: "ि", ee: "ी", u: "ु", oo: "ू",
  e: "े", ai: "ै", o: "ो", au: "ौ"
};

// Sort keys by length (longest first) to match chunks properly
const chunkOrder = (obj) =>
  Object.keys(obj).sort((a, b) => b.length - a.length);

const Transliterator = () => {
  const [english, setEnglish] = useState("");
  const [hindi, setHindi] = useState("");

  const consonantChunks = chunkOrder(consonantMap);
  const vowelChunks = chunkOrder(vowelMap);

  const transliterate = (input) => {
    let output = "";
    let i = 0;
    let lastConsonant = "";

    while (i < input.length) {
      let matched = false;

      // Match consonants
      for (let chunk of consonantChunks) {
        if (input.slice(i, i + chunk.length).toLowerCase() === chunk) {
          lastConsonant = consonantMap[chunk];
          output += lastConsonant;
          i += chunk.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;

      // Match vowels
      for (let chunk of vowelChunks) {
        if (input.slice(i, i + chunk.length).toLowerCase() === chunk) {
          const matra = matraMap[chunk];
          if (lastConsonant && matra !== "") {
            output = output.slice(0, -1) + lastConsonant + matra;
          } else {
            output += vowelMap[chunk];
          }
          lastConsonant = "";
          i += chunk.length;
          matched = true;
          break;
        }
      }

      // Fallback for unmatched characters
      if (!matched) {
        output += input[i];
        lastConsonant = "";
        i++;
      }
    }

    return output;
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setEnglish(val);
    setHindi(transliterate(val));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        🔤 English → Hindi Transliterator
      </h2>
      <textarea
        className="w-full p-2 border rounded mb-3"
        rows={3}
        placeholder="Type in English (e.g. neeraj, namaste, krishna)"
        value={english}
        onChange={handleChange}
      />
      <textarea
        className="w-full p-2 border rounded bg-gray-100"
        rows={3}
        value={hindi}
        readOnly
      />
    </div>
  );
};

export default Transliterator;
