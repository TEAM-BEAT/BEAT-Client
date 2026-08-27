import { post } from "@apis/index";
import { components } from "@typings/api/schema";
import { AxiosResponse } from "axios";

type SuccessResponseVoid = components["schemas"]["SuccessResponseVoid"];

export const postLogout = async (): Promise<SuccessResponseVoid> => {
  try {
    const response: AxiosResponse<SuccessResponseVoid> = await post("/users/sign-out");

    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
