import { PropsWithChildren } from "react";
import { ButtonLabelPropType } from "../components/ButtonLabel";
import ButtonLabels from "../components/ButtonLabels";

interface PropType {
  showBorder?: boolean;
  buttonLabels?: ButtonLabelPropType[];
}

export default function Layout(props: PropsWithChildren<PropType>) {
  return (
    <div
      className={`relative ${props.showBorder && "border border-white"}`}
      style={{ height: 480, width: 800 }}
    >
      {props.buttonLabels && <ButtonLabels buttonLabels={props.buttonLabels} />}
      {props.children}
    </div>
  );
}
