import { get } from "@apis/index";
import { useQuery } from "@tanstack/react-query";

interface TestReponse {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// example get api
const getTest = async () => {
  try {
    const response = await get<TestReponse>("/todos/1");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("에러");
  }
};

export const useGetTest = () => {
  return useQuery({
    queryKey: ["test"],
    queryFn: () => getTest(),
  });
};
