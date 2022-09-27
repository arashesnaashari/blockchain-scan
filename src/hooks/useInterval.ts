import { useEffect } from "react";

const useInterval = (interval: number, callback: Function) => {
  useEffect(() => {
    const intervalRef = setInterval(callback, interval * 1000);

    return () => {
      clearInterval(intervalRef);
    };
  }, []);
};

export default useInterval;
