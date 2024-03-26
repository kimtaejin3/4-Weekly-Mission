import { Card } from "../Card";
import styles from "./styles.module.css";
import { FolderCard } from "../../pages/folder/components/FolderCard";
import { Folder, Link } from "../../types";
import { useSearch } from "@/hooks/useSearch";

interface Props {
  links: Link[];
  folders?: Folder[];
}

export function CardList(props: Props) {
  const isFolderCard = "folders" in props;

  const { query } = useSearch();
  const santinizedQuery = query[0] ? query[0].split(" ").join("") : "";

  return (
    <ul className={styles["l_row"]}>
      {props.links?.map((link) => {
        if (!link.description || !link.title || !link.url) {
          return <></>;
        }

        if (
          link.description.includes(santinizedQuery) ||
          link.title.includes(santinizedQuery) ||
          link.url.includes(santinizedQuery)
        ) {
          return (
            <li key={link.id} className={styles["l_col"]}>
              {!isFolderCard ? (
                <Card link={link} />
              ) : (
                <FolderCard link={link} folders={props.folders as Folder[]} />
              )}
            </li>
          );
        }
      })}
    </ul>
  );
}
