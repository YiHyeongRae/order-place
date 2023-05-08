import axios from "axios";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWR, { useSWRConfig } from "swr";
import Check from "../../components/Check";
import LoadingSpinner from "../../components/LoadingSpinner";
import { fetcher } from "../../util/fetcher";
import getTodayDate from "../../util/getTodayDate";
import { authOptions } from "./api/auth/[...nextauth]";

const Content = styled.div`
  font-size: 10px;
  padding: 10px;
  margin-bottom: 16px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
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
const ToDoWrap = styled.ul`
  display: flex;
  margin: 20px 0;
  gap: 8px;
  flex-wrap: wrap;
`;

interface StylePropsTypes {
  color?: string;
}
const ToDoItem = styled.li<StylePropsTypes>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #fdec;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;
const Title = styled.h2`
  display: flex;
  align-items: center;
  line-height: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
`;
const SubTitle = styled.h3`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
`;
const SubContent = styled.div`
  margin: 20px 0;
  /* margin-top: 20px; */
  /* margin-left: 20px; */
  /* padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #fdec; */
`;
const CateWrap = styled.ul`
  display: flex;
  margin: 10px 0;
  flex-wrap: wrap;

  gap: 8px;
`;

const CateItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #fdec;
  cursor: pointer;
`;

const PopupRightWrap = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  cursor: pointer;
`;

const PopupLeftWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  cursor: pointer;
`;
const PopupLeftBottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  cursor: pointer;
`;

const PopupContent = styled.div<StylePropsTypes>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  background-color: ${(props) => props.color};
  min-width: 70px;
  max-width: 70px;
  color: #fff;
  border-radius: 30px 0 0 30px;
  cursor: pointer;
`;

const AddPopupWrap = styled.div`
  max-width: 343px;
  width: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 16px 32px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

const AddPopupContent = styled.div``;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
`;

const InputArea = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;
const TextInput = styled.input`
  border: 0;
  background: none;
  outline: none;
  width: 100%;
  font-size: 12px;
`;

const AddCateList = styled.li`
  text-align: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid #eee;
`;

const Buttons = styled.button`
  border: 0;
  background-color: #fff;
  border: 1px solid #eee;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 10px;
`;

interface PickTypes {
  name: string;
  quantity: string;
  price: string;
  user_id: string;
}

Home.defaultProps = {
  auth: true,
};

interface CategoryTypes {
  no: number;
  category: string;
  id: string;
  link: string;
  name: string;
  before_price: number;
  now_price: number;
  order_avg_dage: string;
  user_id: string;
}
interface ServerSideDataTypes {
  user: string;
  CateName: string[];
  Group: any;
}

interface ToDoTypes {
  no: number;
  name: string;
  link: string;
  price: string;
  quantity: string;
  user_id: string;
}

