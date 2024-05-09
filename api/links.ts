import { instance } from "./axios";

export async function addLinks(url: string, folderId: number) {
  return instance.post("/links", { url, folderId });
}
