import { useEffect } from "react";
import { useState, useCallback } from "react";

const HandleUserKeyPress = (props) => {
  const [keyPress, setKeyPress] = useState("");

  const handleKeyPress = useCallback((event) => {
    const { key, keyCode } = event;
    if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
      setKeyPress(key);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return keyPress;
};

export default HandleUserKeyPress;
