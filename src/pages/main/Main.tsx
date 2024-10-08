import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as S from "./Main.styled";

import Loading from "@components/commons/loading/Loading";

import { useGetAllScheduleList } from "@apis/domains/home/queries";
import {
  Carousel,
  Chips,
  Floating,
  Footer,
  MainNavigation,
  Performance,
} from "@pages/main/components";
import { navigateAtom } from "@stores";
import { useAtom } from "jotai";

const Main = () => {
  const { data, isLoading } = useGetAllScheduleList();

  const [genre, setGenre] = useState("ALL");
  const [navigateUrl, setNavigateUrl] = useAtom(navigateAtom);

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  const onClickHi = async () => {
    const res = await fetch("/api/hi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("testres is: ", res.json());

    if (res.ok) {
      console.log("testres successful");
    } else {
      console.error("testres failed");
    }
  };

  const onClickHello = async () => {
    const res = await fetch("/api/hello", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("testres is: ", res.json());

    if (res.ok) {
      console.log("testres successful");
    } else {
      console.error("testres failed");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {data === null ? (
        <div
          className="deploy-loading"
          style={{
            width: "100vw", // 100% 너비
            height: "100vh", // 100% 높이
            zIndex: 1000, // z-index 값
            top: 0, // 상단 고정
            left: 0, // 좌측 고정
          }}
        />
      ) : (
        <S.MainWrapper>
          {/* <button style={{ color: "white" }} onClick={onClickHi}>
            하이 테스트
          </button>
          <button style={{ color: "white" }} onClick={onClickHello}>
            헬로 테스트
          </button> */}
          <MainNavigation />
          <Carousel promotionList={data?.promotionList ?? []} />
          <Chips handleGenre={handleGenre} />
          <Floating />
          <Performance genre={genre} performanceList={data?.performanceList ?? []} />
          <Footer />
        </S.MainWrapper>
      )}
    </>
  );
};

export default Main;
