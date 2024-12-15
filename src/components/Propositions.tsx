import { Button, Flex, Group, Box, Tooltip } from "@mantine/core";
import React, { useState } from "react";
import { IconEye } from "@tabler/icons-react";

import "./Proposition.css"; // Assuming external CSS for styles

interface Word {
  index: number;
  valeur: string;
  class: string | null;
}

interface PropositionProps {
  liste: Word[];
  reponse: string;
  onBonneReponse: () => void;
}

const Proposition: React.FC<PropositionProps> = ({
  liste,
  reponse,
  onBonneReponse,
}) => {
  const [words, setWords] = useState<Word[]>(liste);

  const bubbleClick = (word: Word) => {
    if (reponse === word.valeur) {
      word.class = "bubble-hidden";
      setWords([...words]); // Re-render with updated class
      onBonneReponse();
    } else {
      word.class = "bubble-shake";
      setWords([...words]); // Re-render with updated class

      // Reset after shake animation
      setTimeout(() => {
        word.class = null;
        setWords([...words]); // Re-render after reset
      }, 500);
    }
  };

  return (
    <Box>
      <Flex align="center">
        <div className="transition-group bubble">
          <Group>
            {liste.map((l) => (
              <Button
                variant={"outline"}
                key={l.index}
                className={`bubble-btn ${l.class || ""}`}
                onClick={() => bubbleClick(l)}
              >
                {l.valeur}
              </Button>
            ))}
          </Group>
        </div>
      </Flex>
      <Tooltip label={reponse}>
        <Button mt="xl" leftSection={<IconEye />} variant="light" color="pink">
          Voir la réponse
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Proposition;
