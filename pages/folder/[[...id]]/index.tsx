import { Footer } from "@/components";
import { FolderHeader } from "@/components";
import { Modal } from "@/components/Modal";
import { ModalContextProvider } from "@/context/modalContext";
import { CardList, SearchInput } from "@/components";
import { FolderAddLinkArea, FolderCategory, FolderControl } from "@/components";
import styles from "./styles.module.css";
import { getUserFolderList, getUserLinks } from "@/api/api";
import { useSearch } from "@/hooks/useSearch";
import { Folder, Link } from "@/types";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export default function FolderPage() {
  const { isVisible: headerVisible, ref: headerBoundaryRef } =
    useIntersectionObserver();
  const { isVisible: footerVisible, ref: footerBoundaryRef } =
    useIntersectionObserver();
  const search = useSearch();
  const router = useRouter();

  const { id, name } = router.query;
  const selectedName = name || "전체";
  const selectedId = (id && id[0]) || null;

  const {
    isLoading: folderListLoading,
    error: folderListError,
    data: folders,
  } = useQuery({ queryKey: ["folders"], queryFn: getUserFolderList });

  const {
    isLoading: linksLoading,
    error: linksError,
    data: links,
  } = useQuery({
    queryKey: [`links-${selectedId}`],
    queryFn: () => getUserLinks({ folderId: selectedId }),
  });

  return (
    <ModalContextProvider>
      <FolderHeader />
      <main>
        <div style={{ height: "180px" }}>
          <FolderAddLinkArea
            isFloating={!headerVisible && !footerVisible}
            folders={folders as Folder[]}
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
          {folderListLoading ? (
            <div>로딩중입니다...</div>
          ) : folderListError ? (
            <div>폴더 정보들을 가져오는데 실패했습니다.</div>
          ) : (
            //folders를 잘 받아온게 확실
            <FolderCategory
              folders={folders as Folder[]}
              selectedId={selectedId}
            />
          )}
          <FolderControl
            folderId={selectedId as string}
            folderName={selectedName as string}
          />

          {!linksLoading ? (
            links?.length === 0 ? (
              <div className={styles.emptyArea}>저장된 링크가 없습니다</div>
            ) : (
              <div style={{ paddingTop: "20px" }}>
                <CardList links={links as Link[]} folders={folders} />
              </div>
            )
          ) : (
            <div>로딩중</div>
          )}
        </div>
        <div ref={footerBoundaryRef} id="footerBoundary"></div>
      </main>
      <Footer />
      <Modal />
    </ModalContextProvider>
  );
}
