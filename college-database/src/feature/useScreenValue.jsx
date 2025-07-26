import { useState, useEffect } from "react";

 const useScreenValue = () => {
  const [value, setValue] = useState(getValue(window.innerWidth));

  function getValue(width) {
    if (width < 640) return "small";       // e.g., mobile
    else if (width < 1024) return "medium"; // e.g., tablet
    else return "large";                   // e.g., desktop
  }

  useEffect(() => {
    const handleResize = () => {
      setValue(getValue(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return value;
};

export default useScreenValue;
