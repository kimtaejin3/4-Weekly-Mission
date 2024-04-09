import styles from "./styles.module.css";
import logo from "@/assets/header-logo.svg";
import { useEffect, useState } from "react";
import { useAsync } from "../../hooks/useAsync";
import Image from "next/image";
import Link from "next/link";

interface User {
  profileImageSource: string;
  email: string;
}

export function Header({
  userEmail,
  userImage,
}: {
  userEmail: string;
  userImage: string;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headings}>
        <h1 className={styles["header-logo"]}>
          <Link href="/">
            <Image src={logo} alt="header_logo" />
          </Link>
        </h1>
        {true ? (
          <>
            <div className={styles["headerProfile"]}>
              <img
                className={styles.profileImg}
                src={userImage}
                alt="profileImg"
              />
              <p className={styles.profileEmail} style={{ fontSize: "1.2rem" }}>
                {userEmail}
              </p>
            </div>
          </>
        ) : (
          <Link href="/signin" className="btn">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
