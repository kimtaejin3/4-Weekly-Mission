import { deleteFolder } from "@/api/folder";
import styles from "./styles.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  title: string;
  description: string;
  folderId: string;
}

export const DeleteModal = ({ folderId, title, description }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onError: () => {
      alert("폴더를 삭제하는데 실패하였습니다.");
    },
    onSuccess: () => {
      alert("폴더를 성공적으로 삭제했습니다.");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const handleDeleteFolder = () => {
    mutation.mutate(folderId);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <button className={styles.btn} onClick={handleDeleteFolder}>
        삭제하기
      </button>
    </div>
  );
};
