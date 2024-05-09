import { instance } from "./axios";

export async function addFolder(name: string) {
  return instance.post("/folders", { name });
}
