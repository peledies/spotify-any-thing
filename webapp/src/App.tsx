import { useState } from "react";
import ButtonLabel from "./components/ButtonLabel";
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

  return (
    <Layout showBorder={true}>
      <ButtonLabel
        button="Button1"
        label="Button 1"
        labelActive={labelState.Button1 ?? false}
        {...labelStyles}
      />
      <ButtonLabel
        button="Button2"
        label="Button 2"
        labelActive={labelState.Button2 ?? false}
        {...labelStyles}
      />
      <ButtonLabel
        button="Button3"
        label="Button 3"
        labelActive={labelState.Button3 ?? false}
        {...labelStyles}
      />
      <ButtonLabel
        button="Button4"
        label="Button 4"
        labelActive={labelState.Button4 ?? false}
        {...labelStyles}
      />
      <ButtonLabel
        button="ButtonFront"
        label="Button Front"
        labelActive={labelState.ButtonFront ?? false}
        {...labelStyles}
      />
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
