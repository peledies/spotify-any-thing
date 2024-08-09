import { useState } from 'react';
import ButtonLabel from './components/ButtonLabel';
import Layout from './layout';
import {
  Buttons,
  LabelableButtons,
  useKeyDown,
  useKeyUp,
  useWheel,
  WheelDirection,
} from './utils/ButtonHelper';

export default function App() {
  const [labelState, setLabelState] = useState<
    Partial<Record<LabelableButtons, boolean>>
  >({
    [Buttons.Button1]: false,
    [Buttons.Button2]: false,
    [Buttons.Button3]: false,
    [Buttons.Button4]: false,
    [Buttons.ButtonFront]: false,
  });

  const [progress, setProgress] = useState(0);

  useKeyDown({
    [Buttons.Button1]: () =>
      setLabelState({ ...labelState, [Buttons.Button1]: true }),
    [Buttons.Button2]: () =>
      setLabelState({ ...labelState, [Buttons.Button2]: true }),
    [Buttons.Button3]: () =>
      setLabelState({ ...labelState, [Buttons.Button3]: true }),
    [Buttons.Button4]: () =>
      setLabelState({ ...labelState, [Buttons.Button4]: true }),
    [Buttons.Button5]: () => alert('Button 5 pressed!'),
    [Buttons.ButtonFront]: () =>
      setLabelState({ ...labelState, [Buttons.ButtonFront]: true }),
    [Buttons.ButtonWheel]: () => alert('Wheel pressed!'),
  });

  useKeyUp({
    [Buttons.Button1]: () =>
      setLabelState({ ...labelState, [Buttons.Button1]: false }),
    [Buttons.Button2]: () =>
      setLabelState({ ...labelState, [Buttons.Button2]: false }),
    [Buttons.Button3]: () =>
      setLabelState({ ...labelState, [Buttons.Button3]: false }),
    [Buttons.Button4]: () =>
      setLabelState({ ...labelState, [Buttons.Button4]: false }),
    [Buttons.ButtonFront]: () =>
      setLabelState({ ...labelState, [Buttons.ButtonFront]: false }),
  });

  useWheel((direction) => {
    const newProgress =
      direction === WheelDirection.Right ? progress + 5 : progress - 5;
    setProgress(newProgress < 0 ? 0 : newProgress > 100 ? 100 : newProgress);
  });

  const labelStyles = {
    styleClasses: 'text-black bg-white',
    activeStyleClasses: 'text-white bg-red-600',
  };

  return (
    <Layout showBorder={true}>
      <ButtonLabel
        button={Buttons.Button1}
        label="Button 1"
        labelActive={labelState[Buttons.Button1] ?? false}
        {...labelStyles}
      />
      <ButtonLabel
        button={Buttons.Button2}
        label="Button 2"
        labelActive={labelState[Buttons.Button2] ?? false}
        {...labelStyles}
      />
      <ButtonLabel
        button={Buttons.Button3}
        label="Button 3"
        labelActive={labelState[Buttons.Button3] ?? false}
        {...labelStyles}
      />
      <ButtonLabel
        button={Buttons.Button4}
        label="Button 4"
        labelActive={labelState[Buttons.Button4] ?? false}
        {...labelStyles}
      />
      <ButtonLabel
        button={Buttons.ButtonFront}
        label="Button Front"
        labelActive={labelState[Buttons.ButtonFront] ?? false}
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
