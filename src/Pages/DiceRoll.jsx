import React, { useState } from "react";
import "../App.css";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Casino, Close, Refresh } from "@mui/icons-material";

const DiceRoll = () => {
  const [rolling, setRolling] = useState(false);
  const [results, setResults] = useState([]);
  const [numDice, setNumDice] = useState(1); // State to keep track of the number of dice

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);

    const newResults = [];
    const diceElements = document.querySelectorAll(".dice");

    diceElements.forEach((dice, index) => {
      const random = Math.floor(Math.random() * 6) + 1;
      newResults[index] = random;

      // Animation
      dice.style.animation = "rolling 4s";

      setTimeout(() => {
        switch (random) {
          case 1:
            dice.style.transform = "rotateX(0deg) rotateY(0deg)";
            break;
          case 6:
            dice.style.transform = "rotateX(180deg) rotateY(0deg)";
            break;
          case 2:
            dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
            break;
          case 5:
            dice.style.transform = "rotateX(90deg) rotateY(0deg)";
            break;
          case 3:
            dice.style.transform = "rotateX(0deg) rotateY(90deg)";
            break;
          case 4:
            dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
            break;
          default:
            break;
        }
        dice.style.animation = "none";
      }, 4050);
    });

    setResults(newResults);
    setRolling(false);
  };

  const handleDiceNumberChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) setNumDice(value);
  };

  return (
    <Container>
      <Box
        sx={{ width: "100%", justifyContent: "center", marginTop: 4 }}
      >
        <Typography
          sx={{
            fontWeight: "800",
            color: "#595959",
            fontSize: "2.5em",
            marginBottom: 6,
          }}
          variant="h5"
        >
          Welcome to Dice Roll Game
        </Typography>
        <Typography variant="subtitle2" fontSize={14}>
          Multiple Selectable Dice
        </Typography>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {Array.from({ length: numDice }, (_, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <Box className="dice" sx={{ display: "flex", marginBottom: 1 }}>
                <Box className="face front"></Box>
                <Box className="face back"></Box>
                <Box className="face top"></Box>
                <Box className="face bottom"></Box>
                <Box className="face right"></Box>
                <Box className="face left"></Box>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#595959", marginTop: 5 }}
              >
                {results[i] ? `Result: ${results[i]}` : ""}
              </Typography>
            </Box>
          ))}
        </Box>
        <div style={{ textAlign: "center" }}>
          <Button
            className="roll"
            onClick={rollDice}
            disabled={rolling}
            variant="outlined"
            sx={{ mb: 1 ,width:'300px'}}
            endIcon={<Refresh />}
          >
            <p >
              {rolling ? "Rolling..." : "Roll The Dice"}
            </p>
          </Button>
          <Stack
            direction={"row"}
            style={{
              textAlign: "center",
              marginTop: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
            spacing={2}
          >
            <Casino color="primary" sx={{ fontSize: 60 }} />

            <Close color="black" />
            <TextField
              sx={{ fontSize: 16, textAlign: "center", width: 70 }}
              type="number"
              value={numDice}
              onChange={handleDiceNumberChange}
              min="1"
            />
          </Stack>
        </div>
        <Box sx={{ marginX: 4, marginTop: 5 }}>
          <Typography
            variant="body2"
            sx={{ fontSize: 15, fontWeight: 500, color: "#595959" }}
          >
            Dice wheel. It is an online dice tool that offers elegant 3D
            animations. You can set the number of dice, the default value is 1
            and the maximum value is 6. The 3D animation is for reference only.
            It first generates pure random numbers and then displays animations.
            The numbers displayed by the dice are generated from the native
            JavaScript API and can provide truly random numbers. In our test,
            this was the best way to generate random numbers for dice. 3D
            animations are achieved through the "CSS3" method and only support
            modern browsers, including Chrome, edge, and firefox. Older browsers
            will be downgraded to 2D still images. It's a matter of probability.
            If you roll two dice, the probability of repeating the result is
            16.67%. If you are rolling three dice, there is a 44.44% chance of
            repeating the result. This page is provided "as is" without warranty
            of any kind, either express or implied. Please comply with local
            laws and users are responsible for any violations. Let's roll the
            dice! Good luck!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default DiceRoll;
