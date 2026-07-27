import { useState } from "react";
import * as S from "./Promotion.styled";
import Tab from "@admin/compontets/commons/tab/Tab";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";
import AdminCarousel from "@admin/pages/promotion/components/AdminCarousel/AdminCarousel";
import AdminBanner from "@admin/pages/promotion/components/AdminBanner/AdminBanner";
import { useGetCarouselPresignedUrl } from "@apis/domains/files/queries";
import { usePutS3Upload } from "@apis/domains/files/queries";
import { updateCarousel } from "@apis/domains/admins/api";
import { useModal } from "@hooks";

interface PendingCarouselUpload {
  fileName: string;
  objectUrl: string;
}

const isBlobUrl = (url?: string) => url?.startsWith("blob:") ?? false;
const MAX_CAROUSEL_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_CAROUSEL_IMAGE_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const Promotion = () => {
  const { openAlert } = useModal();
  const [tab, setTab] = useState("carousel");

  const [carouselData, setCarouselData] = useState([]);
  const [carouselUploads, setCarouselUploads] = useState<PendingCarouselUpload[]>([]);
  const [initPromoNum, setInitPromoNum] = useState<number[]>([]); // 초기 promotionId

  const handleTab = (value) => {
    setTab(value);
  };

  const saveCarouselNum = (value) => {
    setInitPromoNum(value);
  };

  const saveCarouselData = (value) => {
    setCarouselData(value);

    const timestamp = Date.now();
    setCarouselUploads(
      value.flatMap((item, index) =>
        isBlobUrl(item.promotionPhoto)
          ? [{ fileName: `carousel-${index + 1}-${timestamp}`, objectUrl: item.promotionPhoto }]
          : []
      )
    );
  };

  const params = { carouselImages: carouselUploads.map(({ fileName }) => fileName) };

  const { refetch } = useGetCarouselPresignedUrl(params);
  const { mutateAsync: uploadToS3 } = usePutS3Upload();

  // 캐러셀  저장
  const handleCarouselSave = async () => {
    try {
      const uploadedImageKeys = new Map<string, string>();

      if (carouselUploads.length > 0) {
        const { data, isSuccess } = await refetch();
        if (!isSuccess || !data) {
          throw new Error("캐러셀 이미지 업로드 URL을 발급하지 못했습니다.");
        }

        await Promise.all(
          carouselUploads.map(async ({ fileName, objectUrl }) => {
            const upload = data.data.carouselPresignedUploads[fileName];
            if (!upload) {
              throw new Error("캐러셀 이미지 업로드 정보를 찾을 수 없습니다.");
            }

            const response = await fetch(objectUrl);
            if (!response.ok) {
              throw new Error("캐러셀 이미지 파일을 읽지 못했습니다.");
            }

            const blob = await response.blob();
            if (
              !ALLOWED_CAROUSEL_IMAGE_CONTENT_TYPES.has(blob.type) ||
              blob.size === 0 ||
              blob.size > MAX_CAROUSEL_IMAGE_SIZE_BYTES
            ) {
              throw new Error(
                "JPEG, PNG, WEBP, AVIF 형식의 10MiB 이하 이미지만 업로드할 수 있습니다."
              );
            }

            const file = new File([blob], fileName, { type: blob.type });
            const uploadResponse = await uploadToS3({ url: upload.uploadUrl, file });
            if (!uploadResponse) {
              throw new Error("캐러셀 이미지 업로드에 실패했습니다.");
            }

            uploadedImageKeys.set(objectUrl, upload.imageKey);
          })
        );
      }

      const tempCarouselData = carouselData.map((item) => ({
        ...item,
        promotionPhoto: uploadedImageKeys.get(item.promotionPhoto) ?? item.promotionPhoto,
      }));

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

          if (initPromoNum.indexOf(item.promotionId) === -1) {
            return carouselItem;
          }
          return { ...carouselItem, promotionId: item.promotionId };
        }),
      };

      const allValid = formData.carousels.every(
        (item) => Boolean(item.newImageUrl) && Boolean(item.redirectUrl)
      );

      if (allValid && formData.carousels.length !== 0) {
        await updateCarousel(formData);

        await openAlert({
          title: "캐러셀 수정이 완료되었습니다.",
          okCallback: () => {
            location.reload();
          },
        });
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
    } catch {
      openAlert({ title: "캐러셀 수정 혹은 이미지 저장을 실패했습니다.\n 다시 시도해주세요." });
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
