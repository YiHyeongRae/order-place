import React, { useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Content = styled.div`
  font-size: 14px;
`;

const CheckWrap = styled.ul`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CheckMarker = styled.p`
  display: flex;
  align-items: center;
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
const ToDoWrap = styled.ul`
  display: flex;
  margin: 20px 0;
  gap: 8px;
  flex-wrap: wrap;
`;

const ToDoItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #fdec;
  cursor: pointer;
  &::after {
    content: "${(props: any) => (props.content ? props.content : "")}";
    display: block;
  }
`;
const Title = styled.h2`
  display: flex;
  align-items: center;
  line-height: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
`;
const SubTitle = styled.h3`
  display: flex;
  align-items: center;
`;
const SubContent = styled.div`
  margin: 20px 0;
  /* margin-left: 20px; */
  /* padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #fdec; */
`;
const CateWrap = styled.ul`
  display: flex;
  margin: 10px 0;

  gap: 8px;
  flex-wrap: wrap;
`;

const CateItem = styled.li`
  display: flex;

  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #fdec;
`;

const PopupWrap = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
`;

const PopupContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  background-color: ${(props: any) => props.color};
  min-width: 70px;
  max-width: 70px;
  color: #fff;
  border-radius: 30px 0 0 30px;
`;
export default function Home() {
  const testArr = ["서울)우유", "서울)생크림", "서울)무염버터"];

  const testArr2 = ["컵홀더", "1호박스/판", "스티커", "2호박스/판"];

  const [toDo, setToDo] = useState<number[]>([]);

  const toDoHandler: Function = (i: number) => {
    const toDoCopy = [...toDo];
    if (toDo.includes(i)) {
      console.log(1);
      const filtering = toDoCopy.filter((item: number) => item !== i);
      setToDo(filtering);
    } else {
      toDoCopy.push(i);
      setToDo(toDoCopy);
    }
  };

  console.log(toDo);

  const orderComplete: Function = () => {
    // 선택한 대상 주문완료로 처리
    // 선택한 대상 id , new Date(), 갯수, 가격 보내기
    // new Date()는 통계 + 재발주 평균일자 계산 후 안내 메세지를 위함
    setToDo([]);
  };
  return (
    <>
      {toDo && toDo.length !== 0 ? (
        <PopupWrap>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PopupContent color="pink" onClick={() => orderComplete()}>
              <p>주문</p>
              <p style={{ cursor: "pointer", height: 16 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ width: "16px", color: "#fff" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </p>
            </PopupContent>
            <PopupContent color="#f55353">
              <p>삭제</p>
              <p style={{ cursor: "pointer", height: 16 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ width: "16px", color: "#fff" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </p>
            </PopupContent>
          </div>
        </PopupWrap>
      ) : (
        <></>
      )}

      <Content>
        <Title>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px", color: "pink" }}
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
          <CheckItem>
            <CheckMarker>
              {/* <svg
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
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg> */}
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
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </CheckMarker>

            <p>
              &quot;서울)생크림&quot; 을 발주하신지 14일이 지났어요!
              발주&amp;재고 확인을 추천드립니다!
            </p>
          </CheckItem>
        </CheckWrap>
      </Content>
      <Content>
        <Title>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="pink"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "20px", color: "pink" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>

            <p>To Do Order</p>
          </div>
        </Title>
        <ToDoWrap>
          {testArr2.map((item, i: number) => {
            return (
              <ToDoItem key={i} onClick={() => toDoHandler(i)}>
                <p>{item}</p>
              </ToDoItem>
            );
          })}
        </ToDoWrap>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginLeft: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "6px 10px",
              border: "1px solid #fdec",
            }}
          >
            <p>주문완료</p>
            <p style={{ cursor: "pointer", height: 14 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: "14px", color: "black" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "6px 10px",
              border: "1px solid #fdec",
            }}
          >
            <p>삭제하기</p>
            <p style={{ cursor: "pointer", height: 14 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: "14px", color: "black" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </p>
          </div>
        </div> */}
      </Content>
      <Content>
        <Title>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>

          <p>Category</p>
        </Title>
        <SubContent>
          <SubTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "14px", marginBottom: "3px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
              />
            </svg>
            <p>Cake</p>
          </SubTitle>

          <CateWrap>
            {testArr.map((item, i) => {
              return <CateItem key={i}>{item}</CateItem>;
            })}
          </CateWrap>
        </SubContent>
        <SubContent>
          <SubTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "14px", marginBottom: "3px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
              />
            </svg>

            <p>Box</p>
          </SubTitle>
          <CateWrap>
            <CateItem>1호박스/판</CateItem>
            <CateItem>2호박스/판</CateItem>
            <CateItem>보틀용기</CateItem>
          </CateWrap>
        </SubContent>
        <SubContent>
          <SubTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "14px", marginBottom: "3px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
              />
            </svg>

            <p>Drink</p>
          </SubTitle>
          <CateWrap>
            <CateItem>자몽농축액</CateItem>
            <CateItem>레몬농축액</CateItem>
            <CateItem>자몽</CateItem>
          </CateWrap>
        </SubContent>
      </Content>
      <Content>
        <Title>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px", color: "black" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
            />
          </svg>

          <p>Latest Order</p>
        </Title>
        <CheckWrap>
          <CheckItem style={{ justifyContent: "space-between" }}>
            {/* <CheckMarker>
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
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </CheckMarker> */}

            <p>2023-04-12</p>
            <p>서울)생크림 3개</p>
            <p>20,000 원</p>
          </CheckItem>
          <CheckItem style={{ justifyContent: "space-between" }}>
            {/* <CheckMarker>
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
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </CheckMarker> */}

            <p>2023-04-12</p>
            <p>컵홀더 1개</p>
            <p>10,000 원</p>
          </CheckItem>
        </CheckWrap>
      </Content>
    </>
  );
}
