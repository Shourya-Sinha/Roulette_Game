import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Tooltip,
  List,
  ListItem,
} from "@mui/material";
import Tune from '../assets/images/tone.mp3';
import {NotificationsActive, NotificationsOff} from '@mui/icons-material';

const AlarmInfo=[
'Press ↑ or ↓ to adjust the number.',
'Start / Pause : Enter',
'When the timer starts, the URL (link address) will change. This URL contains information about how the timer runs. You can share this URL anywhere and it will still work.',
'The title is editable.',
'Ads are hidden in full-screen mode.',
'Titles can only be edited in your own browser.',
'Online web application without any installation.',
'Accurate to microseconds (1/1000th of a second).',
'The ringtone duration is up to 90 seconds.',
]

const formatDateWithoutComma = (date) => {
  const weekdayOptions = { weekday: "short" };
  const monthOptions = { month: "short" };
  const dayOptions = { day: "2-digit" };
  const yearOptions = { year: "numeric" };

  const weekday = new Intl.DateTimeFormat("en-US", weekdayOptions).format(date);
  const month = new Intl.DateTimeFormat("en-US", monthOptions).format(date);
  const day = new Intl.DateTimeFormat("en-US", dayOptions).format(date);
  const year = new Intl.DateTimeFormat("en-US", yearOptions).format(date);

  return `${weekday} ${month} ${day} ${year}`;
};

const calculateRemainingTime = (alarmTime) => {
  const now = new Date();
  const diffMs = alarmTime - now;

  if (diffMs <= 0) return "00:00";

  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffSec = Math.floor((diffMs / 1000) % 60);

  return `${String(diffMin).padStart(2, "0")}:${String(diffSec).padStart(2, "0")}`;
};

