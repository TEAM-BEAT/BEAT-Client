import { PresignedResponse } from "@apis/domains/files/api";
import { useGetPresignedUrl, usePutS3Upload } from "@apis/domains/files/queries";
import { usePostPerformance } from "@apis/domains/performance/queries";
import { IconChecked } from "@assets/svgs";
import BankBottomSheet from "@components/commons/bank/bottomSheet/BankBottomSheet";
import InputAccountWrapper from "@components/commons/bank/InputAccountWrapper";
import InputBank from "@components/commons/bank/InputBank";
import Button from "@components/commons/button/Button";
import TextArea from "@components/commons/input/textArea/TextArea";
import TextField from "@components/commons/input/textField/TextField";
import Spacing from "@components/commons/spacing/Spacing";
import Stepper from "@components/commons/stepper/Stepper";
import TimePicker from "@components/commons/timepicker/TimePicker";
import { NAVIGATION_STATE } from "@constants/navigationState";
import useModal from "@hooks/useModal";
import Content from "@pages/gig/components/content/Content";
import ShowInfo from "@pages/gig/components/showInfo/ShowInfo";
import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import { numericFilter, phoneNumberFilter, priceFilter } from "@utils/useInputFilter";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHeader } from "./../../hooks/useHeader";
import GenreSelect from "./components/GenreSelect";
import InputRegisterBox from "./components/InputRegisterBox";
import PosterThumbnail from "./components/PosterThumbnail";
import StepperRegisterBox from "./components/StepperRegisterBox";
import TimePickerRegisterBox from "./components/TimePickerRegisterBox";
import { GENRE_LIST } from "./constants/genreList";
import * as S from "./Register.styled";
import RegisterMaker from "./RegisterMaker";
import { GigInfo } from "./typings/gigInfo";
import {
  handleBankClick,
  handleBankOpen,
  handleChange,
  handleDateChange,
  handleGenreSelect,
  handleImageUpload,
  handleTotalTicketCountChange,
  isAllFieldsFilled,
  onFreeClick,
  onMinusClick,
  onPlusClick,
} from "./utils/handleEvent";

