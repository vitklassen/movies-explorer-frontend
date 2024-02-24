import { useEffect, useCallback, useState } from "react";

export function useScreenWidth() {
  const getCurrentScreenWidth = useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getCurrentScreenWidth());

  useEffect(() => {
    function handleScreenResize() {
      setScreenWidth(getCurrentScreenWidth());
    }
    let timer;
    function resizeController() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          handleScreenResize();
        }, 500);
      }
    }
    window.addEventListener("resize", resizeController, false);
    return () => window.removeEventListener("resize", handleScreenResize);
  }, [getCurrentScreenWidth]);
  return screenWidth;
}
