import { useState } from "react";
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
  // 3. 훅 불러와서 사용
  const { data, isLoading } = useGetAllScheduleList();

  const [genre, setGenre] = useState("ALL");
  const [navigateUrl, setNavigateUrl] = useAtom(navigateAtom);

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  const onclickTest = async () => {
    const res = await fetch(`${import.meta.env.VITE_CLIENT_URL}/api/prerender`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("testres is: ", res);

    if (res.ok) {
      console.log("testres successful");
    } else {
      console.error("testres failed");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <S.MainWrapper>
          <button onClick={onclickTest}>테스트</button>
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
