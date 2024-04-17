import {
  ActionType,
  ModalType,
  PayloadType,
} from "@/components/Modal/ModalType";
import { Dispatch, ReactNode, createContext, useReducer } from "react";

const initialState: ModalType = {
  type: "",
  isOpen: false,
  data: null,
};

function reducer(state: ModalType, action: ActionType) {
  switch (action.type) {
    case "showModal": {
      return {
        isOpen: true,
        type: action.payload.modalType,
        data: action.payload.data,
      };
    }
    case "hideModal": {
      return {
        ...state,
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const ModalContext = createContext(initialState);
export const ModalDispatchContext = createContext<Dispatch<ActionType> | null>(
  null
);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [modalData, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={modalData}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
}
