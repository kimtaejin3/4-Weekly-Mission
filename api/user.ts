import { User } from "@/types";
import { instance } from "./axios";

export async function getUser(): Promise<User[]> {
  return (await instance.get("/users")).data;
}
