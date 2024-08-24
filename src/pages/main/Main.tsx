import { useState } from "react";
import * as S from "./Main.styled";

import Loading from "@components/commons/loading/Loading";

import { useGetAllScheduleList } from "@apis/domains/home/queries";
import MetaTag from "@components/commons/meta/MetaTag";
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
  // 3. 훅 불러와서 사용
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
    <S.MainWrapper>
      <MetaTag
        title={"titleTest"}
        ogTitle={"ogTitleTest"}
        description={"descriptionTest"}
        image={"https://avatars.githubusercontent.com/u/58854041?v=4"}
        keywords={"keywordsTest"}
        url={`${import.meta.env.VITE_CLIENT_URL}/main`}
      />
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
  );
};

export default Main;
