import { Input } from "@/components";

export default function Signin() {
  return (
    <div>
      <div>회원가입</div>

      <form
        style={{
          width: "380px",
          margin: "40px auto 0",
          backgroundColor: "#F0F6FF",
          padding: "20px",
        }}
      >
        <Input
          placeholder="아이디"
          error={{ message: "내용을 다시 작성해주세요" }}
        />
        <br />
        <br />
        <Input type="password" error={{ message: "" }} />
        <br />
        <br />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
