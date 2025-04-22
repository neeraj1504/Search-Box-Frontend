export const vowels = {
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
  
export const consonants = {
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
  
export const matras = {
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
  
export function transliterateToHindi(input) {
    let results = [];
  
    function backtrack(res, index) {
      if (index >= input.length) {
        if (!(res in results)) results.push(res);
        return;
      }
  
      let str1 = input.slice(index, index + 1).toLowerCase();
      let str2 = input.slice(index, index + 2).toLowerCase();
      let str3 = input.slice(index, index + 3).toLowerCase();

      if(str1==" "){
        backtrack(res+" ",index+1);
      }
  
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
 