import { useEffect, useRef, useState } from "react";

function useTimer({ initialValue = 0 }) {
  const [value, setValue] = useState(initialValue);
  const ref = useRef(null);

  const startTimer = () => {
    if (!ref.current) {
      ref.current = setInterval(() => {
        setValue((prev) => {
          if (prev - 1 === 0) {
            pauseTimer();
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(ref.current);
    ref.current = null;
  };

  const resetTimer = () => {
    pauseTimer();
    setValue(initialValue);
  };

  useEffect(() => {
    return pauseTimer;
  }, [ref]);

  return { value, startTimer, pauseTimer, resetTimer };
}

export default useTimer;
