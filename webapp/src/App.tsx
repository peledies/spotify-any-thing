import { useState } from "react";
import { ButtonLabelPropType } from "./components/ButtonLabel";
import Layout from "./layout";
import {
  LabelableButtonType,
  useKeyDown,
  useKeyUp,
  useWheel,
} from "./utils/ButtonHelper";

export default function App() {
  const [labelState, setLabelState] = useState<
    Partial<Record<LabelableButtonType, boolean>>
  >({
    Button1: false,
    Button2: false,
    Button3: false,
    Button4: false,
    ButtonFront: false,
  });

  const [progress, setProgress] = useState(0);

  useKeyDown({
    Button1: () => setLabelState({ ...labelState, Button1: true }),
    Button2: () => setLabelState({ ...labelState, Button2: true }),
    Button3: () => setLabelState({ ...labelState, Button3: true }),
    Button4: () => setLabelState({ ...labelState, Button4: true }),
    Button5: () => alert("Button 5 pressed!"),
    ButtonFront: () => setLabelState({ ...labelState, ButtonFront: true }),
    ButtonWheel: () => alert("Wheel pressed!"),
  });

  useKeyUp({
    Button1: () => setLabelState({ ...labelState, Button1: false }),
    Button2: () => setLabelState({ ...labelState, Button2: false }),
    Button3: () => setLabelState({ ...labelState, Button3: false }),
    Button4: () => setLabelState({ ...labelState, Button4: false }),
    ButtonFront: () => setLabelState({ ...labelState, ButtonFront: false }),
  });

  useWheel((direction) => {
    const newProgress = direction === "right" ? progress + 5 : progress - 5;
    setProgress(newProgress < 0 ? 0 : newProgress > 100 ? 100 : newProgress);
  });

  const labelStyles = {
    styleClasses: "text-black bg-white",
    activeStyleClasses: "text-white bg-red-600",
  };

  const buttonLabels: ButtonLabelPropType[] = [
    {
      label: "Button 1",
      button: "Button1",
      labelActive: labelState.Button1 ?? false,

      ...labelStyles,
    },
    {
      label: "Button 2",
      button: "Button2",
      labelActive: labelState.Button2 ?? false,
      ...labelStyles,
    },
    {
      label: "Button 3",
      button: "Button3",
      labelActive: labelState.Button3 ?? false,
      ...labelStyles,
    },
    {
      label: "Button 4",
      button: "Button4",
      labelActive: labelState.Button4 ?? false,
      ...labelStyles,
    },
    {
      label: "Button Front",
      button: "ButtonFront",
      labelActive: labelState.ButtonFront ?? false,
      ...labelStyles,
    },
  ];

  return (
    <Layout showBorder={true} buttonLabels={buttonLabels}>
      <div className="absolute top-[50px] left-0 right-0 bottom-0">
        <div className="w-3/4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
