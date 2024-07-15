export enum Button {
  BUTTON_1,
  BUTTON_2,
  BUTTON_3,
  BUTTON_4,
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
  // ["KeyM", Button.BUTTON_5],
  // ["Enter", Button.SCROLL_PRESS],
  // ["Escape", Button.FRONT_BUTTON],
]);
