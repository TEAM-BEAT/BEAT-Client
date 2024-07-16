import { useState } from "react";
import * as S from "./Main.styled";

import Carousel from "./components/carousel/Carousel";
import Chips from "./components/chips/Chips";
import Floating from "./components/floating/Floating";

import Footer from "./components/footer/Footer";
import MainNavigation from "./components/mainNavigation/MainNavigation";
import Performance from "./components/performance/Performance";

import Loading from "@components/commons/loading/Loading";

import { useGetAllScheduleList } from "@apis/domains/home/queries";
import { navigateAtom } from "@stores/navigate";
import { useAtom } from "jotai";

const Main = () => {
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
