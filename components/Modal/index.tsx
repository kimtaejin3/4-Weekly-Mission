import { ReactNode, useContext } from "react";
import { AddLinkModal } from "../AddLinkModal";
import { DeleteModal } from "../DeleteModal";
import { ModalPortal } from "../ModalPortal";
import styles from "./styles.module.css";
import { ImCross } from "react-icons/im";
import { AddModal } from "../AddModal";
import { ModifyModal } from "../ModifyModal";
import { ShareModal } from "../ShareModal";
import { ModalDispatchContext, ModalContext } from "@/context/modalContext";
import { AddLinkModalType, AddModalType, ModalType } from "./ModalType";
import { DeleteLinkModal } from "../DeleteLinkModal";

const renderComponent = (modalData: ModalType): ReactNode => {
  switch (modalData.type) {
    case "AddLinkModal":
      return (
        <AddLinkModal
          folderId={modalData.data.folderId}
          folders={modalData.data.folders}
          linkUrl={modalData.data.linkUrl}
        />
      );
    case "AddModal":
      return <AddModal />;
    case "DeleteModal":
      return (
        <DeleteModal
          folderId={modalData.data.folderId}
          title={modalData.data.title}
          description={modalData.data.description}
        />
      );
    case "DeleteLinkModal":
      return (
        <DeleteLinkModal
          linkId={modalData.data.linkId}
          linkUrl={modalData.data.linkUrl}
        />
      );
    case "ModifyModal":
      return (
        <ModifyModal
          folderId={modalData.data.folderId}
          folderName={modalData.data.folderName}
        />
      );
    case "ShareModal":
      return <ShareModal folderName={modalData.data.folderName} />;
    default:
      return <></>;
  }
};

export const Modal = () => {
  const modalData = useContext(ModalContext);
  const dispatch = useContext(ModalDispatchContext)!;

  if (!modalData.isOpen) {
    return <></>;
  }

  const handleModalRemoveClick = () => {
    dispatch({ type: "hideModal" });
  };

  return (
    <ModalPortal>
      <div onClick={handleModalRemoveClick} id={styles.backdrop}></div>
      <div className={styles.container}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={handleModalRemoveClick}>
            <ImCross />
          </button>
          {renderComponent(modalData)}
        </div>
      </div>
    </ModalPortal>
  );
};
