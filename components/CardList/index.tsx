import { Card } from "../Card";
import styles from "./styles.module.css";
import { FolderCard } from "../../pages/folder/components/FolderCard";
import { Folder, Link } from "../../types";
import { useSearch } from "@/hooks/useSearch";
import { filterData } from "@/utils/filterData";

interface Props {
  links: Link[];
  folders?: Folder[];
}

export function CardList(props: Props) {
  const isFolderCard = "folders" in props;

  const { query } = useSearch();
  const santinizedQuery = query[0] ? query[0].split(" ").join("") : "";

  const filteredLinks = filterData<Link>({
    list: props.links,
    targetKeys: ["title", "url", "description"],
    keyword: santinizedQuery,
  });

  return (
    <ul className={styles["l_row"]}>
      {filteredLinks.map((link) => {
        return (
          <li key={link.id} className={styles["l_col"]}>
            {!isFolderCard ? (
              <Card link={link} />
            ) : (
              <FolderCard link={link} folders={props.folders as Folder[]} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
