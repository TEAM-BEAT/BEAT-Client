import { PresignedResponse } from "@apis/domains/files/api";
import { useGetPresignedUrl, usePutS3Upload } from "@apis/domains/files/queries";
import type { PerformanceRequest } from "@apis/domains/performances/api";
import { usePostPerformance } from "@apis/domains/performances/queries";
import { IcNoti, IconChecked } from "@assets/svgs";
import BankBottomSheet from "@components/commons/bank/bottomSheet/BankBottomSheet";
import InputAccountWrapper from "@components/commons/bank/InputAccountWrapper";
import InputBank from "@components/commons/bank/InputBank";
import Button from "@components/commons/button/Button";
import TextArea from "@components/commons/input/textArea/TextArea";
import TextField from "@components/commons/input/textField/TextField";
import MapInput from "@components/commons/mapInput/MapInput";
import MetaTag from "@components/commons/meta/MetaTag";
import Spacing from "@components/commons/spacing/Spacing";
import Stepper from "@components/commons/stepper/Stepper";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useLogin, useModal } from "@hooks";
import Content from "@pages/gig/components/content/Content";
import ShowInfo from "@pages/gig/components/showInfo/ShowInfo";
import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import { navigateAtom } from "@stores";
import { requestKakaoLogin } from "@utils/kakaoLogin";
import { numericFilter, phoneNumberFilter, priceFilter } from "@utils/useInputFilter";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHeader } from "./../../hooks/useHeader";
import DateTimePicker from "./components/DateTimePicker";
import DetailImage from "./components/DetailImage";
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
  handleDateTimeChange,
  handleGenreSelect,
  handleImagesUpload,
  handleImageUpload,
  handleTotalTicketCountChange,
  isAllFieldsFilled,
  onFreeClick,
  onMinusClick,
  onPlusClick,
} from "./utils/handleEvent";
import { trackEvent } from "src/track/track";
import { TRACK_EVENTS } from "src/track/constants/events";

