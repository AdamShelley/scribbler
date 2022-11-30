import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

const createWrapperAndAppendToBody = (wrapperId) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

const OnboardPortal = ({ children, wrapperId = "onboarder-wrapper" }) => {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let created = false;

    if (!element) {
      created = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (created && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

export default OnboardPortal;
