import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear(); 
  return (
    <>
      <Box
        sx={{
          width: "40%",
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
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Grid container>
            <Grid item xs={12} lg={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <Typography
              sx={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Home
            </Typography>
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            <Link
              to={"/Dice"}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Dice Roll
            </Link>{" "}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            {/* <MonetizationOn sx={{ color: "#7b809a" }} />{" "} */}
            <Link
              to={"/Coin"}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Coin Roll
            </Link>{" "}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          <Stack
            dicabled={true}
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            {/* <Shuffle sx={{ color: "#7b809a" }} />{" "} */}
            <Link
              to={""}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Random Number
            </Link>{" "}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            {/* <Shuffle sx={{ color: "#7b809a" }} />{" "} */}
            <Link
              to={""}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Cool Text Generator
            </Link>{" "}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            {/* <Shuffle sx={{ color: "#7b809a" }} />{" "} */}
            <Link
              to={""}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Clock & Timer Watch
            </Link>{" "}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            {/* <Shuffle sx={{ color: "#7b809a" }} />{" "} */}
            <Link
              to={""}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Report a Problem
            </Link>{" "}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          
        </Box>
            </Grid>
            <Grid item xs={12} lg={12}>
            <Box sx={{ display: "flex", alignItems: "center" ,justifyContent:'center'}}>
            <Stack
            direction={"row"}
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            {/* <Shuffle sx={{ color: "#7b809a" }} />{" "} */}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
            <Link
              to={""}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
              Report a Problem
            </Link>{" "}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            {/* <Shuffle sx={{ color: "#7b809a" }} />{" "} */}
            <Link
              to={""}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
             Privacy
            </Link>{" "}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            {/* <Shuffle sx={{ color: "#7b809a" }} />{" "} */}
            <Link
              to={""}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
             Blog
            </Link>{" "}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            {/* <Shuffle sx={{ color: "#7b809a" }} />{" "} */}
            <Link
              to={""}
              style={{
                textDecoration: "none",
                color: "#344767",
                background: "transparent",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 600,
              }}
            >
             Privacy
            </Link>{" "}
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
            paddingX={1}
            spacing={1}
          >
            {/* <Shuffle sx={{ color: "#7b809a" }} />{" "} */}
            <Typography
        variant="body2"
        color="textSecondary"
        sx={{ fontSize: '14px' }}
      >
        © {currentYear} <a href="https://quicksolve.tech/">quickSolve.tech.</a> All Rights Reserved.
      </Typography>
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "#e6f4ff", height: 28, marginY: 5 }}
            />
          </Stack>
          </Box>
            </Grid>
        </Grid>

      </Box>
    </>
  );
};

export default Footer;
