export function transliterateArabicToEnglish(text: string): string {
  const map: { [key: string]: string } = {
    "ا": "a",
    "ب": "b",
    "ت": "t",
    "ث": "th",
    "ج": "j",
    "ح": "h",
    "خ": "kh",
    "د": "d",
    "ذ": "dh",
    "ر": "r",
    "ز": "z",
    "س": "s",
    "ش": "sh",
    "ص": "s",
    "ض": "d",
    "ط": "t",
    "ظ": "z",
    "ع": "a",
    "غ": "gh",
    "ف": "f",
    "ق": "q",
    "ك": "k",
    "ل": "l",
    "م": "m",
    "ن": "n",
    "ه": "h",
    "و": "w",
    "ي": "y",
    "ء": "'",
    "أ": "a",
    "إ": "i",
    "ؤ": "w",
    "ئ": "y",
    "ى": "a",
    "ة": "h",
  };

  text=text.trim();
  return text
    .split("")
    .map(char => char === " " ? "-" : (map[char] !== undefined ? map[char] : char))
    .join("");
}
