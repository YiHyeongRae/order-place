import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #efefef;
  position: relative;
`;

const Logo = styled.h1`
  font-size: 18px;
  font-family: "MapleBold";
  cursor: pointer;
`;
const LogOut = styled.div`
  position: absolute;
  right: 16px;
  top: 11px;
  font-size: 10px;
  cursor: pointer;
`;
function Header() {
  // console.log("header session", session);
  const router = useRouter();
  const logout: Function = () => {
    const confirms = confirm("로그아웃 하시겠습니까?");
    // console.log(confirms);

    if (confirms) {
      signOut();
      router.push("/login");
    }
  };

  return (
    <HeaderWrap>
      <Logo>OrderPlace</Logo>
      {/* <p style={{ cursor: "pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{ width: "32px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </p> */}
      {router.asPath !== "/" ? (
        <></>
      ) : (
        <LogOut onClick={() => logout()}>Logout</LogOut>
      )}
    </HeaderWrap>
  );
}

export default Header;
