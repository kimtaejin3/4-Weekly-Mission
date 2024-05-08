import styles from "./styles.module.css";
import logo from "@/assets/header-logo.svg";
import { useEffect, useState } from "react";
import { useAsync } from "@/hooks/useAsync";
import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function FolderHeader() {
  const [user, setUser] = useState<User>({} as User);
  const { isLoading, error, data } = useQuery({
    queryKey: ["fh-user"],
    queryFn: getUser,
    retry: false,
  });

  if (isLoading) {
    return <>로딩중</>;
  }

  if (error) {
    console.log(error.message.includes("401"));
  }

  return (
    <header className={styles.header}>
      <div className={styles.headings}>
        <h1 className={styles["header-logo"]}>
          <Link href="/">
            <Image src={logo} alt="header_logo" />
          </Link>
        </h1>

        {data ? (
          <>
            <div className={styles["headerProfile"]}>
              <img
                className={styles.profileImg}
                src={data[0]?.image_source}
                alt="profileImg"
              />
              <p className={styles.profileEmail} style={{ fontSize: "1.2rem" }}>
                {data[0]?.email}
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
