import styles from "./styles.module.css";
import deleteImg from "@/assets/delete.png";
import penImg from "@/assets/pen.png";
import shareImg from "@/assets/share.png";
import Image from "next/image";
import { useModal } from "@/hooks/useModal";
import { DeleteModal, ModifyModal, ShareModal } from "@/components";
import { useContext } from "react";
import { ModalDispatchContext } from "@/context/modalContext";

export function FolderControl({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: string;
}) {
  const dispatch = useContext(ModalDispatchContext)!;

  const handleDeleteClick = () => {
    dispatch({
      type: "showModal",
      payload: {
        modalType: "DeleteModal",
        data: { title: "링크 삭제", description: folderName, folderId },
      },
    });
  };

  const handleModifyClick = () => {
    dispatch({
      type: "showModal",
      payload: {
        modalType: "ModifyModal",
        data: { folderName, folderId },
      },
    });
  };

  const handleShareClick = () => {};

  return (
    <>
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
