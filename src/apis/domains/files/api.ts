import { get } from "@apis/index";
import axios, { AxiosResponse } from "axios";
import qs from "qs";

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
    const response: AxiosResponse<PresignedResponse> = await get("/files/presigned-url", {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
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
