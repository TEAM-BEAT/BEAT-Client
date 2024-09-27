import { updateCarousel } from "./api";
import { QueryClient, useMutation } from "@tanstack/react-query";

export const CAROUSEL_QUERY_KEY = {
  DETAIL: "detail",
  CAROUSEL_DETAIL: "carouselDetail",
};

interface Carousels {
  external: boolean;
  type: string;
  carouselNumber: string;
  newImageUrl: string;
  isExternal: boolean;
  redirectUrl: string;
  performanceId: number | null;
}

export interface CarouselUpdateFormData {
  carousels: Carousels[];
}

export const useUpdateCarousel = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (formData: CarouselUpdateFormData) => updateCarousel(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [CAROUSEL_QUERY_KEY.DETAIL],
      });
    },
  });
};
