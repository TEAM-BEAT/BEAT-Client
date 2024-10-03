import { useState } from "react";
import * as S from "./Promotion.styled";
import Tab from "@admin/compontets/commons/tab/Tab";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";
import AdminCarousel from "./components/adminCarousel/AdminCarousel";
import AdminBanner from "./components/adminBanner/AdminBanner";
import { useGetCarouselPresignedUrl } from "@apis/domains/files/queries";
import { usePutS3Upload } from "@apis/domains/files/queries";
import { CarouselPresignedResponse } from "@apis/domains/files/api";
import { updateCarousel } from "@apis/domains/admins/api";
import { useModal } from "@hooks";

const Promotion = () => {
  const { openAlert } = useModal();
  const [tab, setTab] = useState("carousel");

  const [carouselData, setCarouselData] = useState([]);
  const [carouselImage, setCarouselImages] = useState<string[]>([]); // presigned 보낼 state
  const [initPromoNum, setInitPromoNum] = useState<number[]>([]); // 초기 promotionId

  const handleTab = (value) => {
    setTab(value);
  };

  const saveCarouselNum = (value) => {
    setInitPromoNum(value);
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
  };

  const params = { carouselImages: carouselImage };

  const { data, refetch } = useGetCarouselPresignedUrl(params);
  const { mutate } = usePutS3Upload();

  // 캐러셀  저장
  const handleCarouselSave = async () => {
    const { data, isSuccess } = await refetch();

    if (isSuccess) {
      const extractUrls = (data: CarouselPresignedResponse) => {
        return Object.values(data.data.carouselPresignedUrls).map(
          (url) => (url as string).split("?")[0]
        );
      };

      const S3Urls = extractUrls(data);

      const files = carouselData
        .filter((item) => item.promotionPhoto && item.promotionPhoto.includes("blob"))
        .map((item) => item.promotionPhoto);

      try {
        await Promise.all(
          S3Urls.map(async (url, index) => {
            const file = files[index];

            const response = await fetch(file);
            const blob = await response.blob();
            const newFile = new File([blob], `fileName-${new Date()}`, { type: blob.type });

            return mutate({ url, file: newFile });
          })
        );

        let idxCnt = 0;

        const tempCarouselData = carouselData.map((item) => {
          if (item.promotionPhoto?.indexOf("amazonaws") === -1) {
            idxCnt += 1;
            return { ...item, promotionPhoto: S3Urls[idxCnt - 1] };
          }
          return item;
        });

        const carouselNum = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN"];

        const formData = {
          carousels: tempCarouselData.map((item, index) => {
            const { promotionPhoto, promotionId, ...rest } = item;

            const carouselItem = {
              ...rest,
              type: initPromoNum.indexOf(item.promotionId) === -1 ? "generate" : "modify",
              carouselNumber: carouselNum[index],
              newImageUrl: item.promotionPhoto,
            };

            // promotionId가 initPromoNum에 없을 때 (새로 생성되었을 때)만 추가
            if (initPromoNum.indexOf(item.promotionId) === -1) {
              return carouselItem;
            }
            return { ...carouselItem, promotionId: item.promotionId };
          }),
        };

        const allValid = formData.carousels.every(
          (item) => item.newImageUrl !== null && item.redirectUrl !== null
        );

        console.log(formData);

        if (allValid && formData.carousels.length !== 0) {
          const res = await updateCarousel(formData);
          console.log(res);
          await console.log(formData);
          // TODO : 머지 전 alert 추가하기
          // await location.reload();
        } else {
          formData.carousels.forEach((item) => {
            if (!item.newImageUrl && !item.redirectUrl) {
              openAlert({ title: "정보가 없는 캐러셀은 삭제해 주세요." });
            } else if (!item.newImageUrl) {
              openAlert({ title: "모든 이미지를 삽입해 주세요." });
            } else if (!item.redirectUrl) {
              openAlert({ title: "모든 링크를 삽입해 주세요." });
            }
          });
        }
      } catch (err) {
        console.error("Error during file upload or carousel update:", err);
        openAlert({ title: "캐러셀 수정 혹은 이미지 저장을 실패했습니다.\n 다시 시도해주세요." });
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
          <AdminCarousel saveCarouselData={saveCarouselData} saveCarouselNum={saveCarouselNum} />
        ) : (
          <AdminBanner />
        )}
      </S.PromotionContent>
    </S.PromotionWrapper>
  );
};

export default Promotion;
