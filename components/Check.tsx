import React from "react";
import styled from "styled-components";

const Content = styled.div`
  font-size: 10px;
  padding: 10px;
  margin-bottom: 16px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  line-height: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
`;

const CheckWrap = styled.ul`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CheckItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid #fdec;
  gap: 8px;
  line-height: 20px;
  border-radius: 10px;
`;

function Check() {
  const testArr = [
    { name: "꿀", quantity: "1", order_date: "2023-03-21" },
    { name: "꿀", quantity: "2", order_date: "2023-03-27" },
    { name: "꿀", quantity: "3", order_date: "2023-04-09" },
    { name: "꿀", quantity: "2", order_date: "2023-04-27" },
    { name: "컵홀더", quantity: "1", order_date: "2023-03-21" },
    { name: "컵홀더", quantity: "1", order_date: "2023-03-28" },
    { name: "서울)생크림", quantity: "1", order_date: "2023-03-21" },
  ];

  // 분류 나누기
  return (
    <Content>
      <Title>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{ width: "20px", color: "#000" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
          />
        </svg>

        <p>Check</p>
      </Title>

      <CheckWrap>
        <li style={{ textAlign: "center" }}>
          통계 데이터가 쌓일 때 까지 조금만 기다려주세요!
        </li>
        {/* <CheckItem>
        <CheckMarker>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px", color: "red" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </CheckMarker>

        <p>
          &quot;서울)생크림&quot; 을 발주하신지 14일이 지났어요!
          발주&amp;재고 확인을 추천드립니다!
        </p>
      </CheckItem>
      <CheckItem>
        <CheckMarker>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px", color: "red" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </CheckMarker>

        <p>
          &quot;서울)생크림&quot; 을 발주하신지 14일이 지났어요!
          발주&amp;재고 확인을 추천드립니다!
        </p>
      </CheckItem> */}
      </CheckWrap>
    </Content>
  );
}

export default Check;
