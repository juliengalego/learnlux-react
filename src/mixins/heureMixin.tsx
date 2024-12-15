import { useNumber } from "./numberMixin";

// Function to convert hours and minutes to Luxembourgish words
export const heureEnLettre = (heure: number, minutes: number): string[] => {
  const nombreEnLettre = useNumber(); // Use the custom number-to-words hook

  const heures: string[][] = [
    [""],
    ["eng"],
    ["zwou"],
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
  ];

  let result: string[] = [];

  // Handle minute logic
  if (minutes >= 25) heure++; // Round up the hour if minutes are 25 or more
  if (minutes === 30) {
    result.push("hallwer");
  } else if (minutes === 25) {
    result.push("fënnef", "vir", "hallwer");
  } else if (minutes === 35) {
    result.push("fënnef", "op", "hallwer");
  } else if (minutes === 15) {
    result.push("Véierel", "op");
  } else if (minutes === 45) {
    result.push("Véierel", "vir");
  } else if (minutes > 30) {
    result.push(
      nombreEnLettre(60 - minutes)
        .join("")
        .toLowerCase() // Convert remaining minutes
    );
  } else if (minutes > 0) {
    result.push(
      nombreEnLettre(minutes).join("").toLowerCase() // Convert minutes
    );
  }

  // Handle hour logic (formatting 12-hour clock)
  if (heure > 12) heure = heure - 12; // Handle 24-hour to 12-hour conversion
  result = result.concat(heures[heure]); // Add the hour in Luxembourgish
  if (minutes === 0) {
    result.push("Auer"); // Add "Auer" if minutes are zero (e.g., "2 Auer")
  }

  return result;
};
