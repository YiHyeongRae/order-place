import React, { Component, PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

const LayoutWrap = styled.div`
  max-width: 750px;
  margin: 0 auto;
  border-left: 1px solid #efefef;
  border-right: 1px solid #efefef;
  min-height: 100vh;
`;

const ChildrenWrap = styled.div`
  padding: 32px 16px;
  min-height: calc(100vh - 62px);
`;
interface Props extends PropsWithChildren {}
function Layout(props: Props) {
  return (
    <LayoutWrap>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Header />
      <ChildrenWrap>{props.children}</ChildrenWrap>
      <Footer />
    </LayoutWrap>
  );
}

export default Layout;
