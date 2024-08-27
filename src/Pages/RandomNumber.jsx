import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const RandomNumber = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [count, setCount] = useState("");
  const [numbers, setNumbers] = useState([]);

  const generateRandomNumbers = () => {
    const fromNum = parseInt(from, 10);
    const toNum = parseInt(to, 10);
    const countNum = parseInt(count, 10);

    if (
      isNaN(fromNum) ||
      isNaN(toNum) ||
      isNaN(countNum) ||
      fromNum >= toNum ||
      countNum <= 0 ||
      countNum > toNum - fromNum + 1
    ) {
      alert(
        "Please enter valid numbers. Ensure 'From' is less than 'To' and count is valid."
      );
      return;
    }

    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < countNum) {
      const randomNum =
        Math.floor(Math.random() * (toNum - fromNum + 1)) + fromNum;
      uniqueNumbers.add(randomNum);
    }

    setNumbers(Array.from(uniqueNumbers));
  };

  const handleReset=()=>{
    setFrom("");
    setTo("");
    setCount("");
    setNumbers([]);
  }
  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h3"
            sx={{
              marginBottom: 5,
              fontSize: 25,
              fontWeight: 600,
              color: "#595959",
              marginTop: 3,
            }}
          >
            Random Number Generator
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <TextField
              label="From"
              type="number"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="To"
              type="number"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="How Many Numbers"
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", marginY: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={generateRandomNumbers}
            >
              Generate
            </Button>
          </Box>

          {numbers.length > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontSize: 15, fontWeight: 600, color: "#595959" }}
              >
                OutComes:
              </Typography>
              <Box sx={{ border: 1, padding: 3, borderRadius: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 13, fontWeight: 500, color: "#595959" }}
                >
                  {numbers.join(", ")}
                </Typography>
              </Box>
              <Box marginTop={4} sx={{display:'flex',justifyContent:'end'}}>
              <Button onClick={()=> handleReset()} variant="contained" color="error">Reset</Button>
              </Box>
              
            </Box>
          )}
        </Box>
      </Container>
      <Container>
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#595959",
              textTransform: "capitalize",
              textAlign: "justify",
            }}
          >
            {" "}
            Random number generators, also known as RNGs. The "No Duplicates"
            feature is supported if you set the number of results to be greater
            than one. The range is 0 to 9999, and the maximum number of results
            is 1000. You can change the page title if you want. Get the
            timestamp from the operating system. It generates cryptographic
            random digits that are suitable for most encryption purposes. It
            uses a built-in cryptographic function ( crypto.getRandomValues )
            instead of the popular random machine ( Math.random ) or the
            well-known MT algorithm ( Mersenne-Twister ). The Mersenne-Twister
            algorithm does not generate cryptographically secure values and
            should not be used for cryptographic purposes. There are no
            warranties of any kind, whether express or implied. Please comply
            with local laws and users are responsible for any violations.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default RandomNumber;
