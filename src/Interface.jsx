import React, { useEffect, useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame";
import { addEffect } from "@react-three/fiber";

function Interface() {
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const time = useRef(null);
  const [timeCount, setTimeCount] = useState(0);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elaspedTime = 0;
      if (state.phase === "playing") {
        elaspedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elaspedTime = state.endTime - state.startTime;
      }
      elaspedTime /= 1000;

      elaspedTime = elaspedTime.toFixed(2);
      setTimeCount(elaspedTime);
    });
    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      <div ref={time} className="time">
        {timeCount}
      </div>
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${rightward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
}

export default Interface;
