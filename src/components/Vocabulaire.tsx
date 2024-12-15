import React, { useState, useEffect } from "react";
import Propositions from "./Propositions";
import Question from "./Question";

// Define types for our component state
interface VocabulaireComponentProps {}

const VocabulaireComponent: React.FC<VocabulaireComponentProps> = () => {
  const [difficulte, setDifficulte] = useState<number>(1); // Difficulty level (1, 2, or 3)
  const [devinette, setDevinette] = useState<any>({}); // The current word and its translation
  const [repondu, setRepondu] = useState<string>(""); // The current answer placeholder
  const [restant, setRestant] = useState<string[]>([]); // The parts of the word to guess
  const [fake, setFake] = useState<string[]>([]); // Fake answers for the propositions
  const [liste, setListe] = useState<any[]>([]); // The list of options (both correct and fake)

  const mots = [
    { valeur: "Patate", traduction: "D' Gromper" },
    // Add more words if necessary
  ];

  // Utility function to get a random index
  const getRandom = (max: number, except: number): number => {
    let tmp = null;
    do {
      tmp = Math.floor(Math.random() * max);
    } while (tmp === except);
    return tmp;
  };

  // Function to create a new question based on difficulty
  const newQuestion = () => {
    const nbPropMax = 10;

    // Reset remaining parts and fake answers
    setRestant([]);
    setFake([]);

    // Select a random word and its translation
    const randomIndex = getRandom(mots.length, -1);
    const word = mots[randomIndex];

    setDevinette(word);

    // Split the translation into parts based on difficulty
    if (difficulte === 1) {
      setRestant(word.traduction.split(" "));
    } else if (difficulte === 2) {
      setRestant(
        word.traduction
          .split(" ")
          .flatMap((part) => part.match(/.{1,3}/g) || [])
      );
    } else if (difficulte === 3) {
      setRestant([...word.traduction]);
    }

    // Generate the answer placeholder
    let placeholder = "";
    restant.forEach((part) => {
      part.split("").forEach((e) => {
        placeholder += e === " " ? " " : "_";
      });
    });
    setRepondu(placeholder);

    // Mix in some fake answers
    const tmp = [...restant];
    fake.forEach((element) => {
      if (!tmp.includes(element) && tmp.length < nbPropMax) {
        tmp.push(element);
      }
    });

    tmp.sort(() => Math.random() - 0.5);

    // Set the list of options
    setListe(
      tmp.map((value, i) => ({
        class: null,
        valeur: value,
        index: i,
      }))
    );
  };

  // Function to handle answering a part of the word
  const nextReponse = () => {
    const updatedRepondu = restant[0] + repondu.substring(restant[0].length);
    setRepondu(updatedRepondu);
    const updatedRestant = [...restant];
    updatedRestant.splice(0, 1);
    setRestant(updatedRestant);

    // If all parts have been guessed, generate a new question
    if (updatedRestant.length === 0) {
      setTimeout(() => newQuestion(), 1000);
    }
  };

  // Handle difficulty change (triggered by the rating)
  const handleDifficulteChange = (newDifficulte: number) => {
    setDifficulte(newDifficulte);
    newQuestion(); // Regenerate the question when difficulty changes
  };

  // Component mounted
  useEffect(() => {
    newQuestion();
  }, []); // Only run once when the component mounts

  return (
    <div>
      {/* Show development alert */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <div
          style={{ padding: "10px", backgroundColor: "orange", color: "white" }}
        >
          En développement
        </div>
      </div>

      {/* Question Component */}
      <Question>
        <div slot="question">
          {/* Rating for difficulty */}
          <div>
            <span className="title font-weight-light text-center">
              Choisir la difficulté
            </span>
            <div>
              <span
                style={{
                  cursor: "pointer",
                  color: difficulte >= 1 ? "red" : "gray",
                }}
                onClick={() => handleDifficulteChange(1)}
              >
                ⭐
              </span>
              <span
                style={{
                  cursor: "pointer",
                  color: difficulte >= 2 ? "red" : "gray",
                }}
                onClick={() => handleDifficulteChange(2)}
              >
                ⭐⭐
              </span>
              <span
                style={{
                  cursor: "pointer",
                  color: difficulte >= 3 ? "red" : "gray",
                }}
                onClick={() => handleDifficulteChange(3)}
              >
                ⭐⭐⭐
              </span>
            </div>
          </div>
        </div>
        <div>{devinette.valeur}</div>
        <div slot="reponse">{repondu}</div>
      </Question>

      {/* Propositions Component for selecting the answer */}
      <Propositions
        liste={liste}
        reponse={restant[0]}
        onBonneReponse={nextReponse}
      />
    </div>
  );
};

export default VocabulaireComponent;
