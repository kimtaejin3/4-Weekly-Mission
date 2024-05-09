import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import styles from "./styles.module.css";
import { addFolder } from "@/api/folder";
import { useState } from "react";

export const AddModal = () => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (name: string) => addFolder(name),
    onError: () => {
      alert("폴더를 추가하는데 실패하였습니다.");
    },
    onSuccess: () => {
      alert("폴더를 성공적으로 추가했습니다.");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const handleAddFolder = () => {
    mutation.mutate(name);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>폴더 추가</h2>
      <input
        className={styles.input}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="내용 입력"
      />
      <button className={styles.btn} onClick={handleAddFolder}>
        추가하기
      </button>
    </div>
  );
};
