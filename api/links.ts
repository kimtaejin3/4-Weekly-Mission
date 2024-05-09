import { instance } from "./axios";

export async function addLink(url: string, folderId: number) {
  return instance.post("/links", { url, folderId });
}

export async function deleteLink(linkId: number) {
  return instance.delete(`/links/${linkId}`);
}
