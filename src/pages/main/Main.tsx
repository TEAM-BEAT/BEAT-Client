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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <S.MainWrapper>
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
