import { useState } from "react";
import * as S from "./Main.styled";

import Carousel from "./components/carousel/Carousel";
import Chips from "./components/chips/Chips";
import Floating from "./components/floating/Floating";
import Footer from "./components/footer/Footer";
import MainNavigation from "./components/mainNavigation/MainNavigation";
import Performance from "./components/performance/Performance";

import { useGetTest } from "@apis/domains/test";
import Loading from "@components/commons/loading/Loading";
import { dummyData } from "./constants/dummyData";

const Main = () => {
  const [genre, setGenre] = useState("ALL");

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  const { data, isLoading } = useGetTest();
  console.log("test data", data, isLoading);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <S.MainWrapper>
          <MainNavigation />
          <Carousel promotionList={dummyData.promotionList} />
          <Chips handleGenre={handleGenre} />
          <Floating />
          <Performance genre={genre} performanceList={dummyData.performanceList} />
          <Footer />
        </S.MainWrapper>
      )}
    </>
  );
};

export default Main;
