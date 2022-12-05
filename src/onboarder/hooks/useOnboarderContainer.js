import { useRef } from "react";

export function useOnboarderContainer() {
  const containerRef = useRef(null);

  return {
    containerRef,
  };
}
