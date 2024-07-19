import { usePerformanceDelete, usePerformanceEdit } from "@apis/domains/performances/queries";
import { IconChecked } from "@assets/svgs";
import BankBottomSheet from "@components/commons/bank/bottomSheet/BankBottomSheet";
import InputAccountWrapper from "@components/commons/bank/InputAccountWrapper";
import InputBank from "@components/commons/bank/InputBank";
import Button from "@components/commons/button/Button";
import TextArea from "@components/commons/input/textArea/TextArea";
import TextField from "@components/commons/input/textField/TextField";
import Loading from "@components/commons/loading/Loading";
import Spacing from "@components/commons/spacing/Spacing";
import Stepper from "@components/commons/stepper/Stepper";
import TimePicker from "@components/commons/timepicker/TimePicker";
import { NAVIGATION_STATE } from "@constants/navigationState";
import useModal from "@hooks/useModal";
import Content from "@pages/gig/components/content/Content";
import ShowInfo, { SchelduleListType } from "@pages/gig/components/showInfo/ShowInfo";
import { numericFilter, phoneNumberFilter, priceFilter } from "@utils/useInputFilter";
import dayjs from "dayjs";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHeader } from "./../../hooks/useHeader";
import GenreSelect from "./components/GenreSelect";
import InputModifyManageBox from "./components/InputModifyManage";
import PosterThumbnail from "./components/PosterThumbnail";
import StepperModifyManageBox from "./components/StepperModifyManageBox";
import TimePickerModifyManageBox from "./components/TimePickerModifyManageBox";
import { GENRE_LIST } from "./constants/genreList";
import ModifyManageMaker from "./ModifyMaker";
import * as S from "./ModifyManage.styled";
import { Cast, DataProps, Schedule, Staff } from "./typings/gigInfo";
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

