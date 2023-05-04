import React from "react";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: rgba(0, 0, 0, 0.7); */
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  /* border: 4px solid rgba(232, 235, 237, 0.5);
  border-top: 4px solid rgb(100, 47, 250); */
  border-radius: 50%;
  position: absolute;
  z-index: 500;
  left: 50%;
  top: 50%;
  animation: spin 0.75s linear infinite;

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotateY(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotateY(360deg);
    }
  }
`;

const SpinnerText = styled.div`
  margin-top: 36px;
  position: absolute;
  z-index: 500;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

interface LoadingSpinnerTypes {
  blur?: boolean;
}
function LoadingSpinner({ blur }: LoadingSpinnerTypes) {
  // 스크롤 막기

  return (
    <>
      {blur ? (
        <SpinnerWrapper className="loading-spinner">
          <Spinner>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#f55353"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: 36, color: "#f55353" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </Spinner>
          <SpinnerText>Loading</SpinnerText>
        </SpinnerWrapper>
      ) : (
        <>
          <Spinner>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#f55353"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: 36, color: "#f55353" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </Spinner>
          <SpinnerText>Loading</SpinnerText>
        </>
      )}
    </>
  );
}

export default LoadingSpinner;
