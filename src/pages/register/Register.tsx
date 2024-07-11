import TextField from "@components/commons/input/textField/TextField";
import InputRegisterBox from "./components/InputRegisterBox";
import * as S from "./Register.styled";
import { ChangeEvent, useState } from "react";

const Register = () => {
  const [gigInfo, setGigInfo] = useState({
    performanceTitle: "", // 공연명
    genre: "", // 공연 장르
    runningTime: null,
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
    totalScheduleCount: null, // 총 회차 수
    scheduleList: [
      {
        performanceDate: null, // 공연 일시
        totalTicketCount: null, // 총 티켓 수
        scheduleNumber: null, // 회차 번호
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

  // 구조 분해 할당
  const {
    performanceTitle,
    genre,
    runningTime,
    performanceDescription,
    performanceAttentionNote,
    bankName,
    accountNumber,
    posterImage,
    performanceTeamName,
    performanceVenue,
    performanceContact,
    performancePeriod,
    ticketPrice,
    totalScheduleCount,
    scheduleList,
    castList,
    staffList,
  } = gigInfo;

  // scheduleList, castList, staffList의 첫 번째 요소에 대한 구조 분해 할당
  const [firstSchedule] = scheduleList;
  const [firstCast] = castList;
  const [firstStaff] = staffList;

  const { performanceDate, totalTicketCount, scheduleNumber } = firstSchedule || {}; // firstSchedule이 존재하지 않을 경우 빈 객체를 할당

  const { castName, castRole, castPhoto } = firstCast || {}; // firstCast가 존재하지 않을 경우 빈 객체를 할당

  const { staffName, staffRole, staffPhoto } = firstStaff || {}; // firstStaff가 존재하지 않을 경우 빈 객체를 할당

  // 하나의 handleChange 함수에서 관리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = e.target;
    setGigInfo((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  return (
    <S.RegisterContainer>
      <InputRegisterBox title="공연명">
        <TextField
          type="input"
          name="performanceTitle"
          value={performanceTitle}
          onChange={handleChange}
          placeholder="등록될 공연의 이름을 입력해주세요."
          maxLength={30}
          cap={true}
        />
      </InputRegisterBox>
    </S.RegisterContainer>
  );
};

export default Register;
