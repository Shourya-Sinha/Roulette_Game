import React, { useEffect, useState } from "react";
import "../App.css";
import head from "../assets/images/head.png";
import tail from "../assets/images/tails.png";
import { Box, Container, Typography } from "@mui/material";

const CoinRoll = () => {
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (flipping) {
      const timeout = setTimeout(() => {
        updateStats();
        setFlipping(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [flipping]);

  const flipCoin = () => {
    if (flipping) return;

    setFlipping(true);
    const isHeads = Math.random() < 0.5;
    const coin = document.querySelector(".coin");
    coin.style.animation = "none";

    if (isHeads) {
      setTimeout(() => {
        coin.style.animation = "spin-heads 3s forwards";
        setHeads((prev) => prev + 1);
      }, 100);
    } else {
      setTimeout(() => {
        coin.style.animation = "spin-tails 3s forwards";
        setTails((prev) => prev + 1);
      }, 100);
    }

    disableButton();
  };

  const updateStats = () => {
    // Log the current stats to the console (for debugging purposes)
    console.log(`Heads: ${heads}, Tails: ${tails}`);
    // You can add more logic here if needed
  };

  const disableButton = () => {
    const flipButton = document.querySelector("#flip-button");
    flipButton.disabled = true;
    setTimeout(() => {
      flipButton.disabled = false;
    }, 3000);
  };

  const reset = () => {
    const coin = document.querySelector(".coin");
    coin.style.animation = "none";
    setHeads(0);
    setTails(0);
  };

  return (
    <>
      <Container sx={{ marginTop: 10 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Welcome to Coin Toss Game
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 14, fontWeight: 500, color: "#595959" }}
        >
          Toss With Coin{" "}
        </Typography>

        <Box className="container">
          <div className="coin" id="coin">
            <div className="heads">
              <img src={head} alt="Heads" />
            </div>
            <div className="tails">
              <img src={tail} alt="Tails" />
            </div>
          </div>
          <Box
            className="stats"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingY: 2,
              paddingX: 5,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: "500",
                color: "#595959",
                marginBottom: 0,
              }}
              variant="subtitle2"
              id="heads-count"
            >
              Heads: {heads}
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: "500",
                color: "#595959",
                marginBottom: 0,
              }}
              variant="subtitle2"
              id="tails-count"
            >
              Tails: {tails}
            </Typography>
          </Box>
          <div className="buttons">
            <button id="flip-button" onClick={flipCoin}>
              Flip Coin
            </button>
            <button id="reset-button" onClick={reset}>
              Reset
            </button>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default CoinRoll;
