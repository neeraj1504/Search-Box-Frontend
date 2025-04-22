export const hindiToEnglish = {
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
    " ँ": ["n"],
    "ं": ["n"]

  };
  
 export function transliterateToEnglish(input) {
    let results = [];
  
    function backtrack(index, res) {
      if (index >= input.length) {
        results.push(res);
        return;
      }
  
      let char = input[index];
      //To handle the space character
      if(char!=" "){
      for (let i = 0; i < hindiToEnglish[char].length; i++) {
        backtrack(index + 1, res + hindiToEnglish[char][i]);
      }
    }else{
      backtrack(index + 1, res + " ");
    }
    
    }
  
    backtrack(0, "");
    return results;
  }