const BASE_URL = "https://bootcamp-api.codeit.kr/api/linkbrary/v1";

export async function postUserSignin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${BASE_URL}/auth/sign-in`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("로그인 실패하였습니다.");
  }

  const body = await response.json();
  return body;
}

export async function postUserSignUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${BASE_URL}/auth/sign-up`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("로그인 실패하였습니다.");
  }

  const body = await response.json();
  return body;
}

export async function postCheckEmail({ email }: { email: string }) {
  const response = await fetch(`${BASE_URL}/check-email`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("emailDuplication");
    } else {
      throw new Error("failToCheckEmail");
    }
  }

  const body = await response.json();
  return body;
}