const AlarmClock = () => {
  const [time, setTime] = useState(new Date());
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [alarmTime, setAlarmTime] = useState(null);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [audio] = useState(new Audio(Tune)); // Replace with your audio file path
  const [remainingTime, setRemainingTime] = useState("");
  const [title, setTitle] = useState("Alarm Clock");

  // Load state from localStorage on mount
  useEffect(() => {
    const savedTitle = localStorage.getItem("title");
    const savedAlarmTime = localStorage.getItem("alarmTime");
    const savedIsRunning = localStorage.getItem("isRunning") === "true";

    if (savedTitle) {
      setTitle(savedTitle);
    }

    if (savedAlarmTime) {
      const parsedAlarmTime = new Date(savedAlarmTime);
      const timeDiff = parsedAlarmTime - new Date();

      if (timeDiff > 0) {
        setAlarmTime(parsedAlarmTime);
        setIsAlarmSet(true);
        setIsRunning(savedIsRunning);
        setRemainingTime(calculateRemainingTime(parsedAlarmTime));
      } else {
        // If the time has passed, clear the alarm
        localStorage.removeItem("alarmTime");
        localStorage.removeItem("isRunning");
      }
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());

      if (isRunning && alarmTime) {
        const remaining = calculateRemainingTime(alarmTime);
        setRemainingTime(remaining);

        if (new Date() >= alarmTime) {
          audio.play();
          setIsRunning(false);
          setIsAlarmSet(false);
          localStorage.removeItem("alarmTime"); // Clear alarm after it rings
          localStorage.removeItem("isRunning");
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [alarmTime, isRunning, audio]);

  const handleSetAlarm = () => {
    const hrs = parseInt(hours, 10) || 0;
    const mins = parseInt(minutes, 10) || 0;

    if (hrs === 0 && mins === 0) return; // Ensure at least one is provided

    const now = new Date();
    const alarm = new Date(now.getTime() + (hrs * 60 + mins) * 60 * 1000); // Calculate future time

    setAlarmTime(alarm);
    setIsAlarmSet(true);
    setIsRunning(true);
    setRemainingTime(calculateRemainingTime(alarm));

    // Save to localStorage
    localStorage.setItem("alarmTime", alarm.toISOString());
    localStorage.setItem("isRunning", "true");
    localStorage.setItem('title','Alarm Clock')
  };

  const handleDisableAlarm = () => {
    setIsRunning(false);
    setIsAlarmSet(false);
    setAlarmTime(null);
    setRemainingTime("");

    // Clear localStorage
    localStorage.removeItem("alarmTime");
    localStorage.removeItem("isRunning");
  };

  const handleReset = () => {
    setHours("");
    setMinutes("");
    handleDisableAlarm();
    audio.pause();
    setTitle("CountDown Alarm");
    localStorage.setItem("title", "CountDown Alarm");
  };

  const handlesetTitle=()=>{
    const newTitle = prompt("Enter a new title for the alarm clock", title);
    if(newTitle){
      setTitle(newTitle);
      localStorage.setItem("title", newTitle);
    }
  }

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography
        variant="h2"
        fontWeight={700}
        textAlign={"center"}
        paddingBottom={2}
        color={"#595959"}
      >
        {title}
      </Typography>
      <Stack direction={'row'} justifyContent={'end'}>
        {isAlarmSet ? <NotificationsActive color={'primary'} sx={{fontSize:100}} /> : <NotificationsOff sx={{fontSize:100}} />}

      </Stack>
      <Box
        sx={{
          marginX: "auto",
          backgroundColor: "#000",
          width: "500px",
          borderRadius: 3,
          padding: 4,
        }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            variant="h5"
            padding={2}
            fontWeight={600}
            color={"#595959"}
          >
            {isAlarmSet ? "Alarm Set For - " : "Current Time - "}
          </Typography>
          <Typography
            variant="h2"
            fontWeight={600}
            color={"#fff"}
            textAlign={"center"}
          >
            {isAlarmSet
              ? remainingTime
              : time.toLocaleTimeString("en-GB", { hour12: false })} {/* 24-hour format */}
          </Typography>

        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            variant="h5"
            padding={2}
            fontWeight={600}
            color={"#595959"}
          >
            Current Date -{" "}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={400}
            color={"#fff"}
            textAlign={"center"}
            paddingLeft={2}
          >
            {formatDateWithoutComma(time)}
          </Typography>
        </Stack>
        {isAlarmSet ? (        <Stack direction={"row"} alignItems={"center"}>
        <Typography
            variant="h5"
            padding={2}
            fontWeight={600}
            color={"#595959"}
          >
            Current Date -{" "}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={400}
            color={"#fff"}
            textAlign={"center"}
            paddingLeft={2}
          >
            {time.toLocaleTimeString("en-GB", { hour12: false })}
          </Typography>
        </Stack> ) : ''}

      </Box>

      <Box
        sx={{
          padding: 2,
          justifyContent: "center",
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={5}
        >
          <Tooltip title={"Hours"} arrow placement="left">
            <TextField
              type="number"
              placeholder="Hrs"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              sx={{
                width: 140,
                "& .MuiInputBase-input": {
                  fontSize: "38px",
                  paddingLeft: "40px",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "#fff",
                },
              }}
            />
          </Tooltip>
          <Stack>
            <Typography variant="h3">:</Typography>
          </Stack>
          <Tooltip title={"Minutes"} arrow placement="right">
            <TextField
              type="number"
              placeholder="Min"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              sx={{
                width: 140,
                "& .MuiInputBase-input": {
                  fontSize: "38px",
                  paddingLeft: "40px",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "#fff",
                },
              }}
            />
          </Tooltip>
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={3}
          spacing={2}
        >
          <Button variant="contained" onClick={handleSetAlarm}>
            Set an Alarm
          </Button>
          <Button variant="contained" color="error" onClick={handleDisableAlarm}>
            Disable Alarm
          </Button>
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" color="error" onClick={handlesetTitle}>
            Update Title
          </Button>
        </Stack>
        <Stack sx={{marginTop:3}}>
              <Typography
                variant="h5"
                fontWeight={500}
                gutterBottom
                color={"#595959"}
              >
                Alarm Information
              </Typography>
              <List sx={{ padding: 0, margin: 0, listStyleType: "disc" }}>
                {AlarmInfo.map((item, index) => (
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
    </Container>
  );
};

export default AlarmClock;
