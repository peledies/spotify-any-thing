import { useEffect, useState } from "react";
import ButtonLabel from "./components/ButtonLabel";
import { Button, ButtonCodeMap } from "./utils/ButtonHelper";

export default function App() {
  const [labelState, setLabelState] = useState<Record<Button, boolean>>({
    [Button.BUTTON_1]: false,
    [Button.BUTTON_2]: false,
    [Button.BUTTON_3]: false,
    [Button.BUTTON_4]: false,
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyup);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    const button = ButtonCodeMap.get(e.code);
    if (button === undefined) return;
    setLabelState({ ...labelState, [button]: true });
  };

  const handleKeyup = (e: KeyboardEvent) => {
    e.preventDefault();
    const button = ButtonCodeMap.get(e.code);
    if (button === undefined) return;
    setLabelState((prev) => {
      return { ...labelState, [button]: false };
    });
  };

  return (
    <div
      className="border border-white box-border relative"
      style={{ height: 480, width: 800 }}
    >
      <ButtonLabel
        label="Button 1"
        button={Button.BUTTON_1}
        buttonPressed={labelState[Button.BUTTON_1]}
      />
      <ButtonLabel
        label="Button 2"
        button={Button.BUTTON_2}
        buttonPressed={labelState[Button.BUTTON_2]}
      />
      <ButtonLabel
        label="Button 3"
        button={Button.BUTTON_3}
        buttonPressed={labelState[Button.BUTTON_3]}
      />
      <ButtonLabel
        label="Button 4"
        button={Button.BUTTON_4}
        buttonPressed={labelState[Button.BUTTON_4]}
      />
    </div>
  );
}
