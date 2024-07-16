import { get } from "@apis/index";
import { useQuery } from "@tanstack/react-query";

export const QUERY_KEY_POST = {
  getPresignedUrl: "getPresignedUrl",
};

interface PresignedUrlPropTypes {
  data: { fileName: string; url: string };
}

const fetchPresignedUrl = async () => {
  try {
    const response = await get<PresignedUrlPropTypes>("/api/image/upload");
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.error("error", err);
  }
};

export const usePresignedUrl = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_POST.getPresignedUrl],
    queryFn: () => fetchPresignedUrl(),
  });

  const fileName = data && data?.data?.fileName;
  const url = data && data?.data?.url;
  return { fileName, url };
};
