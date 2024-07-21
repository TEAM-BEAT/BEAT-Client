import { get } from "@apis/index";
import axios, { AxiosResponse } from "axios";

interface ImageInterface {
  [key: string]: string;
}

export interface PresignedResponse {
  poster: ImageInterface;
  cast: ImageInterface;
  staff: ImageInterface;
}

export interface GetPresignedUrlParams {
  posterImage: string;
  castImages: string[];
  staffImages: string[];
}

export const getPresignedUrl = async (
  params: GetPresignedUrlParams
): Promise<PresignedResponse | null> => {
  try {
    const paramsWithEmptyArrays = {
      ...params,
      castImages: params.castImages.length === 0 ? [""] : params.castImages,
      staffImages: params.staffImages.length === 0 ? [""] : params.staffImages,
    };

    const response: AxiosResponse<PresignedResponse> = await get("/files/presigned-url", {
      params: paramsWithEmptyArrays,
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();

        for (const [k, v] of Object.entries(params)) {
          searchParams.set(k, v);
        }

        const modifiedQueryString = searchParams.toString()
          .replace(/castImages=%5B%5D/g, "castImages")
          .replace(/staffImages=%5B%5D/g, "staffImages");
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
