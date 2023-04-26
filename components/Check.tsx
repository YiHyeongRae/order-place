import React, { useState } from "react";
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

  align-items: center;
  padding: 8px 16px;
  border: 1px solid #fdec;
  gap: 8px;
  line-height: 20px;
  border-radius: 10px;
`;

const CheckMarker = styled.div``;

interface CheckResultTypes {
  name: string;
  avg: number;
  quantity: number;
  expect_date: string;
}
function Check({ data }: any) {
  console.log("data", data);
  // const testArr = [
  //   { name: "꿀", quantity: "1", order_date: "2023-03-21" },
  //   { name: "꿀", quantity: "1", order_date: "2023-03-24" },
  //   { name: "꿀", quantity: "1", order_date: "2023-03-27" },
  //   { name: "꿀", quantity: "1", order_date: "2023-04-01" },

  //   // 꿀은  1개당 약 7일의 텀으로 주문중이고, 마지막 주문 갯수가 2개이므로 다음 예상 주문일은 2023-05-01에서 14일 뒤

  //   { name: "컵홀더", quantity: "1", order_date: "2023-03-21" },
  //   { name: "컵홀더", quantity: "1", order_date: "2023-03-28" },
  //   { name: "컵홀더", quantity: "1", order_date: "2023-04-05" },

  //   // 컵홀더는 1개당 약 7일 텀으로 주문중이고, 마지막 주문 갯수가 1개이므로 다음 예상 주문일은 2023-04-05에서 7일 뒤

  //   { name: "서울)생크림", quantity: "1", order_date: "2023-03-21" },
  //   { name: "서울)생크림", quantity: "1", order_date: "2023-04-05" },
  //   { name: "서울)생크림", quantity: "1", order_date: "2023-04-19" },

  //   // 서울)생크림은 1개당 약 14일 텀으로 주문중이고, 마지막 주문 갯수가 1개이므로 다음 예상 주문일은 2023-04-19에서 14일 뒤
  // ];

  // 분류 나누기

  // sortingName === 꿀,컵홀더,서울)생크림
  const sortingName: string[] = [];

  const sortingArr: any = [];
  data &&
    data.map((item: any) => {
      if (!sortingName.includes(item.name)) {
        sortingName.push(item.name);
      }
    });

  for (let i = 0; i < sortingName.length; i++) {
    const filter = data.filter((item: any) => item.name === sortingName[i]);
    sortingArr.push(filter);
  }

  // for (let i=0; i<sortingArr.length; i++){
  //   for(let ii=0; ii<sortingArr[i].length; i++){
  //     sortingArr[i].map(()=>{})
  //   }
  // }
  const getDateDiff = (d1: string, d2: string) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
  };

  const mnfArr: any = [];
  sortingArr.map((item: any) => {
    if (item.length > 2) {
      let testObj = {
        name: item[0].name,
        order_date_avg: 0,
        last_quantity: 0,
        last_order_date: item[item.length - 1].order_date,
        order_expect_date: "",
      };
      let total_quantity = 0;
      for (let i = 0; i < item.length - 1; i++) {
        total_quantity = total_quantity + Number(item[i].quantity);
      }

      testObj.order_date_avg = Math.floor(
        getDateDiff(item[0].order_date, item[item.length - 1].order_date) /
          total_quantity
      );
      testObj.last_quantity = Number(item[item.length - 1].quantity);
      console.log("??", item, item[item.length - 1].order_date);
      mnfArr.push(testObj);
      // console.log(
      //   "?ASD?FSA?F",
      //   item[item.length - 1].order_date,
      //   testObj.avg * item[item.length - 1].quantity
      // );

      const lastOrder = new Date(item[item.length - 1].order_date);
      // console.log(
      //   "마지막 주문일, 예상 다음 발주까지의 일수",
      //   lastOrder,
      //   testObj.avg * item[item.length - 1].quantity
      // );
      const expectDate = new Date(
        lastOrder.setDate(
          lastOrder.getDate() + testObj.order_date_avg * testObj.last_quantity
        )
      );

      const Years = expectDate.getFullYear();
      const Months = expectDate.getMonth() + 1;
      const Days = expectDate.getDate();

      const resultDate = `${Years}-${Months < 10 ? `0${Months}` : Months}-${
        Days < 10 ? `0${Days}` : Days
      }`;

      testObj.order_expect_date = resultDate;
      // console.log("이건가", resultDate);
      // testObj.expect_date =expectDate
    }
  });
  console.log(mnfArr);
  const today = new Date();
  const Years = today.getFullYear();
  const Months = today.getMonth() + 1;
  const Days = today.getDate();

  const resultToday = `${Years}-${Months < 10 ? `0${Months}` : Months}-${
    Days < 10 ? `0${Days}` : Days
  }`;
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
        {mnfArr.filter((item: any) => resultToday > item.order_expect_date)
          .length === 0 ? (
          <li style={{ textAlign: "center" }}>
            통계 데이터가 쌓일 때 까지 조금만 기다려주세요!
          </li>
        ) : (
          mnfArr.map((item: any, i: number) => {
            const today = new Date();
            const Years = today.getFullYear();
            const Months = today.getMonth() + 1;
            const Days = today.getDate();

            const resultToday = `${Years}-${
              Months < 10 ? `0${Months}` : Months
            }-${Days < 10 ? `0${Days}` : Days}`;

            console.log(resultToday === "2023-04-25");

            return (
              <CheckItem
                key={i}
                style={{
                  display:
                    resultToday > item.order_expect_date ? "flex" : "none",
                }}
              >
                <CheckMarker style={{ height: 20 }}>
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
                  <span style={{ color: "red" }}>{item.name}</span>{" "}
                  발주&amp;재고 확인을 추천드립니다!
                </p>
              </CheckItem>
            );
          })
        )}

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
