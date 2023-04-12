import React from "react";
import styled from "styled-components";

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const Logo = styled.h1`
  font-size: 16px;
`;

function Header() {
  return (
    <HeaderWrap>
      <h1>OrderPlace</h1>
      <p style={{ cursor: "pointer" }}>
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
      </p>
    </HeaderWrap>
  );
}

export default Header;
