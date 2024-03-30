import styles from "./styles.module.css";
import eyeOff from "@/assets/eye-off.svg";
import eyeOn from "@/assets/eye-on.svg";
import Image from "next/image";
import { useState } from "react";
// import { FieldError } from "react-hook-form";

type Error = {
  message: string;
};

export function Input({
  type = "notPassword",
  placeholder,
  onBlurCallback,
  error,
}: {
  type?: "password" | "notPassword";
  placeholder?: string;
  onBlurCallback?: (...args: any[]) => void;
  error: Error;
}) {
  const [toggle, setToggle] = useState(false);
  if (type === "password") {
    return (
      <div className={styles.field}>
        <button
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
        </button>
        <input
          className={`${styles.input} ${
            error?.message ? styles.inputError : ""
          }`}
          placeholder="패스워드"
          type={!toggle ? "password" : "text"}
          onBlur={onBlurCallback}
        />
        {error?.message && (
          <div className={styles.errorMsg}>{error.message}</div>
        )}
      </div>
    );
  }

  return (
    <div>
      <input
        className={`${styles.input} ${
          error?.message !== "" ? styles.inputError : ""
        }`}
        placeholder={placeholder}
        type="text"
        onBlur={onBlurCallback}
      />
      {error?.message && <div className={styles.errorMsg}>{error.message}</div>}
    </div>
  );
}
