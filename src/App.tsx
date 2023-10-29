/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";

import "./App.css";
import Star from "./assets/star";
import SpaceShip from "./assets/spaceship";

function App() {
  const [stars, setStars] = useState<{ key: number; x: number; y: number }[]>(
    []
  );
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => setTimer(timer + 1), 300);
  }, [timer]);

  useEffect(() => {
    const _stars = stars.map((s) => ({
      key: s.key,
      x: s.x + (Math.random() * 6 - 3),
      y: s.y + 30,
    }));
    if (_stars.length > 50) {
      _stars.shift();
    }
    setStars([
      ..._stars,
      { key: timer, x: Math.floor(Math.random() * 100), y: 0 },
    ]);
  }, [timer]);

  return (
    <div className="App">
      <header className="header">האתר של דניאל</header>

      <div className="background">
        {stars.map((s) => (
          <Star
            className={`star star-${s.key}`}
            key={`star-${s.key}`}
            fill="#ffffff88"
            style={{ left: `${s.x}%`, top: s.y }}
          />
        ))}
        <SpaceShip className="spaceship" size={80} />
      </div>
    </div>
  );
}

export default App;
