import { ModalDispatchContext } from "@/context/modalContext";
import useHandleOutsideClick from "../../hooks/useHandleOutsideClick";
import styles from "./styles.module.css";
import { useContext, useRef } from "react";

interface Props {
  openPopOver: boolean;
  handlePopOverClose: () => void;
  linkUrl: string;
  linkId: number;
}

export function PopOver({
  linkId,
  linkUrl,
  openPopOver,
  handlePopOverClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useContext(ModalDispatchContext)!;

  useHandleOutsideClick(ref, handlePopOverClose);

  const handleLinkDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: "showModal",
      payload: {
        modalType: "DeleteLinkModal",
        data: { linkUrl, linkId },
      },
    });
    handlePopOverClose();
  };

  const handleLinkAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handlePopOverClose();
  };

  return (
    <>
      {openPopOver && (
        <div id="popOver" className={styles.container} ref={ref}>
          <button className={styles.btn} onClick={handleLinkDeleteClick}>
            삭제하기
          </button>
          <button className={styles.btn} onClick={handleLinkAddClick}>
            폴더에 추가
          </button>
        </div>
      )}
    </>
  );
}
