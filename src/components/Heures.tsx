import React, { useState, useEffect } from "react";
import { Container, Grid, Text, Button, Group, Title } from "@mantine/core";
import { heureEnLettre } from "../mixins/heureMixin";
import Proposition from "./Propositions";

// Function to generate a random number excluding a specific one
const getRandom = (max: number, except: number) => {
  let tmp = null;
  do {
    tmp = Math.floor(Math.random() * max);
  } while (tmp === null || tmp === except);
  return tmp;
};

// Main component for handling the game logic
const Heures = () => {
  const [devinette, setDevinette] = useState<string>("0");
  const [repondu, setRepondu] = useState<string>("");
  const [restant, setRestant] = useState<string[]>([]);
  const [fake, setFake] = useState<string[]>([]);
  const [liste, setListe] = useState<
    { class: string | null; valeur: string; index: number }[]
  >([]);

  // Generate a new random question
  const newQuestion = () => {
    const nbPropMax = 10;
    const heures = getRandom(24, parseInt(devinette.split(":")[0]));
    const minutesMultiplier = getRandom(12, -1);
    const minutes = minutesMultiplier * 5;

    // Set the time in the devinette
    const formattedTime =
      `0${heures}`.slice(-2) + ":" + `0${minutes}`.slice(-2);
    setDevinette(formattedTime);

    // Convert the time to words
    const words = heureEnLettre(heures, minutes);
    setRestant(words);

    // Create placeholder for the response
    setRepondu(words.map(() => "____").join(""));

    // Add fake answers
    let newFake = [];
    for (let i = 0; i <= 3; i++) {
      const fakeMinutesMultiplier = getRandom(12, minutesMultiplier);
      const myFake = heureEnLettre(
        heures + Math.min(i, 1),
        fakeMinutesMultiplier * 5
      );
      newFake = newFake.concat(myFake);
    }

    // Shuffle and limit the answers
    const tmp = [...words];
    newFake.forEach((element) => {
      if (!tmp.includes(element) && tmp.length < nbPropMax) tmp.push(element);
    });

    tmp.sort(() => Math.random() - 0.5);
    setListe(tmp.map((valeur, index) => ({ class: null, valeur, index })));
  };

  // Handle the correct answer
  const nextReponse = () => {
    setRepondu(repondu.replace("____", restant[0] + " "));
    setRestant((prevRestant) => prevRestant.slice(1));

    if (restant.length === 1) {
      setTimeout(newQuestion, 1000); // New question after a delay
    }
  };

  // Initial question generation
  useEffect(() => {
    newQuestion();
  }, []);

  return (
    <>
      <Grid justify="center" ta="center">
        <Grid.Col span={12}>
          <Title ta="center" fw={500}>
            Wéi vill Auer ass et?
          </Title>
          <Text ta="center" size="xl">
            {devinette}
          </Text>
        </Grid.Col>

        <Grid.Col span={12}>
          <Text ta="center">{`Et ass ${repondu}`}</Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Group gap="xs" align="center">
            <Proposition
              liste={liste}
              reponse={restant[0]}
              onBonneReponse={nextReponse}
            />
          </Group>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Heures;
