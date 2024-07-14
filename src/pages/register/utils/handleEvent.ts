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
  setGigInfo((prev) => {
    const newScheduleCount = prev.totalScheduleCount - 1;
    return {
      ...prev,
      totalScheduleCount: newScheduleCount,
      scheduleList: prev.scheduleList.slice(0, newScheduleCount),
      performancePeriod: calculatePerformancePeriod(prev.scheduleList.slice(0, newScheduleCount)),
    };
  });
};

export const onPlusClick = (setGigInfo: Dispatch<SetStateAction<GigInfo>>) => {
  setGigInfo((prev) => {
    const newScheduleList = [
      ...prev.scheduleList,
      {
        performanceDate: null, // 공연 일시
        totalTicketCount: "", // 총 티켓 수
        scheduleNumber: getScheduleNumber(prev.scheduleList.length), // 회차 번호
      },
    ];
    return {
      ...prev,
      totalScheduleCount: prev.totalScheduleCount + 1,
      scheduleList: newScheduleList,
      performancePeriod: calculatePerformancePeriod(newScheduleList),
    };
  });
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
    return {
      ...prev,
      scheduleList: newScheduleList,
      performancePeriod: calculatePerformancePeriod(newScheduleList),
    };
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

// 무료 공연 핸들링
export const onFreeClick = (setIsFree: Dispatch<SetStateAction<boolean>>) => {
  setIsFree((prev) => !prev);
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

// 모든 필드가 null이 아닌지 체크
export const isAllFieldsFilled = (gigInfo: GigInfo) => {
  const requiredFields = [
    "performanceTitle",
    "genre",
    "runningTime",
    "performanceDescription",
    "performanceAttentionNote",
    "bankName",
    "accountNumber",
    "posterImage",
    "performanceTeamName",
    "performanceVenue",
    "performanceContact",
    "performancePeriod",
    "ticketPrice",
    "totalScheduleCount",
  ];
  const scheduleFilled = gigInfo.scheduleList.every(
    (schedule) => schedule.performanceDate && schedule.totalTicketCount && schedule.scheduleNumber
  );

  // null과 빈 문자열이 아니어야 함
  return (
    requiredFields.every(
      (field) => gigInfo[field as keyof GigInfo] !== null && gigInfo[field as keyof GigInfo] !== ""
    ) && scheduleFilled
  );
};

// performancePeriod 계산
export const calculatePerformancePeriod = (scheduleList: { performanceDate: Dayjs | null }[]) => {
  const dates = scheduleList
    .map((schedule) => schedule.performanceDate)
    .filter((date): date is Dayjs => date !== null)
    .sort((a, b) => a.toDate().getTime() - b.toDate().getTime());

  if (dates.length === 0) {
    return "";
  }

  const startDate = dates[0].format("YYYY.MM.DD");
  const endDate = dates[dates.length - 1].format("YYYY.MM.DD");

  return startDate === endDate ? startDate : `${startDate}~${endDate}`;
};

// scheduleNumber 생성
const scheduleNumbers = ["FIRST", "SECOND", "THIRD"];

export const getScheduleNumber = (index: number): string => {
  return scheduleNumbers[index] || `SCHEDULE_${index + 1}`;
};
