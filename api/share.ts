import { Folder, FolderInfo, Link, User } from "@/types";
import { instance } from "./axios";

export async function getFolder({
  folderId,
}: {
  folderId: string;
}): Promise<Omit<Folder, "link">[]> {
  return (await instance.get(`/folders/${folderId}`)).data;
}

export async function getUser({ userId }: { userId: number }): Promise<User[]> {
  return (await instance.get(`/users/${userId}`)).data;
}

export async function getLinks({
  userId,
  folderId,
}: {
  userId: number;
  folderId: string;
}): Promise<Link[]> {
  return (await instance.get(`/users/${userId}/links?folderId=${folderId}`))
    .data;
}
