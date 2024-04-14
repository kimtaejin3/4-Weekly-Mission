import Image from "next/image";
import Link from "next/link";
import GoogleIcon from "@/assets/google.png";
import KakaoIcon from "@/assets/kakao.svg";
import HeaderLogo from "@/assets/header-logo.svg";
import styles from "./styles.module.css";
import { Input } from "@/components";
import { FieldError, useForm } from "react-hook-form";
import { postUserSignin } from "@/api/auth";
import { useRouter } from "next/router";
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_REGEX,
  PASSWORD_ERROR_MESSAGE,
} from "@/constants/validation";
import {
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from "@/constants/placeholderMessage";
import { useEffect } from "react";

type FormType = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    setError,
  } = useForm<FormType>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (user: { email: string; password: string }) => {
    try {
      const data = await postUserSignin({
        email: user.email,
        password: user.password,
      });

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      if (localStorage.getItem("accessToken")) {
        router.push("/folder");
      }
    } catch (e) {
      setError("email", {
        type: "emailInValid",
        message: EMAIL_ERROR_MESSAGE.inValid,
      });
      setError("password", {
        type: "passwordInValid",
        message: PASSWORD_ERROR_MESSAGE.inValid,
      });
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
            회원이 아니신가요?
            <Link href="/signup">회원가입 하기</Link>
          </div>
        </div>
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.container}>
            <section className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                이메일
              </label>
              <Input
                id="email"
                placeholder={EMAIL_PLACEHOLDER.required}
                register={register("email", {
                  required: EMAIL_ERROR_MESSAGE.empty,
                  pattern: {
                    value: EMAIL_REGEX,
                    message: EMAIL_ERROR_MESSAGE.notCorrect,
                  },
                })}
                clearErrors={clearErrors}
                error={errors.email as FieldError}
              />
            </section>
            <section className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder={PASSWORD_PLACEHOLDER.required}
                register={register("password", {
                  required: PASSWORD_ERROR_MESSAGE.empty,
                })}
                error={errors.password as FieldError}
                clearErrors={clearErrors}
              />
            </section>
          </div>
          <button type="submit" className="btn type_full">
            로그인
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
