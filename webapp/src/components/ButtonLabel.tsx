import {
  ButtonLabelPositions,
  LabelableButtonType,
} from "../utils/ButtonHelper";

export interface ButtonLabelPropType {
  label: string;
  button: LabelableButtonType;
  labelActive: boolean;
}

export default function ButtonLabel(props: ButtonLabelPropType) {
  return (
    <div
      className={`${ButtonLabelPositions.get(props.button)} ${
        props.labelActive ? "bg-red-500" : "bg-white"
      } text-black w-max p-2 ${
        props.button === "ButtonFront" ? "rounded-l-md" : "rounded-b-md"
      }`}
    >
      {props.label}
    </div>
  );
}
