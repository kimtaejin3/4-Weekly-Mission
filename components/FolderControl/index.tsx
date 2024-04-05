import styles from "./styles.module.css";
import deleteImg from "@/assets/delete.png";
import penImg from "@/assets/pen.png";
import shareImg from "@/assets/share.png";
import Image from "next/image";
import { useModal } from "@/hooks/useModal";
import { DeleteModal, ModifyModal, ShareModal } from "@/components";

export function FolderControl({ folderName }: { folderName: string }) {
  const { openModal, modalRef, handleModalClose, handleModalOpen } = useModal();
  const {
    openModal: modifyOpenModal,
    modalRef: modifyModalRef,
    handleModalClose: modifyHandleModalClose,
    handleModalOpen: modifyHandleModalOpen,
  } = useModal();
  const {
    openModal: shareOpenModal,
    modalRef: shareModalRef,
    handleModalClose: shareHandleModalClose,
    handleModalOpen: shareHandleModalOpen,
  } = useModal();

  const handleDeleteClick = () => {
    handleModalOpen();
  };

  const handleModifyClick = () => {
    modifyHandleModalOpen();
  };

  const handleShareClick = () => {
    shareHandleModalOpen();
  };

  return (
    <>
      <DeleteModal
        ref={modalRef}
        openModal={openModal}
        handleModalClose={handleModalClose}
        title="폴더 삭제"
        description={folderName}
      />
      <ModifyModal
        ref={modifyModalRef}
        openModal={modifyOpenModal}
        handleModalClose={modifyHandleModalClose}
        folderName={folderName}
      />
      <ShareModal
        ref={shareModalRef}
        openModal={shareOpenModal}
        handleModalClose={shareHandleModalClose}
        folderName={folderName}
      />
      <div className={styles.container}>
        <div className={styles.folderName}>{folderName}</div>
        {folderName === "전체" ? (
          <></>
        ) : (
          <div className={styles.controlMenu}>
            <button
              className={styles.controlMenuItem}
              onClick={handleShareClick}
            >
              <Image src={shareImg} alt="shareIconImage" />
              <span>공유</span>
            </button>
            <button
              className={styles.controlMenuItem}
              onClick={handleModifyClick}
            >
              <Image src={penImg} alt="penIconImage" />
              <span>이름 변경</span>
            </button>
            <button
              className={styles.controlMenuItem}
              onClick={handleDeleteClick}
            >
              <Image src={deleteImg} alt="deleteIconImage" />
              <span>삭제</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
