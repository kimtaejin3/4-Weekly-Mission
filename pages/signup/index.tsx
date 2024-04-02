import Image from "next/image";
import Link from "next/link";
import GoogleIcon from "@/assets/google.png";
import KakaoIcon from "@/assets/kakao.svg";
import HeaderLogo from "@/assets/header-logo.svg";
import styles from "./styles.module.css";
import { Input } from "@/components";
import { FieldError, useForm } from "react-hook-form";
import { postCheckEmail, postUserSignUp } from "@/api/user";
import { useRouter } from "next/router";

type FormType = {
  email: string;
  password: string;
  passwordConfirm: string;
};

type CheckEmailResponseErrorType = {
  message: string;
};

async function checkEmail(email: string) {
  try {
    await postCheckEmail({ email });
    return true;
  } catch (e) {
    if ((e as CheckEmailResponseErrorType).message === "emailDuplication") {
      return "이미 사용 중인 이메일입니다.";
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
    setError,
    watch,
  } = useForm<FormType>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

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
                register={register("email", {
                  required: "이메일을 입력하지 않았습니다.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "올바른 이메일 주소가 아닙니다.",
                  },
                  validate: checkEmail,
                })}
                error={errors.email as FieldError}
                clearErrors={clearErrors}
                placeholder="이메일을 입력해 주세요."
              />
            </section>
            <section className={styles.field}>
              <label className={styles.label} htmlFor="password">
                비밀번호
              </label>
              <Input
                register={register("password", {
                  required: "패스워드를 입력하지 않았습니다.",
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
                    message:
                      "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
                  },
                })}
                id="password"
                type="password"
                error={errors.password as FieldError}
                placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
                clearErrors={clearErrors}
              />
            </section>
            <section className={styles.field}>
              <label className={styles.label} htmlFor="passwordConfirm">
                비밀번호 확인
              </label>
              <Input
                register={register("passwordConfirm", {
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "비밀번호가 일치하지 않아요.";
                    }
                  },
                })}
                id="passwordConfirm"
                type="password"
                error={errors.passwordConfirm as FieldError}
                placeholder="비밀번호와 일치하는 값을 입력해 주세요."
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
