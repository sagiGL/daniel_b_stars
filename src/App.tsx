import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Star from "./assets/star";
import SpaceShip from "./assets/spaceship";
import { moveInDirection } from "./utils";

function App() {
  const [stars, setStars] = useState<{ key: number; x: number; y: number }[]>(
    []
  );
  const [timer, setTimer] = useState<number>(0);
  const [spaceship, setSpaceship] = useState({
    x: 50,
    y: 60,
    deg: 90,
    state: "",
  });

  const activeKeys = new Set<string>();

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    activeKeys.add(key);
    updateSpaceship();
  };

  const handleKeyRelease = (event: KeyboardEvent) => {
    const key = event.key;
    activeKeys.delete(key);
    updateSpaceship();
  };

  const updateSpaceship = () => {
    setSpaceship((prev) => {
      let newState = "IDLE";

      if (activeKeys.has("ArrowUp")) {
        const changes = moveInDirection(prev.x, prev.y, prev.deg);
        prev.x = changes.newX;
        prev.y = changes.newY;
        newState = "GOING_FORWARD";
      }

      if (activeKeys.has("ArrowDown")) {
        const changes = moveInDirection(prev.x, prev.y, prev.deg + 180);
        prev.x = changes.newX;
        prev.y = changes.newY;
        newState = "GOING_BACKWARDS";
      }

      if (activeKeys.has("ArrowLeft")) {
        prev.deg -= 10;
        newState = "TURNING_LEFT";
      }

      if (activeKeys.has("ArrowRight")) {
        prev.deg += 10;
        newState = "TURNING_RIGHT";
      }

      if (activeKeys.has(" ")) {
        newState = "FIRE";
        setTimeout(() => {
          setSpaceship((prev) => ({ ...prev, state: "" }));
        }, 500);
      }

      return { ...prev, state: newState };
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyRelease);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyRelease);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => setTimer(timer + 1), 300);
  }, [timer]);

  useEffect(() => {
    const _stars = stars.map((s) => ({
      key: s.key,
      x: s.x + (Math.random() * 6 - 3),
      y: s.y + 30,
    }));
    if (_stars.length > 20) {
      _stars.shift();
    }
    setStars([
      ..._stars,
      { key: timer, x: Math.floor(Math.random() * 100), y: 0 },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div
          className={`spaceship ${spaceship.state}`}
          style={{
            right: spaceship.x + "%",
            bottom: spaceship.y + "%",
            transform: `rotate(${spaceship.deg - 90}deg)`,
          }}
        >
          <SpaceShip size={80} />
        </div>
      </div>
    </div>
  );
}

export default App;
