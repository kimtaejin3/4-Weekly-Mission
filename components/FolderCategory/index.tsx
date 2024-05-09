import styles from "./styles.module.css";
import { Folder } from "@/types";
import Link from "next/link";
import { useContext } from "react";
import { ModalDispatchContext } from "@/context/modalContext";

interface Props {
  folders: Folder[];
  selectedId: string | null;
}

export function FolderCategory({ folders, selectedId }: Props) {
  const dispatch = useContext(ModalDispatchContext)!;

  const handleFolderAddClick = (e: React.MouseEvent) => {
    dispatch({
      type: "showModal",
      payload: {
        modalType: "AddModal",
        data: null,
      },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tags}>
          <Link
            href={{
              pathname: `/folder`,
            }}
            className={`${styles.tag} ${!selectedId ? styles.selected : ""}`}
          >
            전체
          </Link>
          {folders.map((folder) => (
            <Link
              href={{
                pathname: `${folder.id}`,
                query: { name: folder.name },
              }}
              className={`${styles.tag} ${
                folder.id == selectedId ? styles.selected : ""
              }`}
              key={folder.id}
              id={folder.id}
            >
              {folder.name}
            </Link>
          ))}
        </div>
        <span className={styles.folderAddBtn} onClick={handleFolderAddClick}>
          폴더 추가+
        </span>
      </div>
    </>
  );
}
