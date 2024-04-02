import styles from "./styles.module.css";
import eyeOff from "@/assets/eye-off.svg";
import eyeOn from "@/assets/eye-on.svg";
import Image from "next/image";
import { useState } from "react";
import {
  FieldError,
  UseFormClearErrors,
  UseFormRegisterReturn,
} from "react-hook-form";

type FormType = {
  email: string;
  password: string;
};

export function Input({
  id,
  type = "notPassword",
  placeholder,
  register,
  error,
  clearErrors,
}: {
  id: string;
  type?: "password" | "notPassword";
  placeholder?: string;
  register: UseFormRegisterReturn;
  error: FieldError;
  clearErrors: UseFormClearErrors<FormType>;
}) {
  const [toggle, setToggle] = useState(false);
  const onInputChange = register.onChange;
  if (type === "password") {
    return (
      <div>
        <div className={styles.field}>
          <span
            className={styles.toggleBtn}
            onClick={(e) => {
              e.preventDefault();
              setToggle((prev) => !prev);
            }}
          >
            <Image
              className={styles.inputIcon}
              src={!toggle ? eyeOff : eyeOn}
              alt="eyeIcon"
            />
          </span>
          <input
            {...register}
            id={id}
            className={`${styles.input} ${
              error?.message ? styles.inputError : ""
            }`}
            placeholder={placeholder || "비밀번호"}
            type={!toggle ? "password" : "text"}
            onChange={(e) => {
              clearErrors("password");
              onInputChange(e);
            }}
          />
        </div>
        {error?.message && (
          <div className={styles.errorMsg}>{error.message}</div>
        )}
      </div>
    );
  }

  return (
    <div>
      <input
        {...register}
        id={id}
        className={`${styles.input} ${error?.message ? styles.inputError : ""}`}
        placeholder={placeholder || "이메일"}
        type="text"
        onChange={(e) => {
          clearErrors("email");
          onInputChange(e);
        }}
      />
      {error?.message && <div className={styles.errorMsg}>{error.message}</div>}
    </div>
  );
}
