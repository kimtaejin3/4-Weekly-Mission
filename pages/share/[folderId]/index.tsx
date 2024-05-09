import { Footer, CardList, FolderHeader } from "../../../components";
import styles from "./styles.module.css";
import { SearchInput } from "@/components/SearchInput";
import { getFolder, getLinks, getUser } from "@/api/share";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export default function Share() {
  const router = useRouter();

  const { folderId } = router.query;

  const { isLoading, error, data } = useQuery({
    queryKey: ["s-folderInfo"],
    queryFn: () => getFolder({ folderId: folderId as string }),
    enabled: !!folderId,
  });

  const {
    isLoading: isUserLoading,
    error: isUserError,
    data: userData,
  } = useQuery({
    queryKey: ["s-user"],
    queryFn: () => {
      if (!data) return;
      return getUser({ userId: data[0].user_id });
    },
    enabled: !!data,
  });

  const {
    isLoading: isLinksLoading,
    error: isLinksError,
    data: linksData,
  } = useQuery({
    queryKey: ["s-links"],
    queryFn: () => {
      if (!data) return;
      return getLinks({
        userId: data[0].user_id,
        folderId: folderId as string,
      });
    },
    enabled: !!folderId && !!data,
  });

  return (
    <>
      <FolderHeader />
      <main>
        <div className={styles["main-headings"]}>
          <div className={styles["profile"]}>
            {isUserLoading ? (
              "로딩중"
            ) : (
              <>
                <img
                  className={styles["profile-cover"]}
                  src={userData && userData[0].image_source}
                  alt="profile"
                />
                <div className={styles["profile-author"]}>
                  @
                  {(userData && userData[0].name) ||
                    "존재하지 않는 사용자입니다"}
                </div>
              </>
            )}

            <h2 className={styles["profile-title"]}>
              {isLoading
                ? "로딩중..."
                : (data && data[0].name) || "존재하지 않는 폴더입니다"}
            </h2>
          </div>
        </div>

        <div className={styles["wrapper"]}>
          <SearchInput />

          {!isLinksLoading ? (
            linksData ? (
              <CardList links={linksData} />
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
