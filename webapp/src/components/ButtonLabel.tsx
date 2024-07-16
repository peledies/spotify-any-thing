import {
  ButtonLabelPositions,
  LabelableButtonType,
} from "../utils/ButtonHelper";

export interface ButtonLabelPropType {
  label: string;
  button: LabelableButtonType;
  labelActive: boolean;
  styleClasses?: string;
  activeStyleClasses?: string;
}

export default function ButtonLabel(props: ButtonLabelPropType) {
  const styleClasses = props.styleClasses ?? "bg-white text-black";
  const activeStyleClasses = props.activeStyleClasses ?? styleClasses;
  return (
    <div
      className={`${ButtonLabelPositions.get(props.button)} ${
        props.labelActive ? activeStyleClasses : styleClasses
      } w-max p-2 ${
        props.button === "ButtonFront" ? "rounded-l-md" : "rounded-b-md"
      }`}
    >
      {props.label}
    </div>
  );
}
