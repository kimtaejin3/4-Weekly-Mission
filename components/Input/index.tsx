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
  type = "email",
  placeholder,
  register,
  error,
  clearErrors,
}: {
  id: string;
  type?: "password" | "email";
  placeholder: string;
  register: UseFormRegisterReturn;
  error: FieldError;
  clearErrors: UseFormClearErrors<FormType>;
}) {
  const [toggle, setToggle] = useState(false);
  const onInputChange = register.onChange;

  return (
    <div>
      <div className={styles.field}>
        {type === "password" && (
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
        )}
        <input
          {...register}
          id={id}
          className={`${styles.input} ${
            error?.message ? styles.inputError : ""
          }`}
          placeholder={placeholder}
          type={!toggle ? "password" : "text"}
          onChange={(e) => {
            onInputChange(e);
          }}
          onFocus={() => clearErrors(type)}
        />
      </div>
      {error?.message && <div className={styles.errorMsg}>{error.message}</div>}
    </div>
  );
}
