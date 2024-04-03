import styles from "./styles.module.css";
import noImg from "@/assets/noImg.png";
import { getTimeAgo, formatDate } from "@/utils/time";
import { Link } from "@/types";
import Image from "next/image";

interface Props {
  link: Link;
}

export function Card({ link }: Props) {
  const createdAt = "createdAt" in link ? "createdAt" : "created_at";
  const imageSource = "imageSource" in link ? "imageSource" : "image_source";
  return (
    <>
      <a
        className={styles.container}
        href={link.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.link}>
          <div className={styles["link-cover"]}>
            {link[imageSource] ? (
              <img src={link[imageSource]} alt="cardCover" />
            ) : (
              <Image src={noImg} alt="cardCover" />
            )}
          </div>
          <div className={styles["link-contents"]}>
            <div className={styles["link-header"]}>
              <p className={styles["link-update"]}>
                {getTimeAgo(link[createdAt])}
              </p>
            </div>
            <h2 className={styles["link-title"]}>
              {!link.title ? "제목없음" : link.title}
            </h2>
            <p className={styles["link-description"]}>{link.description}</p>
            <p className={styles["link-date"]}>{formatDate(link[createdAt])}</p>
          </div>
        </div>
      </a>
    </>
  );
}
