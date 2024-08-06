import {
  usePerformanceDelete,
  usePerformanceEdit,
  useUpdatePerformance,
} from "@apis/domains/performances/queries";
import { IconChecked } from "@assets/svgs";
import {
  BankBottomSheet,
  Button,
  InputAccountWrapper,
  InputBank,
  Loading,
  Spacing,
  Stepper,
  TextArea,
  TextField,
  TimePicker,
} from "@components/commons";

import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useModal } from "@hooks";
import Content from "@pages/gig/components/content/Content";
import ShowInfo, { SchelduleListType } from "@pages/gig/components/showInfo/ShowInfo";
import { numericFilter, phoneNumberFilter, priceFilter } from "@utils/useInputFilter";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenreSelect from "./components/GenreSelect";
import InputModifyManageBox from "./components/InputModifyManage";
import PosterThumbnail from "./components/PosterThumbnail";
import StepperModifyManageBox from "./components/StepperModifyManageBox";
import TimePickerModifyManageBox from "./components/TimePickerModifyManageBox";
import { GENRE_LIST } from "./constants/genreList";
import * as S from "./ModifyManage.styled";
import { BANK_TYPE, Cast, DataProps, Schedule, Staff } from "./typings/gigInfo";
import { isAllFieldsFilled } from "./utils/handleEvent";
import MetaTag from "@components/commons/meta/MetaTag";

