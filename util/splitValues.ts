import React from "react";

async function splitValues() {
  const testArr = [
    {
      data1: "1",
      data2: "원",
      data3: "하나",
    },
    {
      data1: "2",
      data2: "투",
      data3: "둘",
    },
    {
      data1: "3",
      data2: "쓰리",
      data3: "삼",
    },
  ];

  const objLength = Object.keys(testArr[0]).length;

  const valueString: any = [];

  testArr.map((item: any) => {
    const thisArr: any = [];
    for (let i = 0; i < objLength; i++) {
      thisArr.push(`"${Object.values(item)[i]}"`);
    }
    const completeValue = `(${thisArr.toString()})`;
    valueString.push(completeValue);
  });
  console.log("test", valueString);
}

export default splitValues;
