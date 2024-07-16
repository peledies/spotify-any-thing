import { useEffect } from "react";

/**
 * 7 buttons, sliced every way I can think of
 */
export type TopOfScreenButtonTypes =
  | "Button1"
  | "Button2"
  | "Button3"
  | "Button4";
export type WheelButtonType = "ButtonWheel";
export type FrontButtonType = "ButtonFront";
export type TopButtonTypes = TopOfScreenButtonTypes | "Button5";
export type SideButtonTypes = WheelButtonType | FrontButtonType;
export type ButtonTypes = TopButtonTypes | SideButtonTypes;
export type LabelableButtonType = TopOfScreenButtonTypes | FrontButtonType;
export type WheelDirectionType = "left" | "right";

/**
 * Not including positions for wheel button or button 5.
 * Wheel covers part of the screen, and button 5 is
 * to the right of the screen
 */
export const ButtonLabelPositions: Map<LabelableButtonType, string> = new Map([
  ["Button1", "absolute top-0 -translate-x-1/2 left-[96px]"],
  ["Button2", "absolute top-0 -translate-x-1/2 left-[298px]"],
  ["Button3", "absolute top-0 -translate-x-1/2 left-[500px]"],
  ["Button4", "absolute top-0 -translate-x-1/2 left-[702px]"],
  ["ButtonFront", "absolute right-0 bottom-[50px]"],
]);

/**
 * Keys are the e.code from a button event,
 * use this to convert an e.code to a Button
 * type
 */
const ButtonCodeMap: Map<string, ButtonTypes> = new Map([
  ["Digit1", "Button1"],
  ["Digit2", "Button2"],
  ["Digit3", "Button3"],
  ["Digit4", "Button4"],
  ["KeyM", "Button5"],
  ["Escape", "ButtonFront"],
  ["Enter", "ButtonWheel"],
]);

const getKeyboardEventHandler = (
  callbacks: Partial<Record<ButtonTypes, () => void>>
) => {
  return (e: KeyboardEvent) => {
    e.preventDefault();
    const button = ButtonCodeMap.get(e.code);
    if (button === undefined) return;
    callbacks[button]?.();
  };
};

export const useKeyDown = (
  callbacks: Partial<Record<ButtonTypes, () => void>>
) => {
  const handleKeyDown = getKeyboardEventHandler(callbacks);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
};

export const useKeyUp = (
  callbacks: Partial<Record<ButtonTypes, () => void>>
) => {
  const handleKeyUp = getKeyboardEventHandler(callbacks);
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });
};

export const useWheel = (callback: (direction: WheelDirectionType) => void) => {
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
