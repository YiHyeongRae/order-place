import React, { Component, PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const LayoutWrap = styled.div`
  max-width: 750px;
  margin: 0 auto;
  border-left: 1px solid #efefef;
  border-right: 1px solid #efefef;
  min-height: 100vh;
`;

const ChildrenWrap = styled.div`
  padding: 32px 16px;
`;
interface Props extends PropsWithChildren {}
function Layout(props: Props) {
  return (
    <LayoutWrap>
      <Header />
      <ChildrenWrap>{props.children}</ChildrenWrap>
      <Footer />
    </LayoutWrap>
  );
}

export default Layout;