const Register = () => {
  const { isLogin } = useLogin();
  const [registerStep, setRegisterStep] = useState(1); // 등록 step 나누기
  const { openAlert, openConfirm } = useModal();

  const user = localStorage?.getItem("user");
  const [, setNavigateUrl] = useAtom(navigateAtom);

  const handleKakaoLogin = (url: string) => {
    setNavigateUrl(url);
    requestKakaoLogin();
  };

  useEffect(() => {
    const userObj = JSON.parse(user);

    if (userObj === null) {
      openAlert({
        title: "로그인이 필요한 서비스입니다.",
        okCallback: () => navigate("/main"),
      });
      handleKakaoLogin("/gig-register");
    }
  }, []);

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
    performanceImageList: [], // 상세 이미지 URL
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
      // {
      // castName: "", // 이름
      // castRole: "", // 역할
      // castPhoto: "", // 출연진 사진 URL
      // },
    ],
    staffList: [
      // {
      // staffName: "", // 이름
      // staffRole: "", // 역할
      // staffPhoto: "", // 스태프 사진 URL
      // },
    ],
    //placeName: "",
    roadAddressName: "",
    placeDetailAddress: "",
    latitude: "",
    longitude: "",
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
    performanceImageList,
    performanceTeamName,
    performanceVenue,
    performancePeriod,
    performanceContact,
    ticketPrice,
    totalScheduleCount,
    scheduleList,
    castList,
    staffList,
    roadAddressName,
    placeDetailAddress,
    latitude,
    longitude,
  } = gigInfo;

  const [bankOpen, setBankOpen] = useState(false);
  const [bankInfo, setBankInfo] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const navigate = useNavigate();

  const [castImages, setCastImages] = useState<string[]>([]);
  const [staffImages, setStaffImages] = useState<string[]>([]);
  const [performanceImages, setPerformanceImages] = useState<string[]>([]);

  useEffect(() => {
    setCastImages(gigInfo.castList.map((_, index) => `cast-${index + 1}-${new Date().getTime()}`));
    setStaffImages(
      gigInfo.staffList.map((_, index) => `staff-${index + 1}-${new Date().getTime()}`)
    );
    setPerformanceImages(
      gigInfo.performanceImageList.map(
        (_, index) => `performance-${index + 1}-${new Date().getTime()}`
      )
    );
  }, [gigInfo.castList.length, gigInfo.staffList.length, gigInfo.performanceImageList.length]);

  const params = {
    posterImage: `poster-${new Date().getTime()}`,
    castImages,
    staffImages,
    performanceImages,
  };

  const { data, refetch } = useGetPresignedUrl(params);
  const { mutateAsync: uploadToS3 } = usePutS3Upload();
  const { mutateAsync: postPerformance } = usePostPerformance();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const uploadFileToS3 = async (uploadUrl: string, localUrl: string) => {
    const response = await fetch(localUrl);
    const blob = await response.blob();
    const file = new File([blob], `fileName-${new Date()}`, { type: blob.type });
    const result = await uploadToS3({ url: uploadUrl, file });

    if (!result) {
      throw new Error("S3 업로드 실패");
    }
  };

  const handleComplete = async () => {
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    const { data, isSuccess } = await refetch();
    if (!isSuccess || !data) {
      openAlert({ title: "이미지 업로드에 실패했습니다.\n 다시 시도해주세요." });
      return;
    }

    const posterUpload = data.poster[params.posterImage];
    if (!posterUpload) {
      openAlert({ title: "포스터 이미지 업로드 정보를 찾을 수 없습니다." });
      return;
    }

    try {
      await uploadFileToS3(posterUpload.uploadUrl, gigInfo.posterImage);

      const castUrls = await Promise.all(
        gigInfo.castList.map(async (cast, index) => {
          if (!cast.castPhoto) {
            return "";
          }
          const upload = data.cast[castImages[index]];
          if (!upload) {
            throw new Error("출연진 이미지 업로드 정보가 없습니다.");
          }
          await uploadFileToS3(upload.uploadUrl, cast.castPhoto);
          return upload.imageKey;
        })
      );

      const staffUrls = await Promise.all(
        gigInfo.staffList.map(async (staff, index) => {
          if (!staff.staffPhoto) {
            return "";
          }
          const upload = data.staff[staffImages[index]];
          if (!upload) {
            throw new Error("스태프 이미지 업로드 정보가 없습니다.");
          }
          await uploadFileToS3(upload.uploadUrl, staff.staffPhoto);
          return upload.imageKey;
        })
      );

      const performanceUrls = await Promise.all(
        gigInfo.performanceImageList.map(async (image, index) => {
          const upload = data.performance[performanceImages[index]];
          if (!upload) {
            throw new Error("공연 상세 이미지 업로드 정보가 없습니다.");
          }
          await uploadFileToS3(upload.uploadUrl, image.performanceImage);
          return upload.imageKey;
        })
      );

      const formData = {
        ...gigInfo,
        posterImage: posterUpload.imageKey,
        castList: gigInfo.castList.map((cast, index) => ({
          ...cast,
          castPhoto: castUrls[index],
        })),
        staffList: gigInfo.staffList.map((staff, index) => ({
          ...staff,
          staffPhoto: staffUrls[index],
        })),
        performanceImageList: performanceUrls.map((url) => ({
          performanceImage: url,
        })),
        scheduleList: gigInfo.scheduleList.map((schedule) => {
          const date = dayjs(schedule.performanceDate).toDate();
          const offset = date.getTimezoneOffset() * 60000;
          const dateOffset = new Date(date.getTime() - offset);
          return {
            ...schedule,
            performanceDate: dateOffset.toISOString(),
          };
        }),
        bankName: bankInfo ? bankInfo : "NONE",
      };

      try {
        await postPerformance(formData as PerformanceRequest);
      } catch (err) {
        console.error("공연 등록 오류:", err);
        const errorMessage =
          err?.response?.status === 401
            ? "로그인 세션이 만료되었습니다.\n 다시 로그인 후 시도해주세요."
            : "공연 등록을 실패했습니다.\n 다시 시도해주세요.";
        openAlert({ title: errorMessage });
      }
    } catch (err) {
      console.error("파일 업로드 중 오류 발생:", err);
      openAlert({ title: "이미지 업로드에 실패했습니다.\n 다시 시도해주세요." });
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
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

  const setLatitudeLongitude = (latitude: string, longitude: string) => {
    setGigInfo((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [registerStep]);

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

  useEffect(() => {
    trackEvent(TRACK_EVENTS.VIEWED_PAGE_GIGREGISTER);
  }, []);

  if (registerStep === 1) {
    return (
      <>
        <MetaTag title="공연 등록" />
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
              maxLength={18}
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
              maxLength={20}
              cap={true}
            />
          </InputRegisterBox>
          <S.Divider />
          <InputRegisterBox title="공연장 이름">
            <TextField
              type="input"
              name="performanceVenue"
              value={performanceVenue}
              onChange={(e) => handleChange(e, setGigInfo)}
              placeholder="ex) 홍익아트홀 303호 소극장"
              cap={true}
            />
          </InputRegisterBox>
          <S.Divider />
          <InputRegisterBox title="공연장 주소">
            <MapInput
              name="roadAddressName"
              value={roadAddressName}
              onChange={(e) => handleChange(e, setGigInfo)}
              setLatitudeLongitude={setLatitudeLongitude}
              placeholder="지번, 도로명, 건물명으로 검색해주세요."
              cap={true}
            />
            <Spacing marginBottom="1.4" />
            <TextField
              name="placeDetailAddress"
              value={placeDetailAddress}
              onChange={(e) => handleChange(e, setGigInfo)}
              placeholder="건물명, 층 수 등의 상세주소를 입력해주세요."
            />
          </InputRegisterBox>
          <S.Divider />
          <DetailImage
            value={performanceImageList}
            onImagesUpload={(performanceImage) => handleImagesUpload(performanceImage, setGigInfo)}
          />
          <S.Divider />
          <InputRegisterBox title="공연 소개">
            <TextArea
              name="performanceDescription"
              value={performanceDescription}
              onChange={(e) => handleChange(e, setGigInfo)}
              placeholder="공연을 예매할 예매자들에게 공연을 소개해주세요."
              maxLength={1500}
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
              inputMode="numeric"
            />
          </InputRegisterBox>
          <S.Divider />
          <StepperRegisterBox title="회차 수" description="최대 10회차">
            <Stepper
              max={10}
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
                <DateTimePicker
                  value={schedule.performanceDate}
                  onChangeDateTime={(date) => handleDateTimeChange(index, date, setGigInfo)}
                />
              </div>
            ))}
          </TimePickerRegisterBox>
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
              inputMode="numeric"
            />
          </InputRegisterBox>
          <S.Divider />
          <InputRegisterBox title="유의사항">
            <TextArea
              name="performanceAttentionNote"
              value={performanceAttentionNote}
              onChange={(e) => handleChange(e, setGigInfo)}
              placeholder="입장 안내, 공연 중 인터미션, 공연장 반입금지 물품, 촬영 가능 여부, 주차 안내 등 예매자들이 꼭 알고 있어야할 유의사항을 입력해주세요."
              maxLength={1500}
            />
          </InputRegisterBox>
          <S.Divider />
          <InputRegisterBox
            title="티켓 가격"
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
              inputMode="numeric"
            />
            <Spacing marginBottom="0.8" />
            <S.NotiDiscription>
              <IcNoti width={20} />
              티켓 가격과 계좌 정보는 이후 수정불가합니다.
            </S.NotiDiscription>
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
                  inputMode="numeric"
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
              inputMode="tel"
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
        <MetaTag title="공연 등록" />
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
        <MetaTag title="공연 등록" />
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
          performanceImageList={performanceImageList}
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
          performanceVenue={performanceVenue}
          roadAddressName={roadAddressName}
          placeDetailAddress={placeDetailAddress}
          latitude={latitude}
          longitude={longitude}
        />
        <S.FooterContainer $isFinish={true}>
          <Button onClick={handleComplete} isPending={isSubmitting} disabled={isSubmitting}>
            등록하기
          </Button>
        </S.FooterContainer>
      </>
    );
  }
};

export default Register;
