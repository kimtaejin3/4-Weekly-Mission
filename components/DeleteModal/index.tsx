import styles from "./styles.module.css";

interface Props {
  title: string;
  description: string;
}

export const DeleteModal = ({ title, description }: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <button className={styles.btn}>삭제하기</button>
    </div>
  );
};
