import TextField from "@components/commons/input/textField/TextField";
import InputRegisterBox from "./components/InputRegisterBox";
import * as S from "./Register.styled";
import { useState } from "react";
import TextArea from "@components/commons/input/textArea/TextArea";
import { numericFilter, phoneNumberFilter, priceFilter } from "@utils/useInputFilter";
import Stepper from "@components/commons/stepper/Stepper";
import StepperRegisterBox from "./components/StepperRegisterBox";
import TimePickerRegisterBox from "./components/TimePickerRegisterBox";
import TimePicker from "@components/commons/timepicker/TimePicker";
import InputAccountWrapper from "@components/commons/bank/InputAccountWrapper";
import InputBank from "@components/commons/bank/InputBank";
import BankBottomSheet from "@components/commons/bank/bottomSheet/BankBottomSheet";
import GenreSelect from "./components/GenreSelect";
import PosterThumbnail from "./components/PosterThumbnail";
import Spacing from "@components/commons/spacing/Spacing";
import { GENRE_LIST } from "./constants/genreList";
import { Dayjs } from "dayjs";

import {
  handleImageUpload,
  handleGenreSelect,
  handleChange,
  onMinusClick,
  onPlusClick,
  handleDateChange,
  handleBankOpen,
  handleBankClick,
} from "./utils/handleEvent";
import { GigInfo } from "./typings/gigInfo";

const Register = () => {
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
        scheduleNumber: "", // 회차 번호
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

  const [round, setRound] = useState(1); // 회차
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // 선택한 날짜
  const [bankOpen, setBankOpen] = useState(false);
  const [bankInfo, setBankInfo] = useState("");

  console.log(gigInfo);

  return (
    <S.RegisterContainer>
      <PosterThumbnail onImageUpload={(url) => handleImageUpload(url, setGigInfo)} />

      <GenreSelect
        title="공연 장르"
        genres={GENRE_LIST}
        selectedGenre={genre}
        onGenreSelect={(selectedGenre) => handleGenreSelect(selectedGenre, setGigInfo)}
        marginBottom={2.4}
      />

      <InputRegisterBox title="공연명">
        <TextField
          type="input"
          name="performanceTitle"
          value={performanceTitle}
          onChange={(e) => handleChange(e, setGigInfo)}
          placeholder="등록될 공연의 이름을 입력해주세요."
          maxLength={30}
          cap={true}
        />
      </InputRegisterBox>

      <InputRegisterBox title="주최 단체명">
        <TextField
          type="input"
          name="performanceTeamName"
          value={performanceTeamName}
          onChange={(e) => handleChange(e, setGigInfo)}
          placeholder="주최하는 공연진(단체)의 이름을 입력해주세요."
          maxLength={10}
          cap={true}
        />
      </InputRegisterBox>

      <InputRegisterBox title="공연 소개">
        <TextArea
          name="performanceDescription"
          value={performanceDescription}
          onChange={(e) => handleChange(e, setGigInfo)}
          placeholder="공연을 예매할 예매자들에게 공연을 소개해주세요."
          maxLength={300}
        />
      </InputRegisterBox>

      <InputRegisterBox title="러닝 타임">
        <TextField
          type="input"
          name="runningTime"
          value={runningTime}
          onChange={(e) => handleChange(e, setGigInfo)}
          filter={numericFilter}
          unit="time"
          placeholder="공연의 러닝 타임을 분 단위로 입력해주세요."
        />
      </InputRegisterBox>

      <StepperRegisterBox title="회차 수">
        <Stepper
          max={3}
          round={totalScheduleCount}
          onMinusClick={() => onMinusClick(setGigInfo)}
          onPlusClick={() => onPlusClick(setGigInfo)}
        />
      </StepperRegisterBox>

      <TimePickerRegisterBox title="회차별 시간대">
        {scheduleList.map((schedule, index) => (
          <div key={index}>
            <S.InputDescription>{index + 1}회차</S.InputDescription>
            <Spacing marginBottom={"1"} />
            <TimePicker
              value={schedule.performanceDate}
              onChangeValue={(date) => handleDateChange(index, date, setGigInfo)}
            />
          </div>
        ))}
      </TimePickerRegisterBox>

      <InputRegisterBox title="공연 장소">
        <TextField
          type="input"
          name="performanceVenue"
          value={performanceVenue}
          onChange={(e) => handleChange(e, setGigInfo)}
          placeholder="ex:) 홍익아트홀 303호 소극장"
          maxLength={15}
          cap={true}
        />
      </InputRegisterBox>

      <InputRegisterBox title="티켓 가격">
        <TextField
          type="input"
          name="ticketPrice"
          value={ticketPrice}
          onChange={(e) => handleChange(e, setGigInfo)}
          placeholder="가격을 입력해주세요."
          filter={priceFilter}
          unit="amount"
        />
      </InputRegisterBox>

      <InputRegisterBox title="유의사항">
        <TextArea
          name="performanceAttentionNote"
          value={performanceAttentionNote}
          onChange={(e) => handleChange(e, setGigInfo)}
          placeholder="입장 안내, 공연 중 인터미션, 공연장 반입금지 물품, 촬영 가능 여부, 주차 안내 등 예매자들이 꼭 알고 있어야할 유의사항을 입력해주세요."
          maxLength={300}
        />
      </InputRegisterBox>

      <InputAccountWrapper>
        <InputBank bankOpen={bankOpen} onClick={() => handleBankOpen(setBankOpen)}>
          {bankInfo}
        </InputBank>
        <TextField
          name="accountNumber"
          value={accountNumber}
          onChange={(e) => handleChange(e, setGigInfo)}
          filter={numericFilter}
          placeholder="입금 받으실 계좌번호를 (-)제외 숫자만 입력해주세요."
        />
      </InputAccountWrapper>
      {bankOpen && (
        <BankBottomSheet
          value={bankInfo}
          onBankClick={(value) => handleBankClick(value, setGigInfo, setBankInfo, setBankOpen)}
          onOutClick={() => handleBankOpen(setBankOpen)}
        />
      )}

      <InputRegisterBox title="대표자 연락처">
        <TextField
          type="input"
          name="performanceContact"
          value={performanceContact}
          filter={phoneNumberFilter}
          onChange={(e) => handleChange(e, setGigInfo)}
          placeholder="문의 가능한 대표 번호를 숫자만 입력해주세요."
        />
      </InputRegisterBox>
    </S.RegisterContainer>
  );
};

export default Register;
