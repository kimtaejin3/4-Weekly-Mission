export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;

export const EMAIL_ERROR_MESSAGE = {
  inValid: "이메일을 확인해 주세요",
  empty: "이메일을 입력하지 않았습니다.",
  notCorrect: "올바른 이메일 주소가 아닙니다.",
  duplicated: "이미 사용 중인 이메일입니다.",
};

export const PASSWORD_ERROR_MESSAGE = {
  inValid: "비밀번호를 확인해 주세요",
  empty: "패스워드를 입력하지 않았습니다.",
  notCorrect: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
};

export const PASSWORD_CONFIRM_ERROR_MESSAGE = {
  notEqual: "비밀번호가 일치하지 않아요.",
};

Object.freeze(EMAIL_ERROR_MESSAGE);
Object.freeze(PASSWORD_ERROR_MESSAGE);
Object.freeze(PASSWORD_CONFIRM_ERROR_MESSAGE);
