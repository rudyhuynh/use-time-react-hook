import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useTime } from "./useTime";
import moment from "moment";
import "moment-duration-format";

const getPhi = (timeMs) => ((Math.PI * 2) / 60000) * (timeMs % 60000);

const getX2 = (timeMs, radius, x0) => radius * Math.sin(getPhi(timeMs)) + x0;

const getY2 = (timeMs, radius, y0) => -radius * Math.cos(getPhi(timeMs)) + y0;

function App() {
  const [time, initialTime, duration] = useTime();

  return (
    <div className="App">
      <div>
        <svg width="200px" height="200px">
          <circle cx="100" cy="100" r="100" fill="white" stroke="black" strokeWidth="1" />
          <line x1="100" y1="100" x2={getX2(time, 80, 100)} y2={getY2(time, 80, 100)} stroke="black" />
        </svg>
      </div>
      <div>{moment(time).format("HH:mm:ss A")}</div>
      <div>You have been opening this page for {moment.duration(duration).format("h [hrs], m [min], s [sec]")}</div>
    </div>
  );
}

export default App;
