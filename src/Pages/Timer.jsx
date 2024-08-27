import React, { useEffect, useRef, useState } from "react";
import MyAudio from "../assets/images/tone.mp3";
import Ticking from "../assets/images/ticking.mp3";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import "../App.css";

const infoItems = [
  "Press ↑ or ↓ to adjust the number.",
  "Start / Pause : Enter",
  "When the timer starts, the URL (link address) will change. This URL contains information about how the timer runs. You can share this URL anywhere and it will still work.",
  "The title is editable.",
  "Ads are hidden in full-screen mode.",
  "Titles can only be edited in your own browser.",
  "Online web application without any installation.",
  "Accurate to microseconds (1/1000th of a second).",
  "The ringtone duration is up to 60 seconds.",
];

const Timer = () => {
  // Initialize state from localStorage
  const getSavedState = () => {
    const savedHours = parseInt(localStorage.getItem("hours"), 10) || 0;
    const savedMinutes = parseInt(localStorage.getItem("minutes"), 10) || 0;
    const savedSeconds = parseInt(localStorage.getItem("seconds"), 10) || 0;
    const savedIsRunning =
      JSON.parse(localStorage.getItem("isRunning")) || false;
    const savedTimeLeft =
      parseInt(localStorage.getItem("timeLeft"), 10) ||
      savedHours * 3600 + savedMinutes * 60 + savedSeconds;
    const savedTitle = localStorage.getItem("title") || "CountDown Timer";

    return {
      savedHours,
      savedMinutes,
      savedSeconds,
      savedIsRunning,
      savedTimeLeft,
      savedTitle,
    };
  };

  const {
    savedHours,
    savedMinutes,
    savedSeconds,
    savedIsRunning,
    savedTimeLeft,
    savedTitle,
  } = getSavedState();

  const [hours, setHours] = useState(savedHours);
  const [minutes, setMinutes] = useState(savedMinutes);
  const [seconds, setSeconds] = useState(savedSeconds);
  const [isRunning, setIsRunning] = useState(savedIsRunning);
  const [timeLeft, setTimeLeft] = useState(savedTimeLeft);
  const runningAudioRef = useRef(null);
  const finalAudioRef = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const [title, setTitle] = useState(savedTitle);

  // Initialize audio objects
  useEffect(() => {
    runningAudioRef.current = new Audio(Ticking);
    finalAudioRef.current = new Audio(MyAudio);
  }, []);

  // Handle timer logic
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            runningAudioRef.current.pause();
            runningAudioRef.current.currentTime = 0;
            finalAudioRef.current.play();
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      runningAudioRef.current.play();
      runningAudioRef.current.loop = true;
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(interval);
      runningAudioRef.current.pause();
      runningAudioRef.current.currentTime = 0;
      finalAudioRef.current.play();
      setIsRunning(false);
    }

    // Save state to localStorage
    localStorage.setItem("hours", hours);
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);
    localStorage.setItem("isRunning", JSON.stringify(isRunning));
    localStorage.setItem("timeLeft", timeLeft);
    localStorage.setItem("title", title);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, hours, minutes, seconds, title]);

  const handleStartPause = () => {
    if (!isRunning) {
      setTimeLeft(hours * 3600 + minutes * 60 + seconds);
    }
    setIsRunning((prevRunning) => !prevRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    runningAudioRef.current.pause();
    runningAudioRef.current.currentTime = 0;
    finalAudioRef.current.pause();
    finalAudioRef.current.currentTime = 0; // Reset final audio to start
    setTitle("CountDown Timer");
    // Clear localStorage
    localStorage.clear();
  };

  const handleSetTitle = () => {
    const newTitle = prompt("Set New Title :- ", title);
    if (newTitle !== null) {
      setTitle(newTitle);
    }
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginY: 3,
            paddingTop: 3,
          }}
        >
          <Typography variant="h3" fontWeight={500}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box>
            {isRunning ? (
              <Stack
                direction={"row"}
                backgroundColor="#000"
                color={"#fff"}
                width={"500px"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={2}
                borderRadius={3}
                padding={3}
                marginX={"auto"}
              >
                <Typography variant="h1" fontWeight={600}>
                  {Math.floor(timeLeft / 3600)}
                </Typography>
                <Typography variant="h2"> :</Typography>
                <Typography variant="h1" fontWeight={600}>
                  {Math.floor((timeLeft % 3600) / 60)
                    .toString()
                    .padStart(2, "0")}
                </Typography>
                <Typography variant="h2"> :</Typography>
                <Typography variant="h1" fontWeight={600}>
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </Typography>
              </Stack>
            ) : (
              <Stack
                direction={"row"}
                width={"500px"}
                spacing={1}
                sx={{ padding: 4, backgroundColor: "#d9d9d9", borderRadius: 2 }}
                alignItems={"center"}
                marginX={"auto"}
              >
                <Tooltip title="Hours" placement="top" arrow open={tooltipOpen}>
                  <TextField
                    className="custom-textfield"
                    type="number"
                    value={hours}
                    onChange={(e) =>
                      setHours(Math.max(0, parseInt(e.target.value, 10)))
                    }
                    disabled={isRunning}
                    placeholder="Hours"
                    sx={{
                      width: 140,
                      "& .MuiInputBase-input": {
                        fontSize: "38px", // Adjust font size here
                        paddingLeft: "40px",
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: "#fff", // Background color
                      },
                    }}
                  />
                </Tooltip>
                <Stack>
                  <Typography variant="h3">:</Typography>
                </Stack>
                <Tooltip
                  title="Minutes"
                  placement="top"
                  arrow
                  open={tooltipOpen}
                >
                  <TextField
                    type="number"
                    value={minutes}
                    onChange={(e) =>
                      setMinutes(
                        Math.max(0, Math.min(59, parseInt(e.target.value, 10)))
                      )
                    }
                    disabled={isRunning}
                    placeholder="Minutes"
                    sx={{
                      width: 140,
                      "& .MuiInputBase-input": {
                        fontSize: "38px", // Adjust font size here
                        paddingLeft: "45px",
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: "#fff", // Background color
                      },
                    }}
                  />
                </Tooltip>
                <Stack>
                  <Typography variant="h3">:</Typography>
                </Stack>
                <Tooltip
                  title="Seconds"
                  placement="top"
                  arrow
                  open={tooltipOpen}
                >
                  <TextField
                    type="number"
                    value={seconds}
                    onChange={(e) =>
                      setSeconds(
                        Math.max(0, Math.min(59, parseInt(e.target.value, 10)))
                      )
                    }
                    disabled={isRunning}
                    placeholder="Seconds"
                    sx={{
                      width: 140,
                      "& .MuiInputBase-input": {
                        fontSize: "38px", // Adjust font size here
                        paddingLeft: "45px",
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: "#fff", // Background color
                      },
                    }}
                  />
                </Tooltip>
              </Stack>
            )}

            <Stack
              direction={"row"}
              spacing={2}
              marginTop={3}
              justifyContent={"center"}
            >
              <Button
                onClick={handleStartPause}
                variant="contained"
                color="primary"
              >
                {isRunning ? "Pause" : "Start"}
              </Button>
              <Button
                onClick={handleReset}
                variant="contained"
                color="secondary"
                sx={{ marginLeft: 2 }}
              >
                Reset
              </Button>
              <Button
                onClick={handleSetTitle}
                variant="contained"
                color="info"
                sx={{ marginLeft: 2 }}
              >
                Update Title
              </Button>
            </Stack>

            <Stack>
              <Typography
                variant="h5"
                fontWeight={500}
                gutterBottom
                color={"#595959"}
              >
                Timer Information
              </Typography>
              <List sx={{ padding: 0, margin: 0, listStyleType: "disc" }}>
                {infoItems.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{ color: "#595959", fontWeight: 600 }}
                  >
                    {item}
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Timer;