const Register = () => {
  const [registerStep, setRegisterStep] = useState(1); // 등록 step 나누기
  const { openConfirm } = useModal();
  // gigInfo 초기화
  const [gigInfo, setGigInfo] = useState<GigInfo>({
    performanceTitle: "", // 공연명
    genre: "" as SHOW_TYPE_KEY, // 공연 장르
    runningTime: null, // 러닝 타임
    performanceDescription: "", // 공연 소개
    performanceAttentionNote: "", // 유의사항
    bankName: "", // 은행명
    accountNumber: "", // 계좌번호
    accountHolder: "", // 예금주
    posterImage: "", // 포스터 이미지 URL
    performanceTeamName: "", // 공연 팀명
    performanceVenue: "", // 공연 장소
    performanceContact: "", // 대표자 연락처
    performancePeriod: "", // 2023.12.28~2023.12.29
    ticketPrice: null, // 가격
    totalScheduleCount: 1, // 총 회차 수
    scheduleList: [
      {
        performanceDate: null, // 공연 일시
        totalTicketCount: null, // 총 티켓 수
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

  // 구조 분해 할당
  const {
    performanceTitle,
    genre,
    runningTime,
    performanceDescription,
    performanceAttentionNote,
    accountNumber,
    accountHolder,
    posterImage,
    performanceTeamName,
    performanceVenue,
    performancePeriod,
    performanceContact,
    ticketPrice,
    totalScheduleCount,
    scheduleList,
    castList,
    staffList,
  } = gigInfo;

  const [bankOpen, setBankOpen] = useState(false);
  const [bankInfo, setBankInfo] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const navigate = useNavigate();

  const [castImages, setCastImages] = useState<string[]>([]);
  const [staffImages, setStaffImages] = useState<string[]>([]);

  useEffect(() => {
    setCastImages(gigInfo.castList.map((_, index) => `cast-${index + 1}-${new Date().getTime()}`));
    setStaffImages(
      gigInfo.staffList.map((_, index) => `staff-${index + 1}-${new Date().getTime()}`)
    );
  }, [gigInfo.castList.length, gigInfo.staffList.length]);

  const params = {
    posterImage: `poster-${new Date().getTime()}`,
    castImages,
    staffImages,
  };

  const { data, refetch } = useGetPresignedUrl(params);
  const { mutate } = usePutS3Upload();
  const { mutateAsync: postPerformance } = usePostPerformance();
  console.log(gigInfo);

  const handleComplete = async () => {
    const { data, isSuccess } = await refetch();

    let posterUrls;
    let castUrls;
    let staffUrls;

    if (isSuccess) {
      const extractUrls = (data: PresignedResponse) => {
        posterUrls = Object.values(data.poster).map((url) => url.split("?")[0]);
        castUrls = Object.values(data.cast).map((url) => url.split("?")[0]);
        staffUrls = Object.values(data.staff).map((url) => url.split("?")[0]);

        return [...posterUrls, ...castUrls, ...staffUrls];
      };

      const S3Urls = extractUrls(data);

      const files = [
        gigInfo.posterImage,
        ...gigInfo.castList.map((cast) => cast.castPhoto),
        ...gigInfo.staffList.map((staff) => staff.staffPhoto),
      ];
      try {
        const res = await Promise.all(
          S3Urls.map(async (url, index) => {
            const file = files[index];

            const response = await fetch(file);
            const blob = await response.blob();
            const newFile = new File([blob], `fileName-${new Date()}`, { type: blob.type });

            return mutate({ url, file: newFile });
          })
        );

        const formData = {
          ...gigInfo,
          posterImage: posterUrls[0],
          castList: gigInfo.castList.map((cast, index) => ({
            ...cast,
            castPhoto: castUrls[index] || cast.castPhoto,
          })),
          staffList: gigInfo.staffList.map((staff, index) => ({
            ...staff,
            staffPhoto: staffUrls[index] || staff.staffPhoto,
          })),
          scheduleList: gigInfo.scheduleList.map((schedule) => ({
            ...schedule,
            performanceDate: dayjs(schedule.performanceDate).toISOString(),
          })),
          bankName: bankInfo ? bankInfo : "NONE",
        };

        try {
          await postPerformance(formData);
        } catch (err) {
          console.error("공연 등록 중 오류 발생:", err);
        }
      } catch (err) {
        console.error("파일 업로드 중 오류 발생:", err);
      }
    }
  };

  // 약관 동의
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  // 티켓 가격이 무료일 때 가격을 null로 설정하고 수정 불가능하게 함
  useEffect(() => {
    if (isFree) {
      setGigInfo((prev) => ({
        ...prev,
        ticketPrice: 0,
        accountNumber: "",
        bankName: "",
        accountHolder: "",
      }));
    } else {
      setGigInfo((prev) => ({
        ...prev,
        ticketPrice: null,
        accountNumber: "",
        bankName: "",
        accountHolder: "",
      }));
      setBankInfo("");
    }
  }, [isFree]);

  // 티켓 가격을 0으로 작성하면 자동으로 무료 공연 체크
  useEffect(() => {
    if (ticketPrice === 0) {
      setIsFree(true);
    }
  }, [ticketPrice]);

  const updateGigInfo = (newInfo: Partial<GigInfo>) => {
    setGigInfo((prev) => ({
      ...prev,
      ...newInfo,
    }));
  };

  const handleRegisterStep = () => {
    setRegisterStep((prev) => prev + 1);
  };

  const { setHeader } = useHeader();

  // 티켓 수량이 동일하게 적용
  useEffect(() => {
    const updatedScheduleList = Array.from({ length: gigInfo.totalScheduleCount }, (_, index) => {
      const existingSchedule = gigInfo.scheduleList[index];
      const totalTicketCount = gigInfo.scheduleList[0]?.totalTicketCount || null;
      return { ...existingSchedule, totalTicketCount };
    });
    setGigInfo((prev) => ({
      ...prev,
      scheduleList: updatedScheduleList,
    }));
  }, [gigInfo.totalScheduleCount]);

  const handleLeftBtn = () => {
    if (registerStep === 1) {
      openConfirm({
        title: "정말 나가시겠습니까?",
        subTitle: "지금 나가실 경우 작성하신 내용이 저장되지\n 않습니다.",
        okText: "작성할게요",
        okCallback: () => {
          setRegisterStep(1);
        },
        noText: "나갈게요",
        noCallback: () => {
          navigate("/main");
        },
      });
    } else {
      setRegisterStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const pageTitle =
      registerStep === 1 ? "공연 등록하기" : registerStep === 2 ? "공연진 상세정보" : "미리보기";
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE,
      title: pageTitle,
      leftOnClick: handleLeftBtn,
    });
  }, [setHeader, registerStep]);

  if (registerStep === 1) {
    return (
      <>
        <S.RegisterContainer>
          <PosterThumbnail
            value={posterImage}
            onImageUpload={(url) => handleImageUpload(url, setGigInfo)}
          />
          <S.Divider />
          <GenreSelect
            title="공연 장르"
            genres={GENRE_LIST}
            selectedGenre={genre}
            onGenreSelect={(selectedGenre) => handleGenreSelect(selectedGenre, setGigInfo)}
            marginBottom={2.4}
          />
          <S.Divider />
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
          <S.Divider />
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
          <S.Divider />
          <InputRegisterBox title="공연 소개">
            <TextArea
              name="performanceDescription"
              value={performanceDescription}
              onChange={(e) => handleChange(e, setGigInfo)}
              placeholder="공연을 예매할 예매자들에게 공연을 소개해주세요."
              maxLength={300}
            />
          </InputRegisterBox>
          <S.Divider />
          <InputRegisterBox title="러닝 타임">
            <TextField
              type="input"
              name="runningTime"
              value={runningTime !== null ? runningTime.toString() : ""}
              onChange={(e) => {
                handleChange(e as ChangeEvent<HTMLInputElement>, setGigInfo);
              }}
              filter={numericFilter}
              unit="time"
              placeholder="공연의 러닝 타임을 분 단위로 입력해주세요."
            />
          </InputRegisterBox>
          <S.Divider />
          <StepperRegisterBox title="회차 수" description="최대 3회차">
            <Stepper
              max={3}
              round={totalScheduleCount}
              onMinusClick={() => onMinusClick(setGigInfo)}
              onPlusClick={() => onPlusClick(setGigInfo)}
            />
          </StepperRegisterBox>
          <S.Divider />
          <TimePickerRegisterBox title="회차별 시간대">
            {scheduleList.map((schedule, index) => (
              <div key={index}>
                <S.InputDescription>{index + 1}회차</S.InputDescription>
                <Spacing marginBottom={"1"} />
                <TimePicker
                  value={schedule.performanceDate}
                  onChangeValue={(date) => handleDateChange(index, date, setGigInfo)}
                  minDate={
                    index > 0 ? scheduleList[index - 1].performanceDate || undefined : undefined
                  }
                />
              </div>
            ))}
          </TimePickerRegisterBox>
          <S.Divider />
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
          <S.Divider />
          <InputRegisterBox title="회차별 티켓 판매수">
            <TextField
              type="input"
              name="totalTicketCount"
              value={
                scheduleList[0].totalTicketCount !== null
                  ? scheduleList[0].totalTicketCount.toString()
                  : ""
              }
              onChange={(e) => handleTotalTicketCountChange(e, setGigInfo)}
              placeholder="판매할 티켓의 매 수를 입력해주세요."
              filter={numericFilter}
              unit="ticket"
            />
          </InputRegisterBox>
          <S.Divider />
          <InputRegisterBox title="유의사항">
            <TextArea
              name="performanceAttentionNote"
              value={performanceAttentionNote}
              onChange={(e) => handleChange(e, setGigInfo)}
              placeholder="입장 안내, 공연 중 인터미션, 공연장 반입금지 물품, 촬영 가능 여부, 주차 안내 등 예매자들이 꼭 알고 있어야할 유의사항을 입력해주세요."
              maxLength={300}
            />
          </InputRegisterBox>
          <S.Divider />
          <InputRegisterBox
            title="티켓 가격"
            description="*티켓 가격은 수정불가합니다."
            isFree={isFree}
            onFreeClick={() => onFreeClick(setIsFree)}
          >
            <TextField
              type="input"
              name="ticketPrice"
              value={ticketPrice !== null ? priceFilter(ticketPrice.toString()) : ""}
              onChange={(e) => {
                handleChange(e as ChangeEvent<HTMLInputElement>, setGigInfo);
              }}
              placeholder="가격을 입력해주세요."
              disabled={isFree}
              unit="amount"
            />
          </InputRegisterBox>
          <S.Divider />
          {!isFree && (
            <>
              <InputAccountWrapper>
                <InputBank
                  isDisabled={isFree}
                  bankOpen={bankOpen}
                  onClick={() => handleBankOpen(setBankOpen)}
                >
                  {bankInfo}
                </InputBank>
                <TextField
                  name="accountNumber"
                  value={accountNumber}
                  onChange={(e) => handleChange(e, setGigInfo)}
                  filter={numericFilter}
                  placeholder="입금 받으실 계좌번호를 (-)제외 숫자만 입력해주세요."
                />
                <TextField
                  name="accountHolder"
                  value={accountHolder}
                  onChange={(e) => handleChange(e, setGigInfo)}
                  placeholder="예금주명을 입력해주세요."
                />
              </InputAccountWrapper>
              <S.Divider />
            </>
          )}
          <BankBottomSheet
            value={bankInfo}
            onBankClick={(value) => handleBankClick(value, setGigInfo, setBankInfo, setBankOpen)}
            isOpen={bankOpen}
            onOutClick={() => handleBankOpen(setBankOpen)}
          />

          <InputRegisterBox title="대표자 연락처">
            <TextField
              type="input"
              name="performanceContact"
              value={performanceContact}
              filter={phoneNumberFilter}
              onChange={(e) => handleChange(e, setGigInfo)}
              placeholder="문의 가능한 대표 번호를 숫자만 입력해주세요."
              maxLength={13}
            />
          </InputRegisterBox>
        </S.RegisterContainer>
        <S.FooterContainer>
          <S.FooterDivider />
          <S.CheckboxContainer>
            <S.CheckboxLabel>
              <S.Checkbox
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              ></S.Checkbox>
              한 명 이상의 예매자가 있을 경우, 공연 삭제가 불가해요.
              {isChecked ? <IconChecked width={18} /> : <S.NonCheck />}
            </S.CheckboxLabel>
          </S.CheckboxContainer>
          <Button
            onClick={handleRegisterStep}
            disabled={!isAllFieldsFilled(gigInfo, isFree) || !isChecked}
          >
            다음
          </Button>
        </S.FooterContainer>
      </>
    );
  }

  if (registerStep === 2) {
    return (
      <>
        <button style={{ width: "500px", color: "white" }} onClick={handleComplete}>
          제출 테스트
        </button>
        <RegisterMaker
          castList={castList}
          staffList={staffList}
          handleRegisterStep={handleRegisterStep}
          updateGigInfo={updateGigInfo}
        />
      </>
    );
  }

  if (registerStep === 3) {
    return (
      <>
        <S.PreviewBanner>예매자에게 보여질 화면 예시입니다. 확인해주세요.</S.PreviewBanner>
        <ShowInfo
          posterImage={posterImage}
          genre={genre}
          title={performanceTitle}
          price={ticketPrice}
          venue={performanceVenue}
          period={performancePeriod}
          runningTime={runningTime}
          // 타임존 안맞아서 지금 날짜 안맞는데 로컬 타임존으로 보이게 설정하면 기간 잘 맞아요!
          scheduleList={scheduleList.map((schedule, index) => ({
            scheduleId: index + 1,
            performanceDate: schedule.performanceDate?.toString() || "",
            scheduleNumber: (index + 1).toString(),
          }))}
        />
        <Content
          description={performanceDescription}
          attentionNote={performanceAttentionNote}
          contact={performanceContact}
          teamName={performanceTeamName}
          castList={castList.map((cast, index) => ({
            ...cast,
            castId: index + 1,
          }))}
          staffList={staffList.map((cast, index) => ({
            ...cast,
            staffId: index + 1,
          }))}
        />
        <S.FooterContainer>
          <Button onClick={handleComplete}>완료하기</Button>
        </S.FooterContainer>
      </>
    );
  }
};

export default Register;
