import React, { useEffect, useState } from "react";
import Numbers from "./components/Numbers";
import Dates from "./components/Dates";
import Heures from "./components/Heures";
import Vocabulaire from "./components/Vocabulaire";
import { MantineProvider, Container, Select, Button } from "@mantine/core";
import "@mantine/core/styles.css";

// Enum for exercise types
const ExerciseType = {
  NONE: "NONE", // No exercise selected
  NUMBERS: "NUMBERS",
  DATES: "DATES",
  HEURES: "HEURES",
  VOCABULAIRE: "VOCABULAIRE",
};

const App = () => {
  const items = [
    { label: "D'Zuelen", value: ExerciseType.NUMBERS },
    { label: "Den Datum", value: ExerciseType.DATES },
    { label: "D'Auer", value: ExerciseType.HEURES },
    // { label: "Vocabulaire (coming soon)", value: ExerciseType.VOCABULAIRE },
  ];
  const [selectedExercise, setSelectedExercise] = useState(
    ExerciseType.NUMBERS
  );

  const handleSelectExercise = (item) => {
    setSelectedExercise(item);
  };

  useEffect(() => {
    renderComponent();
  }, [selectedExercise]);

  // Function to render the appropriate component based on selectedExercise
  const renderComponent = () => {
    switch (selectedExercise) {
      case ExerciseType.NUMBERS:
        return <Numbers />;
      case ExerciseType.DATES:
        return <Dates />;
      case ExerciseType.HEURES:
        return <Heures />;
      case ExerciseType.VOCABULAIRE:
        return <Vocabulaire />;
      default:
        return null;
    }
  };

  return (
    <div id="app" style={appStyle}>
      <MantineProvider>
        <Container mt="md">
          <Select
            mb="md"
            placeholder="Select exercise"
            value={selectedExercise}
            onChange={(item) => handleSelectExercise(item)}
            data={items}
          />
          {renderComponent()}
        </Container>
      </MantineProvider>
    </div>
  );
};

const appStyle = {
  fontFamily: "Avenir, Helvetica, Arial, sans-serif",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  textAlign: "center",
  color: "#2c3e50",
  position: "fixed",
  overflow: "hidden",
  width: "100%",
  height: "100%",
};

export default App;
