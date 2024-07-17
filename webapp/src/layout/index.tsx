import { PropsWithChildren } from "react";

interface PropType {
  showBorder?: boolean;
}

export default function Layout(props: PropsWithChildren<PropType>) {
  return (
    <div
      className={`relative ${props.showBorder && "border border-white"}`}
      style={{ height: 480, width: 800 }}
    >
      {props.children}
    </div>
  );
}
