import React from "react";
import styled from "styled-components";

const LoginWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  min-height: calc(100vh - 99px);
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
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-top: 8px;
`;

function login() {
  return (
    <LoginWrap>
      <div>LOGIN</div>
      <LoginForm>
        <Inputs type="text" placeholder="ID" />

        <Inputs type="paswword" placeholder="PASSWORD" />

        <ButtonWrap>
          <CircleButtons type="button">로그인</CircleButtons>
        </ButtonWrap>
      </LoginForm>
    </LoginWrap>
  );
}

export default login;
