import React, { useState } from "react";
import styled from "styled-components";

import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Hash from "../../util/Hash";
import { useRouter } from "next/router";

const LoginWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  min-height: calc(100vh - 130px);
`;
const CircleButtons = styled.button`
  /* background-color: #fdec; */
  border: 1px solid #eee;
  background-color: #fff;
  padding: 8px 16px;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  padding: 16px 32px;
`;

const Inputs = styled.input`
  border: 1px solid #eee;
  outline: none;
  padding: 8px 0;
  text-indent: 8px;
  font-size: 10px;
  width: 100%;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-top: 8px;
`;

function Login() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>();
  const [userPw, setUserPw] = useState<string>();
  const { data: session } = useSession();
  // console.log("id,pw", userId, userPw);
  console.log("session", session);

  const login: Function = async () => {
    const hashedPw = await Hash.makeHash(userId, userPw)
      .then((hashedPw: string) =>
        signIn("login", { userId, hashedPw, redirect: false })
      )
      .then((result: any) => {
        console.log("result", result);
        if (result.status === 200) {
          router.replace("/");
        } else {
          alert("아이디 혹은 비밀번호가 틀렸습니다.");
        }
      });
  };
  return (
    <LoginWrap>
      <div>LOGIN</div>
      <LoginForm>
        <Inputs
          type="text"
          placeholder="ID"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserId(e.currentTarget.value)
          }
        />

        <Inputs
          type="password"
          placeholder="PASSWORD"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserPw(e.currentTarget.value)
          }
        />

        <ButtonWrap>
          <CircleButtons type="button" onClick={() => login()}>
            로그인
          </CircleButtons>
        </ButtonWrap>
      </LoginForm>
      <div>회원가입은 관리자에게 문의해주세요.</div>
    </LoginWrap>
  );
}

export default Login;