const ModifyManage = () => {
  const [ModifyManageStep, setModifyManageStep] = useState(1); // 등록 step 나누기
  const { openConfirm, closeConfirm, openAlert, closeAlert } = useModal();
  // gigInfo 초기화
  const { performanceId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isSuccess } = usePerformanceEdit(Number(performanceId));

  const [performanceTitle, setPerformanceTitle] = useState<string>("");
  const [genre, setGenre] = useState<"BAND" | "DANCE" | "PLAY" | "ETC" | string>("");
  const [runningTime, setRunningTime] = useState<number | null>(null);
  const [performanceDescription, setPerformanceDescription] = useState<string>("");
  const [performanceAttentionNote, setPerformanceAttentionNote] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [posterImage, setPosterImage] = useState<string>("");
  const [performanceTeamName, setPerformanceTeamName] = useState<string>("");
  const [performanceVenue, setPerformanceVenue] = useState<string>("");
  const [performancePeriod, setPerformancePeriod] = useState<string>("");
  const [performanceContact, setPerformanceContact] = useState<string>("");
  const [ticketPrice, setTicketPrice] = useState<number | undefined>(undefined);
  const [totalScheduleCount, setTotalScheduleCount] = useState<number>(1);
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
  const [castList, setCastList] = useState<Cast[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [bankName, setBankName] = useState<string>("");
  const [isBookerExist, setIsBookerExist] = useState<boolean | undefined>(undefined);
  const [accountHolder, setAccountHolder] = useState<string>("");
  const [isFree, setIsFree] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [bankOpen, setBankOpen] = useState<boolean>(false);

  const [isExist, setIsExist] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (data && isSuccess) {
      setPerformanceTitle(data.performanceTitle);
      setGenre(data.genre);
      setRunningTime(data.runningTime);
      setPerformanceDescription(data.performanceDescription);
      setPerformanceAttentionNote(data.performanceAttentionNote);
      setAccountNumber(data.accountNumber);
      setPosterImage(data.posterImage);
      setPerformanceTeamName(data.performanceTeamName);
      setPerformanceVenue(data.performanceVenue);
      setPerformancePeriod(data.performancePeriod);
      setPerformanceContact(data.performanceContact);
      setTicketPrice(data.ticketPrice);
      setTotalScheduleCount(data.totalScheduleCount);
      setScheduleList(
        data.scheduleList.map((item) => ({
          scheduleId: item.scheduleId ?? -1,
          performanceDate: item.performanceDate ?? "",
          totalTicketCount: item.totalTicketCount ?? 0,
          dueDate: item.dueDate ?? 0,
          scheduleNumber: item.scheduleNumber ?? "FIRST",
        }))
      );
      setCastList(
        data.castList && data.castList.length > 0
          ? data.castList.map((item) => ({
              castId: item.castId ?? -1,
              castName: item.castName ?? "",
              castRole: item.castRole ?? "",
              castPhoto: item.castPhoto ?? "",
            }))
          : [{ castId: -1, castName: "", castRole: "", castPhoto: "" }]
      );
      setStaffList(
        data.staffList && data.staffList.length > 0
          ? data.staffList.map((item) => ({
              staffId: item.staffId ?? -1,
              staffName: item.staffName ?? "",
              staffRole: item.staffRole ?? "",
              staffPhoto: item.staffPhoto ?? "",
            }))
          : [{ staffId: -1, staffName: "", staffRole: "", staffPhoto: "" }]
      );
      setBankName(data.bankName);
      setIsBookerExist(data.isBookerExist);
      setAccountHolder(data.accountHolder);
      setIsFree(data.ticketPrice === 0);
    }
  }, [data]);

  const { mutateAsync: updatePerformance } = useUpdatePerformance();

  //여기서 공연 수정하기 PUT 요청 보내야함
  const handleComplete = async () => {
    const filteredCastList = castList.filter(
      (cast) => cast.castName || cast.castRole || cast.castPhoto
    );
    const filteredStaffList = staffList.filter(
      (staff) => staff.staffName || staff.staffRole || staff.staffPhoto
    );

    const formData = {
      performanceId: Number(performanceId),
      performanceTitle,
      genre: genre as "BAND" | "DANCE" | "PLAY" | "ETC",
      runningTime,
      performanceDescription,
      performanceAttentionNote,
      accountNumber,
      posterImage,
      performanceTeamName,
      performanceVenue,
      performancePeriod,
      performanceContact,
      ticketPrice,
      totalScheduleCount,
      scheduleList,
      castList: filteredCastList,
      staffList: filteredStaffList,
      bankName: (!!bankName ? bankName : "NONE") as BANK_TYPE,
      isBookerExist,
      accountHolder,
    };

    try {
      const res = await updatePerformance(formData);

      if (res?.status === 200) {
        openAlert({
          title: "공연 수정이 완료됐어요.",
          subTitle: "변경된 사항(시간, 장소 등)은 예매자에게\n 개별적으로 반드시 연락해주세요.",
          okText: "네, 알겠어요",
          okCallback: () => {
            navigate("/gig-manage");
          },
        });
      }
    } catch (err) {
      openAlert({
        title: "공연 수정에 실패했습니다.",
        subTitle: "다시 시도해주세요.",
        okText: "확인",
        okCallback: closeAlert,
      });
    }
  };

  // 약관 동의
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    setIsExist(data?.isBookerExist);
  }, [data?.isBookerExist]);

  // useEffect(() => {
  //   setBankInfo(bankName);
  // }, [bankName]);

  // 티켓 가격이 무료일 때 가격을 0으로 설정하고 수정 불가능하게 함
  useEffect(() => {
    if (isFree) {
      setTicketPrice(0);
      setAccountNumber("");
      setBankName("");
    }
  }, [isFree]);

  // 티켓 가격을 0으로 작성하면 자동으로 무료 공연 체크
  useEffect(() => {
    if (ticketPrice === 0) {
      setIsFree(true);
    }
  }, [ticketPrice]);

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

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    let numericValue = parseInt(value.replace(/,/g, ""), 10);

    if (isNaN(numericValue)) {
      numericValue = undefined;
    }

    setTicketPrice(numericValue);
  };

  const { mutate, mutateAsync } = usePerformanceDelete();

  const handleDeletePerformance = async (_performanceId: number, isExisttt: boolean) => {
    //사용자가 한명 이상 있으면 안된다는 문구 띄움 - 동훈이가 수정 시 공연 정보 조회 API (GET)에 COUNT나 bookingList를 넘겨줄 듯
    console.log("isExisttt", isExisttt);

    if (isExisttt) {
      openAlert({
        title: "공연 삭제가 불가해요.",
        subTitle: "예매자가 1명 이상 있을 경우, 삭제할 수 없어요.",
        okText: "확인했어요",
        okCallback: closeAlert,
      });
    } else {
      //공연 삭제하는 로직 - performanceId 하나로 DELETE 요청 보내고,
      mutateAsync(Number(performanceId));
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
        handleDeletePerformance(Number(performanceId), isBookerExist as boolean); //예시로 박아둠
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

  if (data) {
    if (ModifyManageStep === 1) {
      return (
        <>
          <MetaTag title="공연 수정" />
          <S.ModifyManageContainer>
            <PosterThumbnail
              value={posterImage}
              // onImageUpload={(url) => handleImageUpload(url, setGigInfo)}
              onImageUpload={() => console.log("")}
            />
            <S.Divider />
            <GenreSelect
              title="공연 장르"
              genres={GENRE_LIST}
              selectedGenre={genre as string}
              onGenreSelect={(selectedGenre) => setGenre(selectedGenre)}
              marginBottom={2.4}
            />
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="공연명">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceTitle"
                value={performanceTitle}
                onChange={(e) => setPerformanceTitle(e.target.value)}
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
                onChange={(e) => setPerformanceTeamName(e.target.value)}
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
                onChange={(e) => setPerformanceDescription(e.target.value)}
                placeholder="공연을 예매할 예매자들에게 공연을 소개해주세요."
                maxLength={250}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="러닝 타임">
              <TextField
                isDisabled={false}
                type="input"
                name="runningTime"
                value={runningTime ?? ""}
                onChange={(e) => setRunningTime(parseInt(e.target.value, 10))}
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
                onMinusClick={() => setTotalScheduleCount((prev) => prev - 1)}
                onPlusClick={() => setTotalScheduleCount((prev) => prev + 1)}
              />
            </StepperModifyManageBox>
            <S.Divider />
            <TimePickerModifyManageBox title="회차별 시간대">
              {scheduleList?.map((schedule, index) => (
                <div key={index}>
                  <S.InputDescription>{index + 1}회차</S.InputDescription>
                  <Spacing marginBottom={"1"} />
                  <TimePicker
                    value={dayjs(schedule.performanceDate)}
                    disabled={true}
                    onChangeValue={(date) => {
                      const updatedSchedules = [...scheduleList];
                      updatedSchedules[index].performanceDate = date;
                      setScheduleList(updatedSchedules);
                    }}
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
                onChange={(e) => setPerformanceVenue(e.target.value)}
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
                value={scheduleList?.[0]?.totalTicketCount ?? ""}
                onChange={(e) => {
                  const updatedSchedules = [...scheduleList];
                  updatedSchedules[0].totalTicketCount = parseInt(e.target.value, 10);
                  setScheduleList(updatedSchedules);
                }}
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
                onChange={(e) => setPerformanceAttentionNote(e.target.value)}
                placeholder="입장 안내, 공연 중 인터미션, 공연장 반입금지 물품, 촬영 가능 여부, 주차 안내 등 예매자들이 꼭 알고 있어야할 유의사항을 입력해주세요."
                maxLength={250}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox
              isDisabled={isExist as boolean}
              title="티켓 가격"
              description="*티켓 가격은 수정불가합니다."
              isFree={isFree}
              onFreeClick={() => setIsFree(!isFree)}
            >
              <TextField
                isDisabled={isExist}
                type="input"
                name="ticketPrice"
                value={ticketPrice !== undefined ? priceFilter(ticketPrice.toString()) : ""}
                onChange={handlePriceChange}
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
                    onClick={() => setBankOpen(true)}
                  >
                    {/* {bankInfo as string} */}
                    {bankName}
                  </InputBank>
                  <TextField
                    isDisabled={isExist}
                    name="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    filter={numericFilter}
                    placeholder="입금 받으실 계좌번호를 (-)제외 숫자만 입력해주세요."
                    disabled={isExist}
                  />
                  <TextField
                    isDisabled={isExist}
                    name="accountHolder"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    placeholder="예금주명을 입력해주세요."
                    disabled={isExist}
                  />
                </InputAccountWrapper>
                <S.Divider />
              </>
            )}
            <BankBottomSheet
              // value={bankInfo as string}
              value={bankName}
              onBankClick={(value) => {
                setBankName(value);
                setBankOpen(false);
              }}
              isOpen={bankOpen}
              onOutClick={() => setBankOpen(false)}
            />
            <InputModifyManageBox isDisabled={false} title="대표자 연락처">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceContact"
                value={performanceContact}
                filter={phoneNumberFilter}
                onChange={(e) => setPerformanceContact(e.target.value)}
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
              disabled={!isAllFieldsFilled(data as DataProps, isFree) || !isChecked}
            >
              다음
            </Button>
          </S.FooterContainer>
        </>
      );
    }

    // if (ModifyManageStep === 2) {
    //   return (
    //     <ModifyManageMaker
    //       castList={castList as Cast[]}
    //       staffList={staffList as Staff[]}
    //       handleModifyManageStep={handleModifyManageStep}
    //       // updateGigInfo={updateGigInfo}
    //       updateGigInfo={() => console.log("")}
    //     />
    //   );
    // }

    if (ModifyManageStep === 2) {
      return (
        <>
          <MetaTag title="공연 수정" />
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
