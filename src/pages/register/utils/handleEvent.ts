import { Dayjs } from "dayjs";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { GigInfo } from "../typings/gigInfo";

// Image 핸들링
export const handleImageUpload = (
  imageUrl: string,
  setGigInfo: Dispatch<SetStateAction<GigInfo>>
) => {
  setGigInfo((prev) => ({
    ...prev,
    posterImage: imageUrl,
  }));
};

// Genre 핸들링
export const handleGenreSelect = (
  selectedGenre: string,
  setGigInfo: Dispatch<SetStateAction<GigInfo>>
) => {
  setGigInfo((prev) => ({
    ...prev,
    genre: selectedGenre,
  }));
};

// 일반 input 핸들링
export const handleChange = (
  e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  setGigInfo: Dispatch<SetStateAction<GigInfo>>
) => {
  const { name, value } = e.target;
  setGigInfo((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// Stepper 핸들링
export const onMinusClick = (setGigInfo: Dispatch<SetStateAction<GigInfo>>) => {
  setGigInfo((prev) => ({
    ...prev,
    totalScheduleCount: prev.totalScheduleCount - 1,
    // 회차 줄면 scheduleList 맨 마지막 객체 삭제
    scheduleList: prev.scheduleList.slice(0, prev.totalScheduleCount - 1),
  }));
};

export const onPlusClick = (setGigInfo: Dispatch<SetStateAction<GigInfo>>) => {
  setGigInfo((prev) => ({
    ...prev,
    totalScheduleCount: prev.totalScheduleCount + 1,
    // 회차 생기면 sheculeList 객체 추가
    scheduleList: [
      ...prev.scheduleList,
      {
        performanceDate: null, // 공연 일시
        totalTicketCount: "", // 총 티켓 수
        scheduleNumber: "", // 회차 번호
      },
    ],
  }));
};

// TimePicker 핸들링
export const handleDateChange = (
  index: number,
  date: Dayjs | null,
  setGigInfo: Dispatch<SetStateAction<GigInfo>>
) => {
  setGigInfo((prev) => {
    const newScheduleList = [...prev.scheduleList];
    newScheduleList[index].performanceDate = date;
    return { ...prev, scheduleList: newScheduleList };
  });
};

// 티켓 판매수 모든 회차에 동일하게 적용되도록 핸들링
export const handleTotalTicketCountChange = (
  e: ChangeEvent<HTMLInputElement>,
  setGigInfo: Dispatch<SetStateAction<GigInfo>>
) => {
  const { value } = e.target;
  setGigInfo((prev) => ({
    ...prev,
    scheduleList: prev.scheduleList.map((schedule) => ({
      ...schedule,
      totalTicketCount: value,
    })),
  }));
};

// Bank 핸들링
export const handleBankOpen = (setBankOpen: Dispatch<SetStateAction<boolean>>) => {
  setBankOpen((current) => !current);
};

export const handleBankClick = (
  value: string,
  setGigInfo: Dispatch<SetStateAction<GigInfo>>,
  setBankInfo: Dispatch<SetStateAction<string>>,
  setBankOpen: Dispatch<SetStateAction<boolean>>
) => {
  setGigInfo((prev) => ({
    ...prev,
    bankName: value,
  }));
  setBankInfo(value);
  setBankOpen((currnet) => !currnet);
};
