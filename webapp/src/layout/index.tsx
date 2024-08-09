import { PropsWithChildren } from 'react';
import ButtonLabel, { ButtonLabelPropType } from '../components/ButtonLabel';
import { Buttons } from '../utils/ButtonHelper';

type ButtonLabelPropNoButton = Omit<ButtonLabelPropType, 'button'>;

interface PropType {
  showBorder?: boolean;
  buttonLabel1?: ButtonLabelPropNoButton;
  buttonLabel2?: ButtonLabelPropNoButton;
  buttonLabel3?: ButtonLabelPropNoButton;
  buttonLabel4?: ButtonLabelPropNoButton;
  buttonLabelFront?: ButtonLabelPropNoButton;
}

export default function Layout(props: PropsWithChildren<PropType>) {
  return (
    <div
      className={`relative ${props.showBorder && 'border border-white'}`}
      style={{ height: 480, width: 800 }}
    >
      {props.buttonLabel1 && (
        <ButtonLabel button={Buttons.Button1} {...props.buttonLabel1} />
      )}
      {props.buttonLabel2 && (
        <ButtonLabel button={Buttons.Button2} {...props.buttonLabel2} />
      )}
      {props.buttonLabel3 && (
        <ButtonLabel button={Buttons.Button3} {...props.buttonLabel3} />
      )}
      {props.buttonLabel4 && (
        <ButtonLabel button={Buttons.Button4} {...props.buttonLabel4} />
      )}
      {props.buttonLabelFront && (
        <ButtonLabel button={Buttons.ButtonFront} {...props.buttonLabelFront} />
      )}
      <div className="absolute top-[50px] left-0 right-0 bottom-0">
        {props.children}
      </div>
    </div>
  );
}
