import { get } from "@apis/index";
import axios, { AxiosResponse } from "axios";

interface ImageInterface {
  [key: string]: string;
}

export interface PresignedResponse {
  poster: ImageInterface;
  cast: ImageInterface;
  staff: ImageInterface;
  performance: ImageInterface;
}

export interface GetPresignedUrlParams {
  posterImage: string;
  castImages: string[];
  staffImages: string[];
  performanceImages: string[];
}

export const getPresignedUrl = async (
  params: GetPresignedUrlParams
): Promise<PresignedResponse | null> => {
  try {
    const paramsWithEmptyArrays = {
      ...params,
      castImages: params.castImages.length === 0 ? [""] : params.castImages,
      staffImages: params.staffImages.length === 0 ? [""] : params.staffImages,
      performImages: params.performanceImages.length === 0 ? [""] : params.performanceImages,
    };

    const response: AxiosResponse<PresignedResponse> = await get("/files/presigned-url", {
      params: paramsWithEmptyArrays,
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();

        for (const [k, v] of Object.entries(params)) {
          searchParams.set(k, v);
        }

        const modifiedQueryString = searchParams
          .toString()
          .replace(/castImages=%5B%5D/g, "castImages")
          .replace(/staffImages=%5B%5D/g, "staffImages")
          .replace(/performanceImages=%5B%5D/g, "performanceImages");
        return modifiedQueryString;
      },
    });

    return response.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export interface PutImageUploadParams {
  url: string;
  file: File;
}

export const putS3ImageUpload = async ({ url, file }: PutImageUploadParams) => {
  try {
    const response = await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    return response;
  } catch (err) {
    console.error(err);
  }
  return null;
};

// carousel

export interface CarouselPresignedResponse {
  carouselPresignedUrls: ImageInterface;
}

export interface GetCarouselPresignedUrlParams {
  carouselImages: string[];
}

export const getCarouselPresignedUrl = async (
  params: GetCarouselPresignedUrlParams
): Promise<CarouselPresignedResponse | null> => {
  try {
    const paramsWithEmptyArrays = {
      ...params,
      carouselImages:
        Array.isArray(params.carouselImages) && params.carouselImages.length === 0
          ? [""]
          : params.carouselImages || [""],
    };
    const response: AxiosResponse<CarouselPresignedResponse> = await get(
      "/admin/carousel/presigned-url",
      {
        params: paramsWithEmptyArrays,
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();

          for (const [k, v] of Object.entries(params)) {
            searchParams.set(k, v);
          }

          const modifiedQueryString = searchParams
            .toString()
            .replace(/carouselImages=%5B%5D/g, "carouselImages");
          return modifiedQueryString;
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
