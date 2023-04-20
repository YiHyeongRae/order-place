import React from "react";
import styled from "styled-components";

const FooterWrap = styled.div`
  width: 100%;
  border-top: 1px solid #efefef;
  padding: 8px 0;
  text-align: center;
  font-size: 14px;
`;
function Footer() {
  return (
    <FooterWrap>
      &copy;Copyright 2022. YiHyeongRae all rights reserved.
    </FooterWrap>
  );
}

export default Footer;
