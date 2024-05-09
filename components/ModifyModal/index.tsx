import { useState } from "react";
import styles from "./styles.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modifyFolder } from "@/api/folder";

interface Props {
  folderId: string;
  folderName: string;
}

export const ModifyModal = ({ folderId, folderName }: Props) => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (folder: { id: string; name: string }) =>
      modifyFolder(folder.id, folder.name),
    onError: () => {
      alert("폴더명 변경에 실패하였습니다.");
    },
    onSuccess: () => {
      alert("폴더명을 성공적으로 변경했습니다.");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const handleModifyFolder = () => {
    mutation.mutate({ id: folderId, name });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>폴더 이름 변경</h2>
      <input
        className={styles.input}
        onChange={(e) => setName(e.target.value)}
        type="text"
        defaultValue={folderName}
      />
      <button className={styles.btn} onClick={handleModifyFolder}>
        변경하기
      </button>
    </div>
  );
};
