import { instance } from "./axios";

export async function addFolder(name: string) {
  return instance.post("/folders", { name });
}

export async function modifyFolder(id: string, name: string) {
  return instance.put(`/folders/${id}`, { name });
}

export async function deleteFolder(id: string) {
  return instance.delete(`/folders/${id}`);
}