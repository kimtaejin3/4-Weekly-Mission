import { Folder, FolderInfo, Link, User } from "@/types";
import { getCookie } from "@/utils/cookie";
import { instance } from "./axios";

const BASE_URL = "https://bootcamp-api.codeit.kr/api";

export async function getUserFolderList(): Promise<Folder[]> {
  return (await instance.get("/folders")).data;
}

export async function getUserLinks({
  folderId,
}: {
  folderId: string | null;
}): Promise<Link[]> {
  const query = folderId ? `?folderId=${folderId}` : "";

  return (await instance.get(`/links${query}`)).data;
}
