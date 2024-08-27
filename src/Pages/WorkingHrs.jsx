import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Tune from '../assets/images/tone.mp3';

const WorkingHrs = () => {
  const initialTimes = {
    focusTime: 25 * 60, // 25 minutes in seconds
    shortBreak: 5 * 60, // 5 minutes in seconds
    longBreak: 15 * 60, // 15 minutes in seconds
  };

  const loadTimes = () => {
    const savedTimes = JSON.parse(localStorage.getItem("timerSettings"));
    return savedTimes || initialTimes;
  };

  const loadState = () => {
    const savedState = JSON.parse(localStorage.getItem("timerState"));
    return (
      savedState || {
        selectedMenu: "focusTime",
        countdown: null,
        isRunning: false,
      }
    );
  };

  const [times, setTimes] = useState(loadTimes());
  const [selectedMenu, setSelectedMenu] = useState(loadState().selectedMenu);
  const [countdown, setCountdown] = useState(loadState().countdown);
  const [intervalId, setIntervalId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [nextMenu, setNextMenu] = useState("");
  const [isRunning, setIsRunning] = useState(loadState().isRunning);
  const [audio] = useState(new Audio(Tune));

  useEffect(() => {
    localStorage.setItem("timerSettings", JSON.stringify(times));
  }, [times]);

//   useEffect(() => {
//     localStorage.setItem(
//       "timerState",
//       JSON.stringify({ selectedMenu, countdown, isRunning: countdown !== null })
//     );
//   }, [selectedMenu, countdown]);
useEffect(() => {
    localStorage.setItem(
      "timerState",
      JSON.stringify({ selectedMenu, countdown, isRunning })
    );
  }, [selectedMenu, countdown, isRunning]);

//   useEffect(() => {
//     if (countdown !== null && countdown > 0) {
//       const id = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       setIntervalId(id);
//       return () => clearInterval(id);
//     } else if (countdown === 0) {
//       setCountdown(null);
//       if (intervalId) clearInterval(intervalId);
//       alert("Time is up!");
//     }
//   }, [countdown]);

useEffect(() => {
    if (isRunning && countdown !== null && countdown > 0) {
      const id = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (countdown === 0) {
      setCountdown(null);
      audio.play();
      if (intervalId) clearInterval(intervalId);
    //   alert("Time is up!");
    }
  }, [isRunning, countdown,audio]);
// useEffect(() => {
//     if (countdown !== null && countdown > 0) {
//       const id = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       setIntervalId(id);
//       return () => clearInterval(id);
//     } else if (countdown === 0) {
//       setCountdown(null);
//       if (intervalId) clearInterval(intervalId);
//       alert("Time is up!");
//     }
//   }, [countdown]);
//   const handleMenuSelect = (type) => {
//     if (countdown !== null) {
//       setNextMenu(type);
//       setOpenDialog(true);
//     } else {
//       setSelectedMenu(type);
//     }
//   };
const handleMenuSelect = (type) => {
    if (countdown !== null && isRunning) {
      setNextMenu(type);
      setOpenDialog(true);
    } else {
      setSelectedMenu(type);
    }
  };

  const handleTimeChange = (type, value) => {
    const seconds = parseInt(value) * 60;
    setTimes((prevTimes) => ({
      ...prevTimes,
      [type]: seconds,
    }));
  };

//   const startTimer = () => {
//     if (selectedMenu) {
//       setCountdown(times[selectedMenu]);
//     }
//   };
const startTimer = () => {
    if (countdown === null) {
      setCountdown(times[selectedMenu]);
    }
    setIsRunning(true);
  };
  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalId) clearInterval(intervalId);
  };

//   const stopTimer = () => {
//     setCountdown(null);
//     if (intervalId) clearInterval(intervalId);
//   };
const stopTimer = () => {
    setCountdown(null);
    setIsRunning(false);
    if (intervalId) clearInterval(intervalId);
  };

  const addOneMinute = () => {
    if (countdown !== null) {
      setCountdown((prev) => prev + 60);
    }
  };

  const subtractOneMinute = () => {
    if (countdown!== null && countdown > 60) {
      setCountdown((prev) => prev - 60);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDialogClose = (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      setSelectedMenu(nextMenu);
      setCountdown(times[nextMenu]);
      setNextMenu("");
    }
  };

  const handleReset=()=>{
    setTimes(initialTimes);
    setSelectedMenu("focusTime");
    setCountdown(initialTimes.focusTime);
    setOpenDialog(false);
    setIsRunning(false);
    setCountdown(null);
    audio.pause();
    if (intervalId) clearInterval(intervalId);
  }
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 4,
        }}
      >
        <Stack sx={{ textAlign: "center" }}>
          <Typography
            sx={{ fontSize: 40, fontWeight: "700", color: "#595959" }}
          >
            Focus On Work
          </Typography>
        </Stack>

        <Stack
          spacing={3}
          marginTop={5}
          justifyContent={"center"}
          maxWidth={700}
          marginX={"auto"}
        >
          {/* Menu Row */}
          <Stack direction="row" spacing={2} marginBottom={3} justifyContent={'center'}>
            <Button
              variant={selectedMenu === "focusTime" ? "contained" : "outlined"}
              onClick={() => handleMenuSelect("focusTime")}
            >
              Focus Time
            </Button>
            <Button
              variant={selectedMenu === "shortBreak" ? "contained" : "outlined"}
              onClick={() => handleMenuSelect("shortBreak")}
            >
              Short Break
            </Button>
            <Button
              variant={selectedMenu === "longBreak" ? "contained" : "outlined"}
              onClick={() => handleMenuSelect("longBreak")}
            >
              Long Break
            </Button>
          </Stack>
          <Stack
            sx={{ backgroundColor: "#fff", width: "100%", height: 5 }}
          ></Stack>
          {/* Conditional Boxes */}
          {countdown ? (
            // Display countdown if any timer is running
            <Box
              sx={{
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                minWidth: 700,
                backgroundColor: "#8c8c8c",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                marginTop={2}
                fontSize={15}
                fontWeight={600}
                color={"#fff"}
                textAlign={"center"}
                textTransform={"capitalize"}
              >
                {countdown !== null
                  ? `Current Timer: ${selectedMenu
                      .replace(/([A-Z])/g, " $1")
                      .trim()}`
                  : ""}
              </Typography>
              <Typography
                sx={{ color: "#fff", fontSize: 100, fontWeight: 700 }}
                textAlign={"center"}
              >
                {formatTime(countdown)}
              </Typography>
            </Box>
          ) : // Display input box based on the selected menu if no countdown is running
          selectedMenu === "focusTime" ? (
            <Box
              sx={{
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                maxWidth: 700,
                backgroundColor: "#8c8c8c",
              }}
            >
              <TextField
                label="Minutes"
                type="number"
                value={Math.floor(times.focusTime / 60)}
                onChange={(e) => handleTimeChange("focusTime", e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { border: "none" },
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-input": {
                    padding: 0,
                    color: "#fff",
                    fontSize: 100,
                    textAlign: "center",
                  },
                  "& .MuiFormLabel-root": {
                    color: "white",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "white",
                  },
                }}
              />
            </Box>
          ) : selectedMenu === "shortBreak" ? (
            <Box
              sx={{
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                maxWidth: 700,
                backgroundColor: "#8c8c8c",
              }}
            >
              <TextField
                label="Minutes"
                type="number"
                value={Math.floor(times.shortBreak / 60)}
                onChange={(e) => handleTimeChange("shortBreak", e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { border: "none" },
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-input": {
                    padding: 0,
                    color: "#fff",
                    fontSize: 100,
                    textAlign: "center",
                  },
                  "& .MuiFormLabel-root": {
                    color: "white",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "white",
                  },
                }}
              />
            </Box>
          ) : (
            selectedMenu === "longBreak" && (
              <Box
                sx={{
                  padding: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  maxWidth: 700,
                  backgroundColor: "#8c8c8c",
                }}
              >
                <TextField
                  label="Minutes"
                  type="number"
                  value={Math.floor(times.longBreak / 60)}
                  onChange={(e) =>
                    handleTimeChange("longBreak", e.target.value)
                  }
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { border: "none" },
                      "&:hover fieldset": { border: "none" },
                      "&.Mui-focused fieldset": { border: "none" },
                    },
                    "& .MuiInputBase-input": {
                      padding: 0,
                      color: "#fff",
                      fontSize: 100,
                      textAlign: "center",
                    },
                    "& .MuiFormLabel-root": {
                      color: "white",
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "white",
                    },
                  }}
                />
              </Box>
            )
          )}

          {/* Timer Controls */}
          <Stack
            direction="row"
            spacing={2}
            marginTop={2}
            justifyContent={"center"}
          >

<Button
          variant="contained"
          onClick={startTimer}
          disabled={isRunning }
        >
          Start
        </Button>
        <Button
          variant="contained"
          onClick={pauseTimer}
          disabled={!isRunning}
        >
          Pause
        </Button>
            <Button
          variant="contained"
          disabled={countdown === null}
          color="success"
          onClick={addOneMinute}
        >
          Add 1 Minute
        </Button>
        <Button onClick={subtractOneMinute} variant="contained"
          disabled={countdown === null}
          color="warning"> 
          Subtract 1 Minute
        </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Stack>
        </Stack>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Switch Timer</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to switch to{" "}
              {nextMenu.replace(/([A-Z])/g, " $1").trim()}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogClose(true)} color="primary">
              Yes
            </Button>
            <Button onClick={() => handleDialogClose(false)} color="secondary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default WorkingHrs;
