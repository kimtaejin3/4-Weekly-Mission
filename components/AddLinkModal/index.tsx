import { useState } from "react";
import styles from "./styles.module.css";
import { Folder } from "../../types";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { addLinks } from "@/api/links";

interface Props {
  folderId: string;
  folders: Folder[];
  linkUrl: string;
}

export const AddLinkModal = ({ folderId, folders, linkUrl }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = new QueryClient();
  const mutation = useMutation({
    mutationFn: (folder: { url: string; folderId: number }) =>
      addLinks(folder.url, folder.folderId),
    onError: () => {
      alert("링크 추가에 실패하였습니다.");
    },
    onSuccess: () => {
      alert("링크를 성공적으로 추가했습니다.");
      queryClient.invalidateQueries({ queryKey: [`links-${selectedId}`] });
    },
  });

  const handleFolderClick = (id: string) => {
    setSelectedId(id);
  };

  const handleAddLinks = () => {
    mutation.mutate({ url: linkUrl.trim(), folderId: Number(selectedId) });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>폴더에 추가</h2>
      <p className={styles.description}>{linkUrl}</p>
      <ul className={styles.select}>
        {folders?.map((folder) => (
          <li
            key={folder.id}
            className={`${styles.option} ${
              selectedId === folder.id ? `${styles.active}` : ""
            }`}
            onClick={() => handleFolderClick(folder.id)}
          >
            <div className={styles.optionContainer}>
              <span className={styles.optionTitle}>{folder.name}</span>
              <span className={styles.optionSubTitle}>
                {folder.link_count}개 링크
              </span>
            </div>
          </li>
        ))}
      </ul>
      <button className={styles.btn} onClick={handleAddLinks}>
        추가하기
      </button>
    </div>
  );
};
