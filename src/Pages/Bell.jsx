import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tune from '../assets/images/tone.mp3';
import { NotificationsActive, NotificationsOff } from "@mui/icons-material";

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

const Bell = () => {
    const [greeting, setGreeting] = useState('');
    const [color, setColor] = useState('');
    const [is24HourFormat, setIs24HourFormat] = useState(true);
    const savedTtitle = localStorage.getItem('newTitle') || 'Bell Ring Every Hours';
    const savedSubTitle = localStorage.getItem('newSubTitle') || 'Ring the bell every hour. on your choice';
    const [title,setTitle] = useState(savedTtitle);
    const [subTitle, setSubTitle] = useState(savedSubTitle);
    const [playBellHourly, setPlayBellHourly] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());

    

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

const updateTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    setTime({
      hours: is24HourFormat ? hours : (hours % 12) || 12, // Convert to 12-hour format if needed
      minutes,
      seconds,
    });
  };

  const updateGreeting = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 0 && hours < 12) {
      setGreeting('Good Morning');
      setColor('lightblue');
    } else if (hours >= 12 && hours < 18) {
      setGreeting('Good Afternoon');
      setColor('lightcoral');
    } else if (hours >= 18 && hours < 21) {
      setGreeting('Good Evening');
      setColor('darkslateblue');
    } else {
      setGreeting('Good Night');
      setColor('darkslategray');
    }
  };

  // Use useEffect to set up the interval and clean it up
  useEffect(() => {
    updateGreeting();
    updateTime(); // Initial call to set time immediately
    const intervalId = setInterval(updateTime, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [is24HourFormat]);

  // Formatting function to add leading zeros
  const formatNumber = (num) => num.toString().padStart(2, "0");

  const toggleTimeFormat = () => {
    setIs24HourFormat(!is24HourFormat);
  };

  const handleTitleChange=()=>{
    const newTitle = prompt('Enter Title',title);
    if(newTitle !== null){
        setTitle(newTitle);
        localStorage.setItem('newTitle',newTitle)
    }
  }
  const handleSubTitleChange=()=>{
    const newSubTitle = prompt('Enter Title',title);
    if(newSubTitle !== null){
        setSubTitle(newSubTitle);
        localStorage.setItem('newSubTitle',newSubTitle)
    }
  }
  const handleReset=()=>{
    localStorage.removeItem('newTitle');
    localStorage.removeItem('newSubTitle');
    setTitle('Bell Ring Every Hours');
    setSubTitle('Ring the bell every hour. on your choice');
  }

  const handlePlayBellEveryHour = () => {
    setPlayBellHourly((prev) => !prev);
  };

  useEffect(() => {
    if (playBellHourly) {
      // Set up an interval to play the sound every hour
      const id = setInterval(() => {
        const audio = new Audio(Tune);
        audio.play();
      }, 3600000); // 3600000 milliseconds = 1 hour

      setIntervalId(id);
    } else {
      // Clear the interval if not playing hourly
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
    // Cleanup function to clear interval when component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [playBellHourly]);

  const handleToggleDate=()=>{
    setShowDate((prev) =>!prev);
  }

  useEffect(()=>{
    setDate(new Date());
  },[showDate]);

  return (
    <>
      <Container>
        <Stack
          marginY={2}
          marginTop={5}
          justifyContent={"center"}
          textAlign={"center"}
        >
          <Typography variant="h3" fontWeight={700} color={"#595959"}>
            {title}
          </Typography>
          <Typography
            color={"#595959"}
            variant="h6"
            fontSize={12}
            fontWeight={600}
            textTransform={"capitalize"}
            marginLeft={29}
          >
            {subTitle}
          </Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'end'}>
{playBellHourly ? <NotificationsActive color="success" sx={{fontSize:60}} /> : <NotificationsOff color="warning" sx={{fontSize:60}} />}

          </Stack>
        <Box
          sx={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
          }}
          marginBottom={8}
          marginTop={5}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={4}>
            <Stack sx={{ padding: 3 }} flexGrow={1} textAlign={"center"}>
              <Typography color={"#595959"} fontSize={100} fontWeight={800}>
                {formatNumber(time.hours)}
              </Typography>
            </Stack>
            <Typography fontSize={100} sx={{ marginBottom: 0 ,paddingBottom:2}}>
              {" "}
              :{" "}
            </Typography>
            <Stack sx={{ padding: 3 }} flexGrow={1} textAlign={"center"}>
              <Typography color={"#595959"} fontSize={100} fontWeight={800}>
                {" "}
                {formatNumber(time.minutes)}{" "}
              </Typography>
            </Stack>
            <Typography fontSize={100} sx={{ marginBottom: 0 ,paddingBottom:2}}>
              {" "}
              :{" "}
            </Typography>
            <Stack sx={{ padding: 3 }} flexGrow={1} textAlign={"center"}>
              <Typography color={"#595959"} fontSize={100} fontWeight={800}>
                {" "}
                {formatNumber(time.seconds)}{" "}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{padding:3, textAlign:'end', paddingRight:8}} style={{ color: color}}>
          {showDate ? <Typography
            variant="h4"
            fontWeight={400}
            color={"#595959"}
            // textAlign={"center"}
            paddingLeft={12}
            textAlign={'left'}
          >
            {formatDateWithoutComma(date)}
          </Typography> : ''}
            <Typography fontSize={30} fontWeight={800} >{greeting}</Typography>
          </Stack>
        </Box>

        <Stack direction={'row'} sx={{justifyContent:'center',marginBottom:4}} spacing={2}>
            <Button onClick={toggleTimeFormat} variant="contained" color="secondary">
            {is24HourFormat ? 'Switch to 12H' : 'Switch to 24H'}
          </Button>
          <Button variant="contained" color="success" onClick={handleTitleChange}>
            Update Title
          </Button>
          <Button variant="contained" color="success" onClick={handleSubTitleChange}>
            Update Sub Title
          </Button>
          <Button variant="contained" color="error" onClick={handleReset}>
            Reset
          </Button>
        </Stack>
        <Stack direction={'row'} justifyContent={'center'} spacing={2}> 
            <Button variant="contained" onClick={handlePlayBellEveryHour} color={playBellHourly ? 'warning' : 'success'}>
            {playBellHourly ? 'Stop Bell Every Hour' : 'Play Bell Every Hour'}
            </Button>
            <Button variant="contained" onClick={handleToggleDate} >
             {showDate ? 'Show Date' : 'Hide Date'}
            </Button>
             </Stack>
      </Container>
    </>
  );
};

export default Bell;
