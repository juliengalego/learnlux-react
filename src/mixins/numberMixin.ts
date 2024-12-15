import { applyNRule } from "./NRegel";
export const chiffres = [
  ["null"],
  ["enn"],
  ["zwee"],
  ["dräi"],
  ["véier"],
  ["fënnef"],
  ["sechs"],
  ["siwen"],
  ["aacht"],
  ["néng"],
  ["zéng"],
  ["eelef"],
  ["zwielef"],
  ["dräi", "zéng"],
  ["véier", "zéng"],
  ["fof", "zéng"],
  ["siech", "zéng"],
  ["siwen", "zéng"],
  ["uecht", "zéng"],
  ["non", "zéng"],
];

const dizaines = [
  ["zwan", "zeg"],
  ["dressëg"],
  ["véier", "zeg"],
  ["fof", "zeg"],
  ["sech", "zeg"],
  ["siwen", "zeg"],
  ["acht", "zeg"],
  ["non", "zeg"],
];

// Function to convert numbers less than 100
export const nombreEnLettreInf100 = (valeur: number): string[] => {
  let nombre = valeur;
  let result: string[] = [];

  if (nombre === 1) {
    result.push("eent");
    return result;
  } else if (nombre >= 20) {
    const dizaine = Math.floor(nombre / 10);
    result = [...dizaines[dizaine - 2]];
    nombre -= dizaine * 10;
    if (nombre > 0) {
      result.unshift(applyNRule("an", result[0]));
    }
  }

  if (nombre > 0) {
    result = [...chiffres[nombre]].concat(result);
  }

  return result;
};

// hooks/useNumber.ts
export const useNumber = () => {
  // Function to convert a number to words
  const nombreEnLettre = (valeur: number): string[] => {
    let nombre = valeur;
    let result: string[] = [];

    if (nombre === 0) {
      result.push("null");
      return result;
    }

    if (nombre >= 1000000) {
      // Logic for million could be added here
    }

    if (nombre >= 1000) {
      result.push("honnert");
    }

    const centaines = Math.floor(nombre / 100);

    if (nombre >= 200) {
      result = result.concat(chiffres[centaines]);
      result.push("honnert");
      nombre -= centaines * 100;
    } else if (nombre >= 100) {
      result.unshift("honnert");
      nombre -= centaines * 100;
    }

    result = result.concat(nombreEnLettreInf100(nombre));
    return result;
  };

  return nombreEnLettre; // Just return the nombreEnLettre function
};
