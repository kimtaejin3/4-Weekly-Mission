import { Folder, FolderInfo, Link, User } from "@/types";
import { getCookie } from "@/utils/cookie";
import { instance } from "./axios";

export async function getUserFolderList(): Promise<Folder[]> {
  return (await instance.get("/folders")).data;
}

export async function getUserLinks({
  folderId,
}: {
  folderId: string | null;
}): Promise<Link[]> {
  if (!folderId) {
    return (await instance.get(`/links`)).data;
  }

  return (await instance.get(`/folders/${folderId}/links`)).data;
}
