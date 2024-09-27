import { put } from "@apis/index";
import { components } from "@typings/api/schema";

export type SuccessResponse = components["schemas"]["SuccessResponse"];

// 공연 수정 API (PUT)
export const updateCarousel = async (formData): Promise<SuccessResponse | null> => {
  try {
    const response = await put("/admin/carousels", formData);

    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