const ModifyManage = () => {
  const [ModifyManageStep, setModifyManageStep] = useState(1); // 등록 step 나누기
  const { openConfirm, closeConfirm, openAlert, closeAlert } = useModal();
  // gigInfo 초기화
  const { performanceId } = useParams();

  const { data, isLoading } = usePerformanceEdit(Number(performanceId));
  const [gigInfo, setGigInfo] = useState<DataProps>(data as DataProps);

  useEffect(() => {
    setGigInfo(data as DataProps);
  }, [data]);

  let performanceTitle: string | undefined,
    genre: "BAND" | "DANCE" | "PLAY" | "ETC" | string | undefined,
    runningTime: number | null | undefined,
    performanceDescription: string | undefined,
    performanceAttentionNote: string | undefined,
    accountNumber: string | undefined,
    posterImage: string | undefined,
    performanceTeamName: string | undefined,
    performanceVenue: string | undefined,
    performancePeriod: string | undefined,
    performanceContact: string | undefined,
    ticketPrice: number | undefined,
    totalScheduleCount: number | undefined,
    scheduleList: Schedule[] | undefined,
    castList: Cast[] | undefined,
    staffList: Staff[] | undefined,
    bankName: string | undefined,
    isBookerExist: boolean | undefined,
    accountHolder: string | undefined;

  if (gigInfo) {
    performanceTitle = gigInfo.performanceTitle;
    genre = gigInfo.genre;
    runningTime = gigInfo.runningTime;
    performanceDescription = gigInfo.performanceDescription;
    performanceAttentionNote = gigInfo.performanceAttentionNote;
    accountNumber = gigInfo.accountNumber;
    posterImage = gigInfo.posterImage;
    performanceTeamName = gigInfo.performanceTeamName;
    performanceVenue = gigInfo.performanceVenue;
    performancePeriod = gigInfo.performancePeriod;
    performanceContact = gigInfo.performanceContact;
    ticketPrice = gigInfo.ticketPrice;
    totalScheduleCount = gigInfo.totalScheduleCount;
    scheduleList = gigInfo.scheduleList;

    if (gigInfo?.castList?.length === 0) {
      castList = [
        {
          castId: -1,
          castName: "", // 이름
          castRole: "", // 역할
          castPhoto: "", // 출연진 사진 URL
        },
      ];
    } else {
      castList = gigInfo.castList;
    }
    if (gigInfo?.staffList?.length === 0) {
      staffList = [
        {
          staffId: -1,
          staffName: "", // 이름
          staffRole: "", // 역할
          staffPhoto: "", // 출연진 사진 URL
        },
      ];
    } else {
      staffList = gigInfo.staffList;
    }

    bankName = gigInfo.bankName;
    isBookerExist = gigInfo.isBookerExist;
    accountHolder = gigInfo.accountHolder;
  }

  const [bankOpen, setBankOpen] = useState(false);
  const [bankInfo, setBankInfo] = useState(bankName); //가져온 은행 이름으로 초기화
  const [isChecked, setIsChecked] = useState(true); //처음 가져오는 거니까 그냥 체크된 상태로 시작
  const [isFree, setIsFree] = useState(ticketPrice === 0); //티켓 가격이 0원이면 체크 박스 표시되도록 변경.
  const [isExist, setIsExist] = useState(isBookerExist);
  const navigate = useNavigate();

  //여기서 공연 수정하기 PUT 요청 보내야함
  const handleComplete = () => {
    console.log("gigInfo:", gigInfo);
    //navigate("/ModifyManage-complete");
  };

  // 약관 동의
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  // 티켓 가격이 무료일 때 가격을 0으로 설정하고 수정 불가능하게 함
  useEffect(() => {
    if (isFree) {
      setGigInfo((prev) => ({
        ...prev,
        ticketPrice: 0,
        accountNumber: "",
        bankName: "",
      }));
    }
  }, [isFree]);

  // 티켓 가격을 0으로 작성하면 자동으로 무료 공연 체크
  useEffect(() => {
    if (ticketPrice === 0) {
      setIsFree(true);
    }
  }, [ticketPrice]);

  // 티켓 가격을 0으로 작성하면 자동으로 무료 공연 체크
  useEffect(() => {
    if (ticketPrice === 0) {
      setIsFree(true);
    }
  }, [ticketPrice]);

  const updateGigInfo = (newInfo: Partial<{ castList: Cast[]; staffList: Staff[] }>) => {
    setGigInfo((prev) => ({
      ...prev,
      ...newInfo,
    }));
  };
  console.log("긱인포: ", gigInfo);

  const handleModifyManageStep = () => {
    setModifyManageStep((prev) => prev + 1);
  };

  const { setHeader } = useHeader();

  const handleLeftBtn = () => {
    if (ModifyManageStep === 1) {
      openConfirm({
        title: "수정을 취소할까요?",
        subTitle: "페이지를 나갈 경우, 내용이 저장되지 않아요.",
        okText: "취소할게요",
        okCallback: () => {
          navigate("/gig-manage");
        },
        noText: "아니요",
        noCallback: () => {
          setModifyManageStep(1);
        },
      });
    } else {
      setModifyManageStep((prev) => prev - 1);
    }
  };

  const { mutate, mutateAsync } = usePerformanceDelete();

  const handleDeletePerformance = async (_performanceId: number, isExisttt: boolean) => {
    //사용자가 한명 이상 있으면 안된다는 문구 띄움 - 동훈이가 수정 시 공연 정보 조회 API (GET)에 COUNT나 bookingList를 넘겨줄 듯
    if (isExisttt) {
      openAlert({
        title: "공연 삭제가 불가해요.",
        subTitle: "예매자가 1명 이상 있을 경우, 삭제할 수 없어요.",
        okText: "확인했어요",
        okCallback: closeAlert,
      });
    } else {
      //공연 삭제하는 로직 - performanceId 하나로 DELETE 요청 보내고,
      await mutateAsync(Number(performanceId));
      navigate("/gig-manage");
    }
  };

  const handleRightBtn = () => {
    openConfirm({
      title: "공연을 삭제하시겠어요?",
      subTitle: "삭제할 경우, 작성했던 내용을 되돌릴 수 없어요.",
      okText: "삭제할게요",
      okCallback: () => {
        //공연 수정 DELETE API 요청 쏘는 로직 존재할 예정
        handleDeletePerformance(1, isExist as boolean); //예시로 박아둠
      },
      noText: "아니요",
      noCallback: () => {
        closeConfirm();
      },
    });
  };

  useEffect(() => {
    const pageTitle =
      ModifyManageStep === 1
        ? "공연 수정하기"
        : ModifyManageStep === 2
          ? "공연 수정하기"
          : "미리보기";
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE_SUB_TEXT,
      title: pageTitle,
      subText: "삭제",
      leftOnClick: handleLeftBtn,
      rightOnClick: handleRightBtn,
    });
  }, [setHeader, ModifyManageStep]);

  if (isLoading) {
    return <Loading />;
  }

  if (gigInfo) {
    if (ModifyManageStep === 1) {
      return (
        <>
          <S.ModifyManageContainer>
            <PosterThumbnail
              value={posterImage}
              onImageUpload={(url) => handleImageUpload(url, setGigInfo)}
            />
            <S.Divider />
            <GenreSelect
              title="공연 장르"
              genres={GENRE_LIST}
              selectedGenre={genre as string}
              onGenreSelect={(selectedGenre) => handleGenreSelect(selectedGenre, setGigInfo)}
              marginBottom={2.4}
            />
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="공연명">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceTitle"
                value={performanceTitle}
                onChange={(e) => handleChange(e, setGigInfo)}
                placeholder="등록될 공연의 이름을 입력해주세요."
                maxLength={30}
                cap={true}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="주최 단체명">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceTeamName"
                value={performanceTeamName}
                onChange={(e) => handleChange(e, setGigInfo)}
                placeholder="주최하는 공연진(단체)의 이름을 입력해주세요."
                maxLength={10}
                cap={true}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="공연 소개">
              <TextArea
                name="performanceDescription"
                value={performanceDescription}
                onChange={(e) => handleChange(e, setGigInfo)}
                placeholder="공연을 예매할 예매자들에게 공연을 소개해주세요."
                maxLength={300}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="러닝 타임">
              <TextField
                isDisabled={false}
                type="input"
                name="runningTime"
                value={runningTime ?? ""}
                onChange={(e) => handleChange(e, setGigInfo)}
                filter={numericFilter}
                unit="time"
                placeholder="공연의 러닝 타임을 분 단위로 입력해주세요."
              />
            </InputModifyManageBox>
            <S.Divider />
            <StepperModifyManageBox title="회차 수" description="최대 3회차">
              <Stepper
                max={3}
                round={totalScheduleCount as number}
                disabled={true}
                onMinusClick={() => onMinusClick(setGigInfo)}
                onPlusClick={() => onPlusClick(setGigInfo)}
              />
            </StepperModifyManageBox>
            <S.Divider />
            <TimePickerModifyManageBox
              title="회차별 시간대"
              description="*회차별 시간대는 수정불가합니다."
            >
              {scheduleList?.map((schedule, index) => (
                <div key={index}>
                  <S.InputDescription>{index + 1}회차</S.InputDescription>
                  <Spacing marginBottom={"1"} />
                  <TimePicker
                    disabled={true}
                    value={dayjs(schedule.performanceDate)}
                    onChangeValue={(date) => handleDateChange(index, date, setGigInfo)}
                  />
                </div>
              ))}
            </TimePickerModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="공연 장소">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceVenue"
                value={performanceVenue}
                onChange={(e) => handleChange(e, setGigInfo)}
                placeholder="ex:) 홍익아트홀 303호 소극장"
                maxLength={15}
                cap={true}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="회차별 티켓 판매수">
              <TextField
                isDisabled={false}
                type="input"
                name="totalTicketCount"
                value={scheduleList?.[0].totalTicketCount}
                onChange={(e) => handleTotalTicketCountChange(e, setGigInfo)}
                placeholder="판매할 티켓의 매 수를 입력해주세요."
                filter={numericFilter}
                unit="ticket"
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="유의사항">
              <TextArea
                name="performanceAttentionNote"
                value={performanceAttentionNote}
                onChange={(e) => handleChange(e, setGigInfo)}
                placeholder="입장 안내, 공연 중 인터미션, 공연장 반입금지 물품, 촬영 가능 여부, 주차 안내 등 예매자들이 꼭 알고 있어야할 유의사항을 입력해주세요."
                maxLength={300}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox
              isDisabled={isExist as boolean}
              title="티켓 가격"
              description="*티켓 가격은 수정불가합니다."
              isFree={isFree}
              onFreeClick={() => onFreeClick(setIsFree)}
            >
              <TextField
                isDisabled={isExist}
                type="input"
                name="ticketPrice"
                value={ticketPrice ?? ""}
                onChange={(e) => handleChange(e, setGigInfo)}
                placeholder="가격을 입력해주세요."
                filter={priceFilter}
                disabled={isFree || isExist}
                unit="amount"
              />
            </InputModifyManageBox>
            <S.Divider />
            {!isFree && (
              <>
                <InputAccountWrapper>
                  <InputBank
                    isDisabled={isExist as boolean}
                    bankOpen={bankOpen}
                    onClick={() => handleBankOpen(setBankOpen)}
                  >
                    {bankInfo as string}
                  </InputBank>
                  <TextField
                    isDisabled={isExist}
                    name="accountNumber"
                    value={accountNumber}
                    onChange={(e) => handleChange(e, setGigInfo)}
                    filter={numericFilter}
                    placeholder="입금 받으실 계좌번호를 (-)제외 숫자만 입력해주세요."
                    disabled={isExist}
                  />
                  <TextField
                    isDisabled={isExist}
                    name="accountHolder"
                    value={accountHolder}
                    onChange={(e) => handleChange(e, setGigInfo)}
                    placeholder="예금주명을 입력해주세요."
                    disabled={isExist}
                  />
                </InputAccountWrapper>
                <S.Divider />
              </>
            )}
            <BankBottomSheet
              value={bankInfo as string}
              onBankClick={(value) =>
                handleBankClick(
                  value,
                  setGigInfo,
                  setBankInfo as Dispatch<SetStateAction<string>>,
                  setBankOpen
                )
              }
              isOpen={bankOpen}
              onOutClick={() => handleBankOpen(setBankOpen)}
            />
            <InputModifyManageBox isDisabled={false} title="대표자 연락처">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceContact"
                value={performanceContact}
                filter={phoneNumberFilter}
                onChange={(e) => handleChange(e, setGigInfo)}
                placeholder="문의 가능한 대표 번호를 숫자만 입력해주세요."
              />
            </InputModifyManageBox>
          </S.ModifyManageContainer>
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
              onClick={handleModifyManageStep}
              disabled={!isAllFieldsFilled(gigInfo as DataProps, isFree) || !isChecked}
            >
              다음
            </Button>
          </S.FooterContainer>
        </>
      );
    }

    if (ModifyManageStep === 2) {
      return (
        <ModifyManageMaker
          castList={castList as Cast[]}
          staffList={staffList as Staff[]}
          handleModifyManageStep={handleModifyManageStep}
          updateGigInfo={updateGigInfo}
        />
      );
    }
    if (ModifyManageStep === 3) {
      return (
        <>
          <ShowInfo
            posterImage={posterImage as string}
            title={performanceTitle as string}
            price={ticketPrice as number}
            venue={performanceVenue as string}
            period={performancePeriod as string}
            runningTime={runningTime as number}
            genre={genre as "BAND" | "DANCE" | "PLAY" | "ETC"}
            // 타임존 안맞아서 지금 날짜 안맞는데 로컬 타임존으로 보이게 설정하면 기간 잘 맞아요!
            scheduleList={
              scheduleList?.map((schedule, index) => ({
                scheduleId: index + 1,
                performanceDate: schedule.performanceDate?.toString() || "",
                scheduleNumber: (index + 1).toString(),
              })) as SchelduleListType[]
            }
          />
          <Content
            description={performanceDescription as string}
            attentionNote={performanceAttentionNote as string}
            contact={performanceContact as string}
            teamName={performanceTeamName as string}
            castList={
              castList?.[0].castId === -1
                ? []
                : (castList?.map((cast, index) => ({
                    ...cast,
                    castId: index + 1,
                  })) as Cast[])
            }
            staffList={
              staffList?.[0].staffId === -1
                ? []
                : (staffList?.map((cast, index) => ({
                    ...cast,
                    staffId: index + 1,
                  })) as Staff[])
            }
          />
          <S.FooterContainer>
            <Button onClick={handleComplete}>완료하기</Button>
          </S.FooterContainer>
        </>
      );
    }
  }
  return <></>;
};

export default ModifyManage;
