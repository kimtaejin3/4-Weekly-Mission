import { deleteFolder } from "@/api/folder";
import styles from "./styles.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "@/api/links";

interface Props {
  linkId: number;
  linkUrl: string;
}

export const DeleteLinkModal = ({ linkUrl, linkId }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (linkId: number) => deleteLink(linkId),
    onError: () => {
      alert("링크를 삭제하는데 실패하였습니다.");
    },
    onSuccess: () => {
      alert("링크를 성공적으로 삭제했습니다.");
    },
  });

  const handleDeleteLink = () => {
    mutation.mutate(linkId);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>링크 삭제</h2>
      <p className={styles.description}>{linkUrl}</p>
      <button className={styles.btn} onClick={handleDeleteLink}>
        삭제하기
      </button>
    </div>
  );
};
