export const applyNRule = (mot: string, motSuivant: string): string => {
  const excludedLetters = ["U", "N", "I", "T", "E", "D", "Z", "O", "A", "H"];
  const firstChar = motSuivant.charAt(0).toUpperCase();

  if (!excludedLetters.includes(firstChar)) {
    const lastChar = mot.charAt(mot.length - 1).toUpperCase();
    if (lastChar === "N") {
      mot = mot.slice(0, -1); // Remove the last character
    }
  }

  return mot;
};
