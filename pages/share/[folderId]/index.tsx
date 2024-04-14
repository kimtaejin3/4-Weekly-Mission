import { Header, Footer, CardList, FolderHeader } from "../../../components";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useAsync } from "@/hooks/useAsync";
import { FolderInfo, Link, User } from "@/types";
import { SearchInput } from "@/components/SearchInput";
import { getFolder, getLinks, getUser } from "@/api/share";
import { useRouter } from "next/router";

export default function Share() {
  const [folderLoading, folderError, getFolderAsync] = useAsync(getFolder);
  const [userLoading, userError, getUserAsync] = useAsync(getUser);
  const [linksLoading, linksError, getLinksAsync] = useAsync(getLinks);
  const [folderName, setFolderName] = useState("");
  const [userId, setUserId] = useState<number>();
  const [user, setUser] = useState<User>();
  const [links, setLinks] = useState<Link[]>();
  const router = useRouter();
  const { folderId } = router.query;

  const handleLoadFolder = async (options: { folderId: string }) => {
    const data = await getFolderAsync(options);
    if (!data || data.data.length === 0) {
      return;
    }
    setFolderName(data.data[0].name);
    setUserId(data.data[0].user_id);
  };

  const handleLoadUser = async (options: { userId: number }) => {
    const data = await getUserAsync(options);
    if (!data) {
      return;
    }
    setUser(data.data[0]);
  };

  const handleLoadLinks = async (options: {
    userId: string;
    folderId: string;
  }) => {
    const data = await getLinksAsync(options);
    if (!data) {
      return;
    }
    setLinks(data.data);
  };

  useEffect(() => {
    if (!folderId) return;
    handleLoadFolder({ folderId: folderId as string });
  }, [folderId]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    handleLoadUser({ userId });
    handleLoadLinks({ userId: String(userId), folderId: folderId as string });
  }, [userId]);

  return (
    <>
      <FolderHeader />
      <main>
        <div className={styles["main-headings"]}>
          <div className={styles["profile"]}>
            {userLoading && <div>loading</div>}
            <img
              className={styles["profile-cover"]}
              src={user?.image_source}
              alt="profile"
            />
            <div className={styles["profile-author"]}>
              @{user?.name || "It doesnt exist  "}
            </div>
            <h2 className={styles["profile-title"]}>
              {folderName || "존재하지 않는 폴더입니다"}
            </h2>
          </div>
        </div>

        <div className={styles["wrapper"]}>
          <SearchInput />

          {!linksLoading ? (
            links ? (
              <CardList links={links} />
            ) : (
              <div>링크 정보들이 없습니다.</div>
            )
          ) : (
            <div>로딩중</div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
