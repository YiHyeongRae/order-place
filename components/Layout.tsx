import React, { Component, PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";
import Header from "./Header";

const LayoutWrap = styled.div`
  max-width: 375px;
  margin: 0 auto;
`;

interface Props extends PropsWithChildren {}
function Layout(props: Props) {
  return (
    <LayoutWrap>
      <Header />
      <div>{props.children}</div>
    </LayoutWrap>
  );
}

export default Layout;
