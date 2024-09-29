import { useEffect, useState } from "react";
import * as S from "./Promotion.styled";
import Tab from "@admin/compontets/commons/tab/Tab";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";
import AdminCarousel from "./components/adminCarousel/AdminCarousel";
import AdminBanner from "./components/adminBanner/AdminBanner";
import { useGetCarouselPresignedUrl } from "@apis/domains/files/queries";
import { usePutS3Upload } from "@apis/domains/files/queries";
import { CarouselPresignedResponse } from "@apis/domains/files/api";

// api 연결할 때 generate, modify 구분하기!
// 처음에 carousel 받아오고 저장해둔 후 비교해서 type 추가

const Promotion = () => {
  const [tab, setTab] = useState("carousel");

  const [carouselData, setCarouselData] = useState([]);
  const [carouselImage, setCarouselImages] = useState<string[]>([]); // presigned 보낼 state

  const handleTab = (value) => {
    setTab(value);
  };

  const saveCarouselData = (value) => {
    setCarouselData(value);

    const tempPresigned = carouselData?.map((item, index) => {
      if (item.promotionPhoto?.indexOf("amazonaws") === -1) {
        return `carousel-${index + 1}-${new Date().getTime()}`;
      }
    });

    const filtered = tempPresigned.filter((element) => element !== undefined);

    setCarouselImages(filtered);
    // 여기까진 잘 들어옴
    console.log(filtered);
  };

  const params = { carouselImages: carouselImage };

  const { data, refetch } = useGetCarouselPresignedUrl(params);
  const { mutate } = usePutS3Upload();

  // 캐러셀  저장
  const handleCarouselSave = async () => {
    // 캐러셀 데이터 map 돌려서 presigned 아닌 링크 찾아서 배열로 저장 + 저장한 배열 리스트 생성

    const { data, isSuccess } = await refetch();

    let carouselUrls;

    if (isSuccess) {
      console.log(data);
      console.log(data.data.carouselPresignedUrls);
      const extractUrls = (data: CarouselPresignedResponse) => {
        carouselUrls = Object.values(data.data.carouselPresignedUrls).map(
          (url) => (url as string).split("?")[0]
        );

        return carouselUrls;
      };

      const S3Urls = extractUrls(data);

      console.log(S3Urls);

      const files = carouselData
        .filter((item) => item.promotionPhoto && item.promotionPhoto.includes("blob"))
        .map((item) => item.promotionPhoto);

      try {
        const res = await Promise.all(
          S3Urls.map(async (url, index) => {
            const file = files[index];

            const response = await fetch(file);
            const blob = await response.blob();
            const newFile = new File([blob], `fileName-${new Date()}`, { type: blob.type });

            return mutate({ url, file: newFile });
          })
        );

        let idxCnt = 0;

        // 이미지 presigned로 수정
        const tempCarouselData = carouselData?.map((item) => {
          console.log(idxCnt, S3Urls[idxCnt - 1]);

          if (item.promotionPhoto?.indexOf("amazonaws") === -1) {
            idxCnt += 1;
            return { ...item, promotionPhoto: S3Urls[idxCnt - 1] };
          }
          return item;
        });

        setCarouselData(tempCarouselData);

        console.log(tempCarouselData);
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
