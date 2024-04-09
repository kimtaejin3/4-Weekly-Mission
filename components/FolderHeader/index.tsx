import styles from "./styles.module.css";
import logo from "@/assets/header-logo.svg";
import { useEffect, useState } from "react";
import { useAsync } from "@/hooks/useAsync";
import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/api/user";

export function FolderHeader() {
  const [user, setUser] = useState<User>({} as User);
  const [loading, error, getUserAsync] = useAsync(getUser);

  const handleLoadUser = async () => {
    const userData = await getUserAsync();
    setUser(userData.data[0]);
  };

  useEffect(() => {
    //개선
    if (localStorage.getItem("accessToken")) {
      handleLoadUser();
    }
  }, []);

  return (
    <header className={styles.header}>
      {error && <div>네트워크 오류입니다. 인터넷 연결상태를 확인해주세요</div>}
      {loading && <div>로딩중</div>}
      <div className={styles.headings}>
        <h1 className={styles["header-logo"]}>
          <Link href="/">
            <Image src={logo} alt="header_logo" />
          </Link>
        </h1>

        {user ? (
          <>
            <div className={styles["headerProfile"]}>
              <img
                className={styles.profileImg}
                src={user.image_source}
                alt="profileImg"
              />
              <p className={styles.profileEmail} style={{ fontSize: "1.2rem" }}>
                {user.email}
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