interface HistroyTypes extends ToDoTypes {
  order_date: string;
  delete_yn: string;
}
export default function Home({ user, CateName, Group }: ServerSideDataTypes) {
  const { mutate } = useSWRConfig();
  const [toDo, setToDo] = useState<number[]>([]);
  const [addToDoState, setAddToDoState] = useState(false);
  const toDoHandler: Function = (i: number) => {
    setCate([]);

    const toDoCopy = [...toDo];
    if (toDo.includes(i)) {
      const filtering = toDoCopy.filter((item: number) => item !== i);
      setToDo(filtering);
    } else {
      toDoCopy.push(i);
      setToDo(toDoCopy);
    }
  };

  const { data: toDoData, isValidating: toDoLoading } = useSWR(
    process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/todo/getToDo",
    (url) => fetcher(url, { id: user })
  );
  const { data: history } = useSWR(
    process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/history/getHistory",
    (url) => fetcher(url, { id: user })
  );

  // console.log("historyLoading", historyLoading);

  // useEffect(() => {
  //   if (toDoData !== undefined && history !== undefined) {
  //
  //   }
  // }, [toDoData, history]);
  const [isLoading, setIsLoading] = useState(false);
  const orderComplete: Function = async () => {
    // 선택한 대상 주문완료로 처리
    // 선택한 대상 id , new Date(), 갯수, 가격 보내기
    // new Date()는 통계 + 재발주 평균일자 계산 후 안내 메세지를 위함

    const selected: number[] = [];
    const numbers: string[] = [];
    toDo.map((index) => {
      selected.push(toDoData[index]);
    });
    toDo.map((index) => {
      numbers.push(`"${toDoData[index].no}"`);
    });

    const date = getTodayDate();
    const registHistory = await axios
      .post(process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/todo/historyToDo", {
        data: selected,
        date: date,
      })
      .then(async () => {
        const deleteToDo = await axios
          .post(process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/todo/deleteToDo", {
            data: numbers.toString(),
            user_id: user,
          })
          .then(() => {
            mutate(process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/todo/getToDo"),
              mutate(
                process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/history/getHistory"
              );
          });

        setToDo([]);
        setConfirmState(0);
      });
  };
  const orderDelete: Function = async () => {
    setConfirmState(0), setIsLoading(true);
    const numbers: string[] = [];
    toDo.map((index) => {
      numbers.push(`"${toDoData[index].no}"`);
    });

    const deleteToDo = await axios
      .post(process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/todo/deleteToDo", {
        data: numbers.toString(),
        user_id: user,
      })
      .then(() => {
        mutate(process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/todo/getToDo");
      });

    setToDo([]), setIsLoading(false);
  };
  const [cate, setCate] = useState<string[]>([]);
  const selectCategory: Function = (name: string) => {
    setToDo([]);
    const copyCate = [...cate];
    if (!copyCate.includes(name)) {
      copyCate.push(name);
      setCate(copyCate);
    } else {
      const filtering = copyCate.filter((item: string) => item !== name);
      setCate(filtering);
    }
  };

  const [pick, setPick] = useState<Array<PickTypes>>([]);
  const pickHandler: Function = (
    index: number,
    { name, quantity, price, user_id }: PickTypes
  ) => {
    const copyPick = [...pick];

    quantity && (copyPick[index].quantity = quantity);

    price && (copyPick[index].price = price);
    copyPick[index].user_id = user;
    setPick(copyPick);
  };
  const addToDoHandler: Function = async () => {
    const makePick: Array<PickTypes> = [];
    cate.map((item) => {
      makePick.push({ name: item, quantity: "", price: "", user_id: "" });
    });

    setPick(makePick);
    setAddToDoState(true);
  };

  const submitAddToDo: Function = async () => {
    const isFullField = pick.every(
      (item: PickTypes) => item.price !== "" && item.quantity !== ""
    );

    if (isFullField) {
      true;
      const response = await axios.post(
        process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/todo/addToDo",
        { data: pick }
      );
      mutate(process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/todo/getToDo");

      if (response.status === 200) {
        setAddToDoState(false);
        setCate([]);
      }
    } else {
      alert("수량 혹은 가격을 입력해주세요.");
    }
  };

  // ToDo 삭제
  // ToDo 주문완료 및 HISTORY
  const [confirmState, setConfirmState] = useState(0);
  const confirmFunc: Function = () => {
    if (confirmState === 1) {
      orderComplete();
    } else if (confirmState === 2) {
      orderDelete();
    }
  };

  const [latestOrder, setLatestOrder] = useState<number[]>([]);

  const latestOrderHandler: Function = (index: number) => {
    const copyArr = [...latestOrder];

    if (!copyArr.includes(index)) {
      copyArr.push(index);
      setLatestOrder(copyArr);
    } else {
      const filter = copyArr.filter((item) => item !== index);
      setLatestOrder(filter);
    }
  };

  const deleteLatestOrder: Function = async () => {
    true;
    const response = await axios.post(
      process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/history/deleteHistory",
      { data: latestOrder }
    );
    mutate(process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/history/getHistory");
    setLatestOrder([]);
  };

  const [addCategoryItem, setAddCategoryItem] = useState<any>([
    {
      name: "",
      link: "",
      category: "",
      user_id: user,
    },
  ]);

  const [addCategoryState, setAddCategoryState] = useState(false);
  const submitCategory: Function = async () => {
    // console.log(addCategoryItem);

    // 추가할 값중 빈곳이 없는지 체크
    let isReady = false;
    for (let i = 0; i < addCategoryItem.length; i++) {
      isReady = addCategoryItem.every(
        (item: any) => item.name !== "" && item.category !== ""
      );
    }
    if (isReady) {
      const sortingCateName: any[] = [];
      addCategoryItem.map((item: any) => {
        if (!sortingCateName.includes(item.category)) {
          sortingCateName.push(item.category);
        }
      });

      const cateDatas = [];

      for (let i = 0; i < sortingCateName.length; i++) {
        const filtering = addCategoryItem.filter(
          (item: any) => item.category === sortingCateName[i]
        );
        cateDatas.push(filtering);
      }
      true;
      const response = await axios.post(
        process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/category/addCategory",
        {
          data: addCategoryItem,
        }
      );
      mutate(process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/category/getCategory");
      setAddCategoryState(false);
    } else {
      alert("이름,카테고리 항목을 빠짐없이 설정해주세요.");
    }
  };

  return (
    <>
      {/* 로딩스피너 */}
      {isLoading && <LoadingSpinner blur />}

      {/* 최근 주문 내역 삭제 확인 팝업 */}
      {latestOrder.length !== 0 && (
        <PopupLeftBottom onClick={() => deleteLatestOrder()}>
          <div
            style={{
              backgroundColor: "#f55353",
              color: "#fff",
              borderRadius: "30px 30px 0 0",
              padding: "6px 10px",
            }}
          >
            최근 주문 내역 삭제하기
          </div>
        </PopupLeftBottom>
      )}

      {/* 카테고리 추가 */}
      {addCategoryState && (
        <AddPopupWrap>
          <AddPopupContent>
            <InputWrap style={{ gap: "8px" }}>
              <InputArea
                style={{ borderBottom: "1px solid #eee", paddingBottom: "8px" }}
              >
                <div>Name</div>
                <div>Link</div>
                <div>Category</div>
              </InputArea>
              {addCategoryItem &&
                addCategoryItem.map((item: any, i: number) => {
                  return (
                    <InputArea key={i}>
                      <TextInput
                        type="text"
                        placeholder="이름"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const copyNameObj = [...addCategoryItem];
                          copyNameObj[i].name = e.currentTarget.value;
                          setAddCategoryItem(copyNameObj);
                        }}
                      />
                      <TextInput
                        type="text"
                        placeholder="구매 링크"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const copyLinkObj = [...addCategoryItem];
                          copyLinkObj[i].link = e.currentTarget.value;
                          setAddCategoryItem(copyLinkObj);
                        }}
                      />
                      {CateName.length !== 0 ? (
                        <select
                          style={{
                            border: 0,
                            outline: "none",
                            fontFamily: "MapleLight",
                            fontWeight: 400,
                          }}
                          onChange={(e) => {
                            if (e.currentTarget.value !== "카테고리 선택") {
                              const copyCategoryObj = [...addCategoryItem];
                              const indexs: any =
                                e.currentTarget[1].getAttribute("data-index");
                              copyCategoryObj[indexs].category =
                                e.currentTarget.value;
                              setAddCategoryItem(copyCategoryObj);
                            }
                          }}
                        >
                          <option
                            value="카테고리 선택"
                            defaultValue="카테고리 선택"
                          >
                            카테고리 선택
                          </option>
                          {CateName &&
                            CateName.map((item: string, ii: number) => {
                              return (
                                <option key={ii} data-index={i} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                        </select>
                      ) : (
                        <TextInput
                          type="text"
                          placeholder="카테고리"
                          data-index={i}
                          onChange={(e: any) => {
                            if (e.currentTarget.value !== "카테고리 선택") {
                              const copyCategoryObj = [...addCategoryItem];
                              const indexs: any =
                                e.currentTarget.getAttribute("data-index");
                              copyCategoryObj[indexs].category =
                                e.currentTarget.value;
                              setAddCategoryItem(copyCategoryObj);
                            }
                          }}
                        />
                      )}
                    </InputArea>
                  );
                })}

              <ButtonWrap style={{ border: 0 }}>
                <Buttons
                  type="button"
                  style={{ border: 0 }}
                  onClick={() => {
                    const copyAddCategoryItem = [...addCategoryItem];

                    const formObj = {
                      name: "",
                      link: "",
                      category: "",
                      user_id: user,
                    };

                    copyAddCategoryItem.push(formObj);
                    setAddCategoryItem(copyAddCategoryItem);
                  }}
                >
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
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Buttons>
              </ButtonWrap>
            </InputWrap>
            <ButtonWrap>
              <Buttons onClick={() => submitCategory()}>Add Category</Buttons>
              <Buttons
                onClick={() => {
                  setAddCategoryState(false),
                    setAddCategoryItem([
                      { name: "", link: "", category: "", user_id: user },
                    ]);
                }}
              >
                Cancle
              </Buttons>
            </ButtonWrap>
          </AddPopupContent>
        </AddPopupWrap>
      )}

      {/* 주문완료 및 삭제 확인 팝업 */}
      {confirmState !== 0 && (
        <AddPopupWrap style={{ zIndex: 1 }}>
          <Title>Confirm</Title>
          <div style={{ padding: "16px 0" }}>
            {confirmState === 1 ? (
              <p>주문완료 하시겠습니까?</p>
            ) : (
              <p>할 일 목록에서 제거하시겠습니까?</p>
            )}
          </div>

          <ButtonWrap>
            <Buttons type="button" onClick={() => confirmFunc()}>
              확인
            </Buttons>
            <Buttons type="button" onClick={() => setConfirmState(0)}>
              취소
            </Buttons>
          </ButtonWrap>
        </AddPopupWrap>
      )}
      {/* ToDo 장바구니 Left  */}
      {cate && cate.length !== 0 ? (
        <PopupLeftWrap>
          <PopupContent
            color="pink"
            style={{ maxWidth: "unset", borderRadius: "0 30px 30px 0" }}
            onClick={() => {
              addToDoHandler();
            }}
          >
            <p>장바구니</p>
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
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </p>
          </PopupContent>
        </PopupLeftWrap>
      ) : (
        <></>
      )}

      {/* ToDo 장바구니 팝업 (수량,가격 입력) */}
      {addToDoState && (
        <AddPopupWrap>
          <AddPopupContent>
            {/* <Title>Cart</Title> */}
            <InputWrap style={{ gap: "8px" }}>
              <InputArea
                style={{ borderBottom: "1px solid #eee", paddingBottom: "8px" }}
              >
                <div style={{ flex: "1 1 50%" }}>Name</div>
                <div style={{ flex: "1 1 25%" }}>Quantity</div>
                <div style={{ flex: "1 1 25%", textAlign: "right" }}>Price</div>
              </InputArea>
              {cate &&
                cate.map((item: string, i: number) => {
                  return (
                    <InputArea key={i}>
                      <div style={{ flex: "1 1 50%", fontSize: 12 }}>
                        {item}
                      </div>
                      <div style={{ flex: "1 1 25%", fontSize: 12 }}>
                        <TextInput
                          type="text"
                          style={{
                            textAlign: "right",
                          }}
                          placeholder="수량"
                          onChange={(e) =>
                            pickHandler(i, {
                              quantity: e.currentTarget.value.replace(
                                /[^0-9]/g,
                                ""
                              ),
                            })
                          }
                          value={pick[i].quantity}
                        />
                      </div>
                      <div style={{ flex: "1 1 25%", fontSize: 12 }}>
                        <TextInput
                          type="text"
                          style={{
                            textAlign: "right",
                          }}
                          placeholder="가격"
                          onChange={(e) =>
                            pickHandler(i, {
                              price: e.currentTarget.value.replace(
                                /[^0-9]/g,
                                ""
                              ),
                            })
                          }
                          value={pick[i].price}
                        />
                      </div>
                    </InputArea>
                  );
                })}
            </InputWrap>
            <ButtonWrap>
              <Buttons type="button" onClick={() => submitAddToDo()}>
                Add To Do
              </Buttons>
              <Buttons
                type="button"
                onClick={() => setAddToDoState(!addToDoState)}
              >
                Cancle
              </Buttons>
            </ButtonWrap>
          </AddPopupContent>
        </AddPopupWrap>
      )}
      {/* ToDo 주문완료 및 삭제 Right */}
      {toDo && toDo.length !== 0 ? (
        <PopupRightWrap>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PopupContent color="pink" onClick={() => setConfirmState(1)}>
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
            <PopupContent color="#f55353" onClick={() => setConfirmState(2)}>
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
        </PopupRightWrap>
      ) : (
        <></>
      )}
      {/* Check */}
      <Check data={history} />
      {/* ToDo */}
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
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "20px", color: "#000" }}
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
          {toDoData === undefined || toDoData.length === 0 ? (
            <li style={{ textAlign: "center", width: "100%" }}>
              할 일 목록이 없습니다!
            </li>
          ) : (
            toDoData &&
            toDoData.map((item: ToDoTypes, i: number) => {
              return (
                <ToDoItem
                  key={i}
                  onClick={() => toDoHandler(i)}
                  color={toDo.includes(i) ? "#fdec" : ""}
                >
                  <p>{item.name}</p>&nbsp;<p>{item.quantity}개</p>
                  {item.link && (
                    <a
                      href="javascript:void(0)"
                      style={{ display: "block", height: 14, marginLeft: 8 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        style={{ width: 14, color: "#000" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                        />
                      </svg>
                    </a>
                  )}
                </ToDoItem>
              );
            })
          )}
        </ToDoWrap>
      </Content>
      {/* Category */}
      <Content>
        <Title style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
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
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px", cursor: "pointer" }}
            onClick={() => setAddCategoryState(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Title>
        {Group.length !== 0 ? (
          Group.map((item: any, i: number) => {
            return (
              <SubContent key={i}>
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
                  <p>{item[0].category}</p>
                </SubTitle>

                <CateWrap>
                  {item &&
                    item.map((item2: CategoryTypes, i: number) => {
                      return (
                        <CateItem
                          key={i}
                          onClick={() => {
                            selectCategory(item2.name);
                          }}
                          style={{
                            backgroundColor: cate.includes(item2.name)
                              ? "#fdec"
                              : "#fff",
                          }}
                        >
                          {item2.name}
                        </CateItem>
                      );
                    })}
                </CateWrap>
              </SubContent>
            );
          })
        ) : (
          <SubContent>
            <CateWrap style={{ justifyContent: "center" }}>
              <li>카테고리가 없습니다.카테고리를 추가해보세요 !</li>
            </CateWrap>
          </SubContent>
        )}
      </Content>
      {/* Latest Order */}
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
          {history && history.length === 0 ? (
            <li style={{ textAlign: "center", width: "100%" }}>
              최근 주문 내역이 없습니다!
            </li>
          ) : (
            history &&
            history.map((item: HistroyTypes, i: number) => {
              return (
                <CheckItem
                  style={{
                    cursor: "pointer",
                    justifyContent: "space-between",
                    backgroundColor: latestOrder.includes(item.no)
                      ? "#fdec"
                      : "#fff",
                  }}
                  key={i}
                  onClick={() => latestOrderHandler(item.no)}
                >
                  <p style={{ flex: "1 1 25%", textAlign: "left" }}>
                    {item.order_date}
                  </p>
                  <p
                    style={{ flex: "1 1 50%", textAlign: "center" }}
                  >{`${item.name} ${item.quantity}개`}</p>
                  <p
                    style={{ flex: "1 1 25%", textAlign: "right" }}
                  >{`${item.price} 원`}</p>
                </CheckItem>
              );
            })
          )}
        </CheckWrap>
      </Content>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // session 없을 시 로그인 페이지 이동
  if (session === null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const category = await axios.post(
    process.env.NEXT_PUBLIC_ORIGIN_HOST + "/api/category/getCategory",
    { id: session.token.sub }
  );
  // console.log("category", category);
  // const data = await JSON.parse(category.data);
  const copyData = [...category.data];

  const cateSort: string[] = [];

  copyData.map((item: CategoryTypes) => {
    if (!cateSort.includes(item.category)) {
      cateSort.push(item.category);
    }
  });
  // console.log("카테고리 잘 분류도미 ?", cateSort);
  // const CCC = copyData.filter(
  //   (item: CategoryTypes) => item.category === "Cake&Cookie"
  // );
  // const CDC = copyData.filter((item: CategoryTypes) => item.category === "CDC");
  // const CBB = copyData.filter((item: CategoryTypes) => item.category === "CBB");
  const Grouping: CategoryTypes[][] = [];
  for (let i = 0; i < cateSort.length; i++) {
    const mnfCate: CategoryTypes[] = copyData.filter(
      (item: CategoryTypes) => item.category === cateSort[i]
    );
    Grouping.push(mnfCate);
  }

  // console.log("겟투두", getToDo);

  // console.log("category +++++++", getToDo, "+++++++++++");
  return {
    props: {
      user: session.token.sub,
      CateName: cateSort,
      Group: Grouping,
    },
  };
};
