import { Button, ButtonLabelPositions } from "../utils/ButtonHelper";

interface PropType {
  label: string;
  button: Button;
  buttonPressed: boolean;
}

export default function ButtonLabel(props: PropType) {
  return (
    <div
      className={`${ButtonLabelPositions.get(props.button)} ${
        props.buttonPressed ? "bg-red-500" : "bg-white"
      } text-black w-max p-2 rounded-b-md`}
    >
      {props.label}
    </div>
  );
}
