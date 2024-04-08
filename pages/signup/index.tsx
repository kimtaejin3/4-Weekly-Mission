import Image from "next/image";
import Link from "next/link";
import GoogleIcon from "@/assets/google.png";
import KakaoIcon from "@/assets/kakao.svg";
import HeaderLogo from "@/assets/header-logo.svg";
import styles from "./styles.module.css";
import { Input } from "@/components";
import { FieldError, UseFormRegisterReturn, useForm } from "react-hook-form";
import { postCheckEmail, postUserSignUp } from "@/api/user";
import { useRouter } from "next/router";
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_REGEX,
  PASSWORD_CONFIRM_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_REGEX,
} from "@/constants/validation";
import {
  EMAIL_PLACEHOLDER,
  PASSWORD_CONFIRM_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from "@/constants/placeholderMessage";
import { useCallback, useEffect } from "react";

type FormType = {
  email: string;
  password: string;
  passwordConfirm: string;
};

type CheckEmailResponseErrorType = {
  message: string;
};

async function checkIsDuplicated(email: string) {
  try {
    await postCheckEmail({ email });
    return true;
  } catch (e) {
    if ((e as CheckEmailResponseErrorType).message === "emailDuplication") {
      return EMAIL_ERROR_MESSAGE.duplicated;
    }
  }
}

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    getValues,
  } = useForm<FormType>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const getRegister = useCallback(
    (type: "email" | "password" | "passwordConfirm") => {
      switch (type) {
        case "email":
          return register("email", {
            required: EMAIL_ERROR_MESSAGE.empty,
            pattern: {
              value: EMAIL_REGEX,
              message: EMAIL_ERROR_MESSAGE.notCorrect,
            },
            validate: checkIsDuplicated,
          });
        case "password":
          return register("password", {
            required: PASSWORD_ERROR_MESSAGE.empty,
            pattern: {
              value: PASSWORD_REGEX,
              message: PASSWORD_ERROR_MESSAGE.notCorrect,
            },
          });
        case "passwordConfirm":
          return register("passwordConfirm", {
            validate: (val: string) => {
              if (getValues("password") != val) {
                return PASSWORD_CONFIRM_ERROR_MESSAGE.notEqual;
              }
            },
          });
      }
    },
    []
  );

  const onSubmit = async (user: { email: string; password: string }) => {
    try {
      const data = await postUserSignUp({
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      if (localStorage.getItem("accessToken")) {
        router.push("/folder");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/folder");
    }
  }, []);

  return (
    <div className={styles.rootContainer}>
      <main className={styles.main}>
        <div className={styles["main-header"]}>
          <h1 className={styles["main-logo"]}>
            <Link href="/">
              <Image src={HeaderLogo} alt="header_logo" />
            </Link>
          </h1>
          <div className={styles["main-header-contents"]}>
            이미 회원이신가요?
            <Link href="/signin">로그인 하기</Link>
          </div>
        </div>
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.container}>
            <section className={styles.field}>
              <label className={styles.label} htmlFor="email">
                이메일
              </label>
              <Input
                id="email"
                placeholder={EMAIL_PLACEHOLDER.required}
                register={getRegister("email")}
                error={errors.email as FieldError}
                clearErrors={clearErrors}
              />
            </section>
            <section className={styles.field}>
              <label className={styles.label} htmlFor="password">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder={PASSWORD_PLACEHOLDER.rule}
                register={getRegister("password")}
                error={errors.password as FieldError}
                clearErrors={clearErrors}
              />
            </section>
            <section className={styles.field}>
              <label className={styles.label} htmlFor="passwordConfirm">
                비밀번호 확인
              </label>
              <Input
                id="passwordConfirm"
                type="password"
                register={getRegister("passwordConfirm")}
                error={errors.passwordConfirm as FieldError}
                placeholder={PASSWORD_CONFIRM_PLACEHOLDER.rule}
                clearErrors={clearErrors}
              />
            </section>
          </div>
          <button type="submit" className="btn type_full">
            회원가입
          </button>
        </form>
        <div className={styles["main-footer"]}>
          <div>다른 방식으로 가입하기</div>
          <div className={styles.icons}>
            <a href="https://www.google.com/">
              <Image src={GoogleIcon} alt="goggle logo" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              className={styles.kakao_bg}
            >
              <Image src={KakaoIcon} alt="kakao logo" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
