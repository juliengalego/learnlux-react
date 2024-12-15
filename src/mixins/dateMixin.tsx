import { applyNRule } from "./NRegel";
import { chiffres, nombreEnLettreInf100, useNumber } from "./numberMixin"; // Assumes useNumber provides nombreEnLettreInf100 and other utilities

export const useDate = () => {
  const jours = [
    "Sonndeg",
    "Méindeg",
    "Dënschdeg",
    "Mëttwoch",
    "Donneschdeg",
    "Freideg",
    "Samschdeg",
  ];

  const mois = [
    "Januar",
    "Februar",
    "Mäerz",
    "Abrëll",
    "Mee",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const numeros = [
    "",
    "éischten",
    "zweeten",
    "drëtten",
    "véierten",
    "fënnefen",
    "sechsten",
    "siwenten",
    "aachten",
    "néngten",
    "zéngten",
    "eeleften",
    "zwieleften",
    "dräizéngten",
    "véierzéngten",
    "fofzéngten",
    "siechzéngten",
    "siwwenzéngten",
    "uechtzéngten",
    "nonzéngten",
    "zwanzegsten",
    "eenanzwanzegsten",
    "zweeanzwanzegsten",
    "dräianzwanzegsten",
    "véieranzwanzegsten",
    "fënnefanzwanzegsten",
    "sechsanzwanzegsten",
    "siwenanzwanzegsten",
    "aachtanzwanzegsten",
    "nénganzwanzegsten",
    "dressëgsten",
    "eenandressëgsten",
  ];

  const anneeEnLettre = (valeur: number): string[] => {
    let nombre = valeur;
    const result: string[] = [];

    if (nombre >= 2000) {
      result.push("zweedausend");
      nombre -= 2000;
    } else {
      const centaines = Math.floor(nombre / 100);
      result.push(chiffres[centaines].join(""));
      result.push("honnert");
      nombre -= centaines * 100;
    }

    result.push(nombreEnLettreInf100(nombre).join(""));
    return result;
  };

  const dateEnLettre = (valeur: Date): string[] => {
    const result: string[] = [];
    const moisName = mois[valeur.getMonth()];
    const jourName = jours[valeur.getDay()];
    const numero = numeros[valeur.getDate()];
    const year = valeur.getFullYear();
    const anneeLettre = anneeEnLettre(year);

    result.push(`${jourName}, `);
    result.push(applyNRule("den", numero) + " ");
    result.push(applyNRule(numero, moisName) + " ");
    result.push(applyNRule(moisName, anneeLettre[0]) + " ");
    result.push(...anneeLettre);

    return result;
  };

  return {
    anneeEnLettre,
    dateEnLettre,
  };
};
