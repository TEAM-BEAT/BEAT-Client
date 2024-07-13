import { useState } from "react";
import Register from "./Register";
import RegisterMaker from "./RegisterMaker";
import { GigInfo } from "./typings/gigInfo";

const RegisterPage = () => {
  const [registerStep, setRegisterStep] = useState(1);
  const [gigInfo, setGigInfo] = useState<GigInfo>({
    performanceTitle: "", // 공연명
    genre: "", // 공연 장르
    runningTime: "", // 러닝 타임
    performanceDescription: "", // 공연 소개
    performanceAttentionNote: "", // 유의사항
    bankName: "", // 은행명
    accountNumber: "", // 계좌번호
    posterImage: "", // 포스터 이미지 URL
    performanceTeamName: "", // 공연 팀명
    performanceVenue: "", // 공연 장소
    performanceContact: "", // 대표자 연락처
    performancePeriod: "", // 2023.12.28~2023.12.29
    ticketPrice: "", // 가격
    totalScheduleCount: 1, // 총 회차 수
    scheduleList: [
      {
        performanceDate: null, // 공연 일시
        totalTicketCount: "", // 총 티켓 수
        scheduleNumber: "FIRST", // 회차 번호
      },
    ],
    castList: [
      {
        castName: "", // 이름
        castRole: "", // 역할
        castPhoto: "", // 출연진 사진 URL
      },
    ],
    staffList: [
      {
        staffName: "", // 이름
        staffRole: "", // 역할
        staffPhoto: "", // 스태프 사진 URL
      },
    ],
  });

  const handleRegisterStep = () => {
    setRegisterStep((prev) => prev + 1);
  };

  if (registerStep === 1) {
    return <Register handleRegisterStep={handleRegisterStep} handleGigInfo={handleGigInfo} />;
  }
  if (registerStep === 2) {
    return <RegisterMaker handleRegisterStep={handleRegisterStep} handleGigInfo={handleGigInfo} />;
  }
  return <>미리보기</>;
};

export default RegisterPage;
