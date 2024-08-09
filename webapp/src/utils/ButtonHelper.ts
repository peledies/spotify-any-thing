import { useEffect } from 'react';

/**
 * 7 buttons, sliced every way I can think of
 */

export enum Buttons {
  Button1,
  Button2,
  Button3,
  Button4,
  Button5,
  ButtonFront,
  ButtonWheel,
}

export enum WheelDirection {
  Left,
  Right,
}

export type TopOfScreenButtons =
  | Buttons.Button1
  | Buttons.Button2
  | Buttons.Button3
  | Buttons.Button4;

export type TopButtons = TopOfScreenButtons | Buttons.Button5;
export type SideButtons = Buttons.ButtonWheel | Buttons.ButtonFront;
export type LabelableButtons = TopOfScreenButtons | Buttons.ButtonFront;

/**
 * Not including positions for wheel button or button 5.
 * Wheel covers part of the screen, and button 5 is
 * to the right of the screen
 */
export const ButtonLabelPositions: Map<LabelableButtons, string> = new Map([
  [Buttons.Button1, 'absolute top-0 -translate-x-1/2 left-[96px]'],
  [Buttons.Button2, 'absolute top-0 -translate-x-1/2 left-[298px]'],
  [Buttons.Button3, 'absolute top-0 -translate-x-1/2 left-[500px]'],
  [Buttons.Button4, 'absolute top-0 -translate-x-1/2 left-[702px]'],
  [Buttons.ButtonFront, 'absolute right-0 bottom-[50px]'],
]);

/**
 * Keys are the e.code from a button event,
 * use this to convert an e.code to a Button
 * type
 */
const ButtonCodeMap: Map<string, Buttons> = new Map([
  ['Digit1', Buttons.Button1],
  ['Digit2', Buttons.Button2],
  ['Digit3', Buttons.Button3],
  ['Digit4', Buttons.Button4],
  ['Digit5', Buttons.Button5],
  ['KeyM', Buttons.Button5],
  ['Escape', Buttons.ButtonFront],
  ['Enter', Buttons.ButtonWheel],
]);

const getKeyboardEventHandler = (
  callbacks: Partial<Record<Buttons, () => void>>
) => {
  return (e: KeyboardEvent) => {
    e.preventDefault();
    const button = ButtonCodeMap.get(e.code);
    if (button === undefined) return;
    callbacks[button]?.();
  };
};

export const useKeyDown = (callbacks: Partial<Record<Buttons, () => void>>) => {
  const handleKeyDown = getKeyboardEventHandler(callbacks);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
};

export const useKeyUp = (callbacks: Partial<Record<Buttons, () => void>>) => {
  const handleKeyUp = getKeyboardEventHandler(callbacks);
  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  });
};

export const useWheel = (callback: (direction: WheelDirection) => void) => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const right = e.deltaX > 0;
      callback(right ? WheelDirection.Right : WheelDirection.Left);
    };
    document.addEventListener('wheel', handleWheel);
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  });
};
