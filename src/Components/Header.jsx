import {
    Box,
    Button,
    Stack,
  } from "@mui/material";
  import React from "react";
  import {
    AccessAlarm,
    AvTimer,
    Casino,
    MonetizationOn,
    NotificationsActive,
    OtherHouses,
    Shuffle,
    WorkOutline,
  } from "@mui/icons-material";
  import { Link,useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#FF5722" : "#344767", // Highlight color if active
    background: "transparent",
    fontSize: "12px",
    fontFamily: "Roboto",
    fontWeight: 600,
  });

  const iconStyle = (path) => ({
    color: location.pathname === path ? "#FF5722" : "#7b809a", // Highlight color if active
  });
  return (
    <>
              <Box
        sx={{
          width: "90%",
          paddingY: "2rem",
          marginX: "auto",
          padding: "0.3rem",
          alignItems: "center",
        //   position: "absolute",
          opacity: 1,
        //   top: "20px",
          background: "transparent",
          borderRadius: "0.5rem",
          boxShadow:
            "0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06);",
          backgroundColor: "rgba(255,255,255,0.8)",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <span
          style={{
            margin: 0,
            fontFamily: "Roboto",
            fontSize: "0.875rem",
            lineHeight: 1.5,
            letterSpacing: "0.02857em",
            opacity: 1,
            textTransform: "none",
            verticalAlign: "none",
            textDecoration: "none",
            color: "#344767",
            fontWeight: 700,
            paddingLeft: "10px",
          }}
        >
          GAME
        </span>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Stack
           direction='row'
            sx={{
               
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <OtherHouses sx={iconStyle("/")} />{" "}
            <Link to={'/'}  style={linkStyle("/")}
            >
              Home
            </Link>{" "}
          </Stack>
          <Stack
          direction={'row'}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <Casino sx={iconStyle("/Dice")} />{" "}
            <Link
              to={"/Dice"}
              style={linkStyle("/Dice")}
            >
              Dice Roll
            </Link>{" "}
          </Stack>
          <Stack
          direction={'row'}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <MonetizationOn sx={iconStyle("/Coin")} />{" "}
            <Link
              to={"/Coin"}
              style={linkStyle("/Coin")}
            >
              Coin Roll
            </Link>{" "}
          </Stack>
          <Stack
          direction={'row'}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <Shuffle sx={iconStyle("/Random")} />{" "}
            <Link
              to={"/Random"}
              style={linkStyle("/Random")}
            >
              Random Number
            </Link>{" "}
          </Stack>

          <Stack
          direction={'row'}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <AvTimer sx={iconStyle("/Timer")} />{" "}
            <Link
              to={"/Timer"}
              style={linkStyle("/Timer")}
            >
              Timer
            </Link>{" "}
          </Stack>
          <Stack
          direction={'row'}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <NotificationsActive sx={iconStyle("/Bell")} />{" "}
            <Link
              to={"/Bell"}
              style={linkStyle("/Bell")}
            >
              Bell
            </Link>{" "}
          </Stack>
          <Stack
          direction={'row'}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <AccessAlarm sx={iconStyle("/Alarm")} />{" "}
            <Link
              to={"/Alarm"}
              style={linkStyle("/Alarm")}
            >
              Alarm Clock
            </Link>{" "}
          </Stack>
          <Stack
          direction={'row'}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <WorkOutline sx={iconStyle("/Work")} />{" "}
            <Link
              to={"/Work"}
              style={linkStyle("/Work")}
            >
              Work On Focus
            </Link>{" "}
          </Stack>
        </Box>
        <Box sx={{ paddingRight: "10px" }}>
          <Button
            variant="contained"
            sx={{
              paddingY: "4px",
              paddingX: "13px",
              backgroundColor: "#272a31",
            }}
          >
            Home
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Header