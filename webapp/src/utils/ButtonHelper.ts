import { useEffect } from "react";

export enum Button {
  BUTTON_1,
  BUTTON_2,
  BUTTON_3,
  BUTTON_4,
  BUTTON_5,
}

export const ButtonLabelPositions = new Map([
  [Button.BUTTON_1, "absolute top-0 -translate-x-1/2 left-[96px]"],
  [Button.BUTTON_2, "absolute top-0 -translate-x-1/2 left-[298px]"],
  [Button.BUTTON_3, "absolute top-0 -translate-x-1/2 left-[500px]"],
  [Button.BUTTON_4, "absolute top-0 -translate-x-1/2 left-[702px]"],
]);

export const ButtonCodeMap = new Map([
  ["Digit1", Button.BUTTON_1],
  ["Digit2", Button.BUTTON_2],
  ["Digit3", Button.BUTTON_3],
  ["Digit4", Button.BUTTON_4],
  ["KeyM", Button.BUTTON_5],
  // ["Enter", Button.SCROLL_PRESS],
  // ["Escape", Button.FRONT_BUTTON],
]);

export const useKeyDown = (callbacks: Partial<Record<Button, () => void>>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const button = ButtonCodeMap.get(e.code);
      if (button === undefined) return;
      callbacks[button]?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
};

export const useKeyUp = (callbacks: Partial<Record<Button, () => void>>) => {
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      const button = ButtonCodeMap.get(e.code);
      if (button === undefined) return;
      callbacks[button]?.();
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });
};

// NOTE: Not implemented, but could be used in addition to or instead of useKeyDown and useKeyUp
export const useKeyPress = (callbacks: Partial<Record<Button, () => void>>) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      const button = ButtonCodeMap.get(e.code);
      if (button === undefined) return;
      callbacks[button]?.();
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });
};

export const useWheel = (callback: (direction: "left" | "right") => void) => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const right = e.deltaX > 0;
      callback(right ? "right" : "left");
    };
    document.addEventListener("wheel", handleWheel);
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  });
};
