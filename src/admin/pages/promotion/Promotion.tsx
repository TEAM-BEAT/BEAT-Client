import { useEffect, useState } from "react";
import * as S from "./Promotion.styled";
import Tab from "@admin/compontets/commons/tab/Tab";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";
import AdminCarousel from "./components/adminCarousel/AdminCarousel";
import AdminBanner from "./components/adminBanner/AdminBanner";
import { useGetCarouselPresignedUrl } from "@apis/domains/files/queries";
import { usePutS3Upload } from "@apis/domains/files/queries";
import { CarouselPresignedResponse } from "@apis/domains/files/api";

const Promotion = () => {
  const [tab, setTab] = useState("carousel");

  const [carouselData, setCarouselData] = useState([]);
  const [carouselImage, setCarouselImages] = useState<string[]>([]); // presigned 보낼 state
  const [imgIndexList, setImgIndexList] = useState<number[]>([]); // presigned 위치 저장

  const handleTab = (value) => {
    setTab(value);
  };

  const saveCarouselData = (value) => {
    setCarouselData(value);
  };

  // 캐러셀 데이터 map 돌려서 presigned 아닌 링크 찾아서 배열로 저장 + 저장한 배열 리스트 생성
  // 저장한 배열 presigned로 변경
  // 받아오면 presigned로 받아온 배열 map 돌려서 presigned로 링크 수정
  // PUT 보내기

  const params = carouselImage;

  const { data, refetch } = useGetCarouselPresignedUrl(params);
  const { mutate } = usePutS3Upload();

  // 캐러셀  저장
  const handleCarouselSave = async () => {
    // 캐러셀 데이터 map 돌려서 presigned 아닌 링크 찾아서 배열로 저장 + 저장한 배열 리스트 생성
    const tempPresigned = carouselData?.map((item, index) => {
      if (item.promotionPhoto.indexOf("amazonaws") === -1) {
        const tempIdxList = [...imgIndexList];
        tempIdxList.push(index);
        setImgIndexList(tempIdxList);

        return item.promotionPhoto;
      }
      // imgIndexList 초기화
      setImgIndexList([]);
    });

    setCarouselImages(tempPresigned);
    // 여기까진 잘 들어옴
    console.log(tempPresigned);

    const { data, isSuccess } = await refetch();

    let carouselUrls;

    if (isSuccess) {
      console.log(data);
      const extractUrls = (data: CarouselPresignedResponse) => {
        carouselUrls = Object.values(data.carouselPresignedUrls).map((url) => url.split("?")[0]);

        return carouselUrls;
      };

      const S3Urls = extractUrls(data);

      try {
        const res = await Promise.all(
          S3Urls.map(async (url, index) => {
            const file = carouselUrls[index];

            const response = await fetch(file);
            const blob = await response.blob();
            const newFile = new File([blob], `fileName-${new Date()}`, { type: blob.type });

            return mutate({ url, file: newFile });
          })
        );

        // 이미지 presigned로 수정
        const tempCarouselData = carouselData?.map((item, index) => {
          if (index === imgIndexList[0]) {
            const carouselIdx = imgIndexList[0];
            const updatedIndexList = imgIndexList.slice(1);
            setImgIndexList(updatedIndexList);

            return { ...item, promotionPhoto: carouselUrls[carouselIdx] };
          }
          return item; // 반드시 반환해야 함 (map 함수의 결과를 반환하기 위해)
        });

        console.log(carouselData);
      } catch (err) {
        console.error("파일 업로드 중 오류 발생:", err);
      }
    }
  };

  const handleBannerSave = () => {
    console.log("배너");
  };

  return (
    <S.PromotionWrapper>
      <S.Selector>
        <S.TabContainer>
          <Tab onClick={() => handleTab("carousel")} selected={tab === "carousel"}>
            캐러셀
          </Tab>
          <Tab onClick={() => handleTab("banner")} selected={tab === "banner"}>
            배너
          </Tab>
        </S.TabContainer>

        <AdminButton
          variant="primary"
          onClick={() => {
            tab === "carousel" && handleCarouselSave();
            tab === "banner" && handleBannerSave();
          }}
        >
          저장하기
        </AdminButton>
      </S.Selector>
      <S.PromotionContent>
        {tab === "carousel" ? (
          <AdminCarousel saveCarouselData={saveCarouselData} />
        ) : (
          <AdminBanner />
        )}
      </S.PromotionContent>
    </S.PromotionWrapper>
  );
};

export default Promotion;
