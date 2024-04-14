import { CardList, SearchInput } from "@/components";
import { FolderAddLinkArea, FolderCategory, FolderControl } from "../";
import styles from "./styles.module.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { getUserFolderList, getUserLinks } from "@/api/api";
import { useSearch } from "@/hooks/useSearch";
import { useAsync } from "@/hooks/useAsync";
import { Folder, Link } from "@/types";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useRouter } from "next/router";

export function FolderMain() {
  const [folders, setFolders] = useState([] as Folder[]);
  const router = useRouter();

  const { id, name } = router.query;
  const selectedId = (id && id[0]) || null;
  const selectedName = name || "전체";

  const [links, setLinks] = useState([] as Link[]);
  const [folderListLoading, folderListError, getFolderListAsync] =
    useAsync(getUserFolderList);
  const [linksLoading, linksError, getLinksAsync] = useAsync(getUserLinks);
  const search = useSearch();
  const { isVisible: headerVisible, ref: headerBoundaryRef } =
    useIntersectionObserver();

  const { isVisible: footerVisible, ref: footerBoundaryRef } =
    useIntersectionObserver();

  const loadFolderList = async () => {
    const folders = await getFolderListAsync();
    if (!folders) return;
    setFolders(folders.data.folder);
  };

  const loadLinks = async (option: { folderId: string | null }) => {
    const links = await getLinksAsync(option);
    if (!links) return;
    setLinks(links.data.folder);
  };

  useEffect(() => {
    loadLinks({ folderId: selectedId });
  }, [selectedId]);

  useEffect(() => {
    loadFolderList();
  }, []);

  return (
    <main>
      <div style={{ height: "180px" }}>
        <FolderAddLinkArea
          isFloating={!headerVisible && !footerVisible}
          folders={folders}
        />
      </div>
      <div id="mainContainer" className={styles.mainContainer}>
        <div ref={headerBoundaryRef} id="headerBoundary"></div>
        <SearchInput />
        {search.query[0] && (
          <p className={styles.searchResult}>
            <span style={{ color: "#000" }}>{search.query[0]}</span>로 검색한
            결과입니다
          </p>
        )}
        <FolderCategory folders={folders} selectedId={selectedId} />
        <FolderControl folderName={selectedName as string} />

        {!linksLoading ? (
          links?.length === 0 ? (
            <div className={styles.emptyArea}>저장된 링크가 없습니다</div>
          ) : (
            <CardList links={links} folders={folders} />
          )
        ) : (
          <div>로딩중</div>
        )}
      </div>
      <div ref={footerBoundaryRef} id="footerBoundary"></div>
    </main>
  );
}
