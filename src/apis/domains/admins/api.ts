import { put } from "@apis/index";
import { components } from "@typings/api/schema";

// PUT /admin/carousels의 실제 와이어 포맷은 {status, message, data} 엔벨로프다.
export type CarouselUpdateResponse =
  components["schemas"]["SuccessResponseCarouselHandleAllResponse"];

// 캐러셀 수정 API (PUT)
export const updateCarousel = async (formData): Promise<CarouselUpdateResponse | null> => {
  try {
    const response = await put<CarouselUpdateResponse>("/admin/carousels", formData);

    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
