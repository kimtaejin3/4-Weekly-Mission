import styles from "./styles.module.css";

interface Props {
  folderName: string;
}

export const ModifyModal = ({ folderName }: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>폴더 이름 변경</h2>
      <input className={styles.input} type="text" defaultValue={folderName} />
      <button className={styles.btn}>변경하기</button>
    </div>
  );
};
