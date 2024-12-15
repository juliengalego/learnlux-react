import React, { useState, useEffect } from "react";
import { useDate } from "../mixins/dateMixin";
import Propositions from "./Propositions";
import { Title, Text } from "@mantine/core";
import Question from "./Question";
import { DateTime } from "luxon";

function formatDateToFrench(date: Date): string {
  // Convert the JavaScript Date to a Luxon DateTime
  const dt = DateTime.fromJSDate(date);

  // Format the date with the desired options
  return dt.setLocale("fr").toLocaleString({
    weekday: "long", // Full weekday (e.g., "Samedi")
    day: "numeric", // Day of the month (e.g., "15")
    month: "long", // Full month (e.g., "décembre")
    year: "numeric", // Year (e.g., "2024")
  });
}

interface QuestionType {
  libelle: string;
  valeur: Date;
  debutReponse: string;
}

const DateComponent: React.FC = () => {
  const { dateEnLettre } = useDate(); // Destructuring dateEnLettre function
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [devinette, setDevinette] = useState<string>("");
  const [restant, setRestant] = useState<string[]>([]);
  const [repondu, setRepondu] = useState<string>("____");
  const [liste, setListe] = useState<any[]>([]);
  const [index, setIndex] = useState<number>(-1);
  const [fake, setFake] = useState<string[]>([]);

  const questions: QuestionType[] = [
    {
      libelle: "Wat fir en Dag ass haut?",
      valeur: new Date(),
      debutReponse: "Haut ass",
    },
    {
      libelle: "Wat fir en Dag ass muer?",
      valeur: addDays(new Date(), 1),
      debutReponse: "Muer ass",
    },
    {
      libelle: "Wat fir en Dag ass iwwermuer ?",
      valeur: addDays(new Date(), 2),
      debutReponse: "Iwwermuer ass",
    },
    {
      libelle: "Wat fir en Dag war gëschter ?",
      valeur: addDays(new Date(), -1),
      debutReponse: "Gëschter war",
    },
    {
      libelle: "Wat fir en Dag war virgëschter ?",
      valeur: addDays(new Date(), -2),
      debutReponse: "Virgëschter war",
    },
    {
      libelle: "Wat fir en Dag ass et ?",
      valeur: randomDate(new Date(1950, 1, 1), new Date()),
      debutReponse: "Haut ass",
    },
    {
      libelle: "Weini ass Chrëschtdag ?",
      valeur: nextEvent(25, 12),
      debutReponse: "Chrëschtdag ass",
    },
    {
      libelle: "Weini fänkt de Summer ?",
      valeur: nextEvent(21, 6),
      debutReponse: "De Summer fänkt",
    },
    {
      libelle: "Weini fänkt de Hierscht ?",
      valeur: nextEvent(21, 9),
      debutReponse: "Den Hierscht fänkt",
    },
    {
      libelle: "Weini fänkt d'Fréijoer ?",
      valeur: nextEvent(21, 3),
      debutReponse: "D'Fréijoer fänkt",
    },
    {
      libelle: "Weini fänkt de Wanter ?",
      valeur: nextEvent(21, 12),
      debutReponse: "De Wanter fänkt",
    },
  ];

  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function nextEvent(jours: number, mois: number): Date {
    const year = new Date().getFullYear();
    let eventDate = new Date(year, mois - 1, jours);
    if (new Date() > eventDate) {
      eventDate = new Date(year + 1, mois - 1, jours);
    }
    return eventDate;
  }

  function randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  function getRandom(max: number, except: number): number {
    let tmp = null;
    do {
      tmp = Math.floor(Math.random() * max);
    } while (tmp === null || tmp === except);
    return tmp;
  }

  function newQuestion() {
    const nbPropMax = 15;
    const yearStart = 1950;

    const randomIndex = getRandom(questions.length, index);
    setIndex(randomIndex);
    const selectedQuestion = questions[randomIndex];
    setQuestion(selectedQuestion);

    const formattedAnswer = dateEnLettre(selectedQuestion.valeur);
    setDevinette(formatDateToFrench(selectedQuestion.valeur));
    setRestant([...formattedAnswer]);

    setRepondu("____".repeat(formattedAnswer.length));

    const fakeAnswers = [];
    for (let i = 0; i <= 3; i++) {
      const fakeDate = dateEnLettre(
        randomDate(new Date(yearStart, 1, 1), new Date())
      );
      fakeAnswers.push(...fakeDate);
    }

    const allAnswers = [...formattedAnswer, ...fakeAnswers];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

    const newList = shuffledAnswers.map((answer, i) => ({
      class: null,
      valeur: answer,
      index: i,
    }));

    setListe(newList);
    setFake(fakeAnswers);
  }

  function nextReponse() {
    const newRepondu = repondu.replace("____", restant[0]);
    setRepondu(newRepondu);
    const newRestant = [...restant];
    newRestant.splice(0, 1);
    setRestant(newRestant);

    if (newRestant.length === 0) {
      setTimeout(newQuestion, 1000);
    }
  }

  useEffect(() => {
    newQuestion();
  }, []);

  return (
    <div>
      {question && (
        <Question>
          <Title>{question.libelle}</Title>
          <Title order={2}>{devinette}</Title>
          <Text my="md" size={"lg"} fs={"xl"}>
            {question.debutReponse} {repondu}
          </Text>
        </Question>
      )}

      <Propositions
        liste={liste}
        reponse={restant[0]}
        onBonneReponse={nextReponse}
      />
    </div>
  );
};

export default DateComponent;
