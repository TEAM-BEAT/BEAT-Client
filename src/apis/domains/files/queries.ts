import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getPresignedUrl,
  GetPresignedUrlParams,
  PresignedResponse,
  CarouselPresignedResponse,
  getCarouselPresignedUrl,
  GetCarouselPresignedUrlParams,
  PutImageUploadParams,
  putS3ImageUpload,
} from "./api";

const QUERY_KEY = {
  PRESIGNED_URL: "presignedURL",
};

export const useGetPresignedUrl = (params: GetPresignedUrlParams) => {
  return useQuery<PresignedResponse>({
    queryKey: [QUERY_KEY.PRESIGNED_URL],
    queryFn: () => getPresignedUrl(params),
    enabled: false,
  });
};

export const useGetCarouselPresignedUrl = (params: GetCarouselPresignedUrlParams) => {
  return useQuery<CarouselPresignedResponse>({
    queryKey: [QUERY_KEY.PRESIGNED_URL],
    queryFn: () => getCarouselPresignedUrl(params),
    enabled: false,
  });
};

export const usePutS3Upload = () => {
  return useMutation({
    mutationFn: ({ url, file }: PutImageUploadParams) => putS3ImageUpload({ url, file }),
  });
};
