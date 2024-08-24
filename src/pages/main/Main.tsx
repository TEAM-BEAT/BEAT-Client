import { useState } from "react";

import { useGetAllScheduleList } from "@apis/domains/home/queries";
import { navigateAtom } from "@stores";
import { useAtom } from "jotai";

const Main = () => {
  // 3. 훅 불러와서 사용
  const { data, isLoading } = useGetAllScheduleList();

  const [genre, setGenre] = useState("ALL");
  const [navigateUrl, setNavigateUrl] = useAtom(navigateAtom);

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  const onClickHi = async () => {
    const res = await fetch("/api/hi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("testres is: ", res.json());

    if (res.ok) {
      console.log("testres successful");
    } else {
      console.error("testres failed");
    }
  };

  const onClickHello = async () => {
    const res = await fetch("/api/hello", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("testres is: ", res.json());

    if (res.ok) {
      console.log("testres successful");
    } else {
      console.error("testres failed");
    }
  };

  if (isLoading) {
    return "로딩 중";
  }

  return "테스트";
};

export default Main;
