import { useEffect, useState } from "react";
import usePixijsApp from "./usePixijsApp";
import lerp from "lerp";

const useLerpMovement = (targetX, targetY, speed = 0.2) => {
  const [position, setPosition] = useState([targetX, targetY]);
  const [x, y] = position;
  const app = usePixijsApp();

  useEffect(() => {
    if (x != targetX || y != targetY) {
      const ticker = app.ticker;
      let progress = 0;

      const movement = [
        [x, targetX],
        [y, targetY]
      ];
      const journeyLength = Math.hypot(...movement.map(([s, e]) => s - e));
      const rate = speed / journeyLength;
      const update = () => {
        progress += ticker.deltaTime;
        let t = Math.min(progress * rate, 1);
        // easy-in - easy-out
        t = t * t * t * (t * (6 * t - 15) + 10);
        setPosition(movement.map(([start, end]) => lerp(start, end, t)));
        if (t >= 1) {
          ticker.remove(update);
        }
      };
      ticker.add(update);
      return () => ticker.remove(update);
    }
  }, [targetX, targetY]);

  return position;
};

export default useLerpMovement;
