import linkImg from "@/assets/link.png";
import styles from "./styles.module.css";
import { useState, CSSProperties, useContext, Dispatch } from "react";
import { Folder } from "@/types";
import Image from "next/image";
import { ModalDispatchContext } from "@/context/modalContext";

interface Props {
  folders: Folder[];
  style: CSSProperties;
}

export function FolderAddLinkArea({ style, folders }: Props) {
  const [linkUrl, setLinkUrl] = useState("");
  const dispatch = useContext(ModalDispatchContext)!;

  const handleAddLinkClick = () => {
    dispatch({
      type: "showModal",
      payload: { modalType: "AddLinkModal", data: { folders, linkUrl } },
    });
  };

  return (
    <>
      <div style={style} id="addLinkArea" className={styles.container}>
        <div className={styles.addLinkAreaWrapper}>
          <div className={styles.addLinkArea}>
            <Image src={linkImg} alt="linkIconImg" />
            <input
              className={styles.addLinkInput}
              type="url"
              placeholder="링크를 추가해 보세요"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <button className={styles.btn} onClick={handleAddLinkClick}>
              추가하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
