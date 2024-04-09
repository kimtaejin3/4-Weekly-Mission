import { Folder, FolderInfo, Link, User } from "@/types";
import { instance } from "./axios";

export async function getFolder({
  folderId,
}: {
  folderId: string;
}): Promise<{ data: Omit<Folder, "link">[] }> {
  return (await instance.get(`/folders/${folderId}`)).data;
}

export async function getUser({
  userId,
}: {
  userId: number;
}): Promise<{ data: User[] }> {
  return (await instance.get(`/users/${userId}`)).data;
}

export async function getLinks({
  userId,
  folderId,
}: {
  userId: string;
  folderId: string;
}): Promise<any> {
  return (await instance.get(`/users/${userId}/links?folderId=${folderId}`))
    .data;
}
