import styles from "./styles.module.css";
import { getTimeAgo, formatDate } from "@/utils/time";
import noImg from "@/assets/noImg.png";
import starImg from "@/assets/star.png";
import kebabImg from "@/assets/kebab.png";
import { useState } from "react";
import { PopOver, DeleteModal, AddLinkModal } from "@/components";
import { useModal } from "@/hooks/useModal";
import { Link, Folder } from "@/types";
import Image from "next/image";

interface Props {
  link: Link;
  folders: Folder[];
}

export function FolderCard({ link, folders }: Props) {
  const createdAt = "createdAt" in link ? "createdAt" : "created_at";
  const imageSource = "imageSource" in link ? "imageSource" : "image_source";

  const [openPopOver, setOpenPopOver] = useState(false);

  const handlePopOverClose = () => {
    setOpenPopOver(false);
  };

  const handleMoreBtn = (e: React.MouseEvent) => {
    //a태그 페이지 이동 막기
    e.preventDefault();
    if (openPopOver) {
      return;
    }
    setOpenPopOver(true);
  };

  return (
    <>
      <a
        className={styles.container}
        href={link.url}
        target="_blank"
        rel="noreferrer"
      >
        <PopOver
          openPopOver={openPopOver}
          handlePopOverClose={handlePopOverClose}
        />
        <div className={styles.link}>
          <div className={styles["link-cover"]}>
            {/* <Image src={noImg} alt="cardCover" /> */}
            <img src={link[imageSource]} alt="cardCover" />
          </div>
          <button className={styles.likeBtn}>
            <Image src={starImg} alt="likeBtn" />
          </button>
          <div className={styles["link-contents"]}>
            <div className={styles["link-header"]}>
              <p className={styles["link-update"]}>
                {getTimeAgo(link[createdAt])}
              </p>
              <button onClick={handleMoreBtn} className={styles.moreBtn}>
                <Image id="moreBtn" src={kebabImg} alt="kebabImg" />
              </button>
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
