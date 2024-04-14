import { Folder, FolderInfo, Link, User } from "@/types";
import { getCookie } from "@/utils/cookie";

const BASE_URL = "https://bootcamp-api.codeit.kr/api";

//추가
export async function getUserFolderList(): Promise<{
  data: { folder: Folder[] };
}> {
  const response = await fetch(`${BASE_URL}/folders`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  if (!response.ok) {
    throw new Error("폴더 정보를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getUserLinks({
  folderId,
}: {
  folderId: string | null;
}): Promise<{ data: { folder: Link[] } }> {
  const query = folderId ? `?folderId=${folderId}` : "";

  const response = await fetch(`${BASE_URL}/links${query}`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  if (!response.ok) {
    throw new Error("폴더 정보를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
