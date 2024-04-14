import { getCookie } from "@/utils/cookie";

const BASE_URL = "https://bootcamp-api.codeit.kr/api";

export async function getUser() {
  const response = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("유저정보 얻기 실패");
  }

  const body = await response.json();
  return body;
}
