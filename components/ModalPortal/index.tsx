import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: ReactNode;
}

export const ModalPortal = ({ children }: Props) => {
  if (typeof window === "undefined") {
    return <></>;
  }

  const el = document.getElementById("modal") as HTMLElement;
  return ReactDOM.createPortal(children, el);
};
