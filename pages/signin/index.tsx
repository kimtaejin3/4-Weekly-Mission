import Image from "next/image";
import Link from "next/link";
import GoogleIcon from "@/assets/google.png";
import KakaoIcon from "@/assets/kakao.svg";
import HeaderLogo from "@/assets/header-logo.svg";
import styles from "./styles.module.css";
import { Input } from "@/components";
import { FieldError, useForm } from "react-hook-form";
import { FormEvent } from "react";
import { postUserSignin } from "@/api/user";
import { useRouter } from "next/router";

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
        message: "이메일을 확인해 주세요",
      });
      setError("password", {
        type: "passwordInValid",
        message: "비밀번호를 확인해 주세요",
      });
    }
  };

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
                register={register("email", {
                  required: "이메일을 입력하지 않았습니다.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "올바른 이메일 주소가 아닙니다.",
                  },
                })}
                clearErrors={clearErrors}
                id="email"
                error={errors.email as FieldError}
                placeholder="이메일을 입력해 주세요."
              />
            </section>
            <section className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                비밀번호
              </label>
              <Input
                register={register("password", {
                  required: "패스워드를 입력하지 않았습니다.",
                })}
                id="password"
                type="password"
                error={errors.password as FieldError}
                placeholder="비밀번호를 입력해 주세요."
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
