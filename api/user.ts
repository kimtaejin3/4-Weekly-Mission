import { instance } from "./axios";

export async function getUser() {
  return (await instance.get("/users")).data;
}
