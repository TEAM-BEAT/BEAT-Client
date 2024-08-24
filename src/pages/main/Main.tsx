import { useState } from "react";

import Loading from "@components/commons/loading/Loading";

import { useGetPerformanceDetail } from "@apis/domains/performances/queries";
import { navigateAtom } from "@stores";
import { useAtom } from "jotai";

const Main = () => {
  const { data, isLoading } = useGetPerformanceDetail(116);

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
    return <Loading />;
  }

  return "테스트";
};

export default Main;
