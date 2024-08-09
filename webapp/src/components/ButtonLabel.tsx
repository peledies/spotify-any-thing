import {
  ButtonLabelPositions,
  Buttons,
  LabelableButtons,
} from '../utils/ButtonHelper';

export interface ButtonLabelPropType {
  label: string;
  button: LabelableButtons;
  labelActive?: boolean;
  styleClasses?: string;
  activeStyleClasses?: string;
}

export default function ButtonLabel(props: ButtonLabelPropType) {
  const styleClasses = props.styleClasses ?? 'bg-white text-black';
  const activeStyleClasses = props.activeStyleClasses ?? styleClasses;
  return (
    <div
      className={`${ButtonLabelPositions.get(props.button)} ${
        props.labelActive ? activeStyleClasses : styleClasses
      } w-max p-2 ${
        props.button === Buttons.ButtonFront ? 'rounded-l-md' : 'rounded-b-md'
      }`}
    >
      {props.label}
    </div>
  );
}
