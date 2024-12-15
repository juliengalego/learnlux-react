import React, { useState, useEffect } from "react";
import Question from "./Question";
import Propositions from "./Propositions";
import { useNumber } from "../mixins/numberMixin";
import { Center, Slider, Text, Title } from "@mantine/core";

const Bubbles = () => {
  const [devinette, setDevinette] = useState(0);
  const [restant, setRestant] = useState<string[]>([]);
  const [repondu, setRepondu] = useState("");
  const [fake, setFake] = useState([]);
  const [liste, setListe] = useState([]);
  const [maxValue, setMaxValue] = useState(10);
  const nombreEnLettre = useNumber();

  const getRandom = (max, except) => {
    let tmp = null;
    do {
      tmp = Math.floor(Math.random() * max);
    } while (tmp === null || tmp === except);
    return tmp;
  };

  const newQuestion = () => {
    // nombre qui doit être trouvé
    const newDevinette = getRandom(maxValue, devinette);
    setDevinette(newDevinette);
    const newRestant = nombreEnLettre(newDevinette);
    setRestant(newRestant);

    // Placeholder pour la réponse
    let newRepondu = "";
    newRestant.forEach(() => (newRepondu += "____"));
    setRepondu(newRepondu);

    // phrase aléatoire en plus
    let newFake = [];
    for (let i = 0; i <= 3; i++) {
      const myFake = nombreEnLettre(getRandom(maxValue, newDevinette));
      newFake = newFake.concat(myFake);
    }
    setFake(newFake);

    // on mélange le tableau
    let tmp = [...newRestant];
    newFake.forEach((element) => {
      if (
        !tmp.includes(element) &&
        tmp.length < newDevinette.toString().length * 4
      ) {
        tmp.push(element);
      }
    });

    tmp.sort(() => Math.random() - 0.5);
    const newList = tmp.map((val, i) => ({
      class: null,
      valeur: val,
      index: i,
    }));
    setListe(newList);
  };

  const nextReponse = () => {
    const updatedRepondu = repondu.replace("____", restant[0]);
    setRepondu(updatedRepondu);
    const updatedRestant = [...restant];
    updatedRestant.splice(0, 1);
    setRestant(updatedRestant);

    if (updatedRestant.length === 0) {
      setTimeout(() => {
        newQuestion();
      }, 1000);
    }
  };

  useEffect(() => {
    newQuestion();
  }, []);

  return (
    <>
      <Center>
        <Question>
          <Slider
            mt="md"
            mb="lg"
            restrictToMarks
            maw={300}
            label={maxValue}
            min={10}
            max={999}
            marks={[
              { value: 10, label: "Facile" },
              { value: 200, label: "Moyen" },
              { value: 1000, label: "Difficile" },
            ]}
            value={maxValue}
            onChangeEnd={setMaxValue}
          />
          <Title>Comment dire: {devinette}</Title>
          <Text fs="lg" size="xl">
            {repondu}
          </Text>
        </Question>
      </Center>
      <Propositions
        liste={liste}
        reponse={restant[0]}
        onBonneReponse={nextReponse}
      />
    </>
  );
};

export default Bubbles;
