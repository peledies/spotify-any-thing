import ButtonLabel, { ButtonLabelPropType } from "../components/ButtonLabel";

export default function ButtonLabels(props: {
  buttonLabels: ButtonLabelPropType[];
}) {
  return (
    <>
      {props.buttonLabels.map((label) => (
        <ButtonLabel key={label.button} {...label} />
      ))}
    </>
  );
}
