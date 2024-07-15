import { useState } from "react";
import ButtonLabel from "./components/ButtonLabel";
import { Button, useKeyDown, useKeyUp, useWheel } from "./utils/ButtonHelper";

export default function App() {
  const [labelState, setLabelState] = useState<
    Partial<Record<Button, boolean>>
  >({
    [Button.BUTTON_1]: false,
    [Button.BUTTON_2]: false,
    [Button.BUTTON_3]: false,
    [Button.BUTTON_4]: false,
  });

  const [progress, setProgress] = useState(0);

  useKeyDown({
    [Button.BUTTON_1]: () =>
      setLabelState({ ...labelState, [Button.BUTTON_1]: true }),
    [Button.BUTTON_2]: () =>
      setLabelState({ ...labelState, [Button.BUTTON_2]: true }),
    [Button.BUTTON_3]: () =>
      setLabelState({ ...labelState, [Button.BUTTON_3]: true }),
    [Button.BUTTON_4]: () =>
      setLabelState({ ...labelState, [Button.BUTTON_4]: true }),
  });

  useKeyUp({
    [Button.BUTTON_1]: () =>
      setLabelState({ ...labelState, [Button.BUTTON_1]: false }),
    [Button.BUTTON_2]: () =>
      setLabelState({ ...labelState, [Button.BUTTON_2]: false }),
    [Button.BUTTON_3]: () =>
      setLabelState({ ...labelState, [Button.BUTTON_3]: false }),
    [Button.BUTTON_4]: () =>
      setLabelState({ ...labelState, [Button.BUTTON_4]: false }),
  });

  useWheel((direction) => {
    const newProgress = direction === "right" ? progress + 1 : progress - 1;
    setProgress(newProgress < 0 ? 0 : newProgress > 100 ? 100 : newProgress);
  });

  return (
    <div className="relative" style={{ height: 480, width: 800 }}>
      <div className="absolute top-[50px] left-0 right-0 bottom-0">
        <div className="w-3/4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <ButtonLabel
        label="Button 1"
        button={Button.BUTTON_1}
        buttonPressed={labelState[Button.BUTTON_1] ?? false}
      />
      <ButtonLabel
        label="Button 2"
        button={Button.BUTTON_2}
        buttonPressed={labelState[Button.BUTTON_2] ?? false}
      />
      <ButtonLabel
        label="Button 3"
        button={Button.BUTTON_3}
        buttonPressed={labelState[Button.BUTTON_3] ?? false}
      />
      <ButtonLabel
        label="Button 4"
        button={Button.BUTTON_4}
        buttonPressed={labelState[Button.BUTTON_4] ?? false}
      />
    </div>
  );
}
