import { Header, Footer, CardList } from "../../components";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getFolderInfo } from "@/api/api";
import { useAsync } from "@/hooks/useAsync";
import { FolderInfo } from "@/types";
import { SearchInput } from "@/components/SearchInput";

export default function Share() {
  const [folderInfo, setFolderInfo] = useState<FolderInfo>({} as FolderInfo);
  const [loading, error, getFolderInfoAsync] = useAsync(getFolderInfo);

  const loadFolderInfo = async () => {
    const data = await getFolderInfoAsync();
    if (!data) return;
    setFolderInfo(data.folder);
  };

  useEffect(() => {
    loadFolderInfo();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <div className={styles["main-headings"]}>
          <div className={styles["profile"]}>
            <img
              className={styles["profile-cover"]}
              src={folderInfo.owner.profileImageSource}
              alt="profile"
            />
            <div className={styles["profile-author"]}>
              @{folderInfo.owner.name}
            </div>
            <h2 className={styles["profile-title"]}>{folderInfo?.name}</h2>
            {error?.message && <div>{error.message}</div>}
          </div>
        </div>

        <div className={styles["wrapper"]}>
          <SearchInput />
          {error?.message && <div>{error.message}</div>}

          <CardList links={folderInfo.links} />
        </div>
      </main>
      <Footer />
    </>
  );
}