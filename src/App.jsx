import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Roulette from "./Pages/Roulette";
import DiceRoll from "./Pages/DiceRoll";
import CoinRoll from "./Pages/CoinRoll";
import RandomNumber from "./Pages/RandomNumber";
import Bell from "./Pages/Bell.jsx";
import Timer from "./Pages/Timer.jsx";
import AlarmClock from "./Pages/AlarmClock.jsx";
import WorkingHrs from "./Pages/WorkingHrs.jsx";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Roulette />} />
            <Route path="/Dice" element={<DiceRoll />} />
            <Route path="/Coin" element={<CoinRoll />} />
            <Route path="/Random" element={<RandomNumber />} />
            <Route path="/Bell" element={<Bell />} />
            <Route path="/Timer" element={<Timer />} />
            <Route path="/Alarm" element={<AlarmClock />} />
            <Route path="/Work" element={<WorkingHrs />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
