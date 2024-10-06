import {
  useGetScheduleAvailable,
  usePerformanceDelete,
  usePerformanceEdit,
  usePostPerformance,
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

import { PresignedResponse } from "@apis/domains/files/api";
import { useGetPresignedUrl, usePutS3Upload } from "@apis/domains/files/queries";
import { deletePerformance } from "@apis/domains/performances/api";
import MetaTag from "@components/commons/meta/MetaTag";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useModal } from "@hooks";
import Content from "@pages/gig/components/content/Content";
import ShowInfo, { SchelduleListType } from "@pages/gig/components/showInfo/ShowInfo";
import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import { numericFilter, phoneNumberFilter, priceFilter } from "@utils/useInputFilter";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenreSelect from "./components/GenreSelect";
import InputModifyManageBox from "./components/InputModifyManage";
import ModifyDetailImage from "./components/ModifyDetailImage";
import PosterThumbnail from "./components/PosterThumbnail";
import StepperModifyManageBox from "./components/StepperModifyManageBox";
import TimePickerModifyManageBox from "./components/TimePickerModifyManageBox";
import { GENRE_LIST } from "./constants/genreList";
import ModifyManageMaker from "./ModifyMaker";
import * as S from "./ModifyManage.styled";
import {
  BANK_TYPE,
  Cast,
  DataProps,
  PerformanceImageModifyRequest,
  Schedule,
  Staff,
} from "./typings/gigInfo";
import { handleImagesUpload, isAllFieldsFilled } from "./utils/handleEvent";

const SCHEDULE_NUMBER = {
  1: "FIRST",
  2: "SECOND",
  3: "THIRD",
  4: "FOURTH",
  5: "FIFTH",
  6: "SIXTH",
  7: "SEVENTH",
  8: "EIGHTH",
  9: "NINTH",
  10: "TENTH",
};

// Reducer로 상태 관리 통합
export type State = {
  performanceTitle: string;
  genre: SHOW_TYPE_KEY;
  runningTime: number | null;
  performanceDescription: string;
  performanceAttentionNote: string;
  bankName: BANK_TYPE;
  accountHolder: string;
  accountNumber: string;
  posterImage: string;
  performanceTeamName: string;
  performanceVenue: string;
  performancePeriod: string;
  performanceContact: string;
  ticketPrice: number | null;
  totalScheduleCount: number;
  scheduleModifyRequests: Schedule[];
  castModifyRequests: Cast[];
  staffModifyRequests: Staff[];
  performanceImageModifyRequests: PerformanceImageModifyRequest[];
  //타입 하나 덜 있어서, 요청 자체가 500에러 뱉어냄.
  //모든 곳에서 performanceImageModifyRequests 가 적용되도록 변경해야함
};

type ModifyState = {
  modifyManageStep: number;
  isBookerExist: boolean | undefined;
  isFree: boolean;
  isChecked: boolean;
  bankOpen: boolean;
  initScheduleListCount: number;
};

type Action =
  | { type: "SET_DATA"; payload: Partial<State> }
  | { type: "SET_FIELD"; field: keyof State; value: State[keyof State] }
  | { type: "SET_SCHEDULE_COUNT"; payload: number };

const initialState: State = {
  performanceTitle: "",
  genre: "ETC",
  runningTime: null,
  performanceDescription: "",
  performanceAttentionNote: "",
  bankName: "NONE",
  accountHolder: "",
  accountNumber: "",
  posterImage: "",
  performanceTeamName: "",
  performanceVenue: "",
  performancePeriod: "",
  performanceContact: "",
  ticketPrice: null,
  totalScheduleCount: 1,
  scheduleModifyRequests: [],
  castModifyRequests: [],
  staffModifyRequests: [],
  performanceImageModifyRequests: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, ...action.payload };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_SCHEDULE_COUNT":
      return { ...state, totalScheduleCount: action.payload };
    default:
      throw new Error("Unknown action type! Please Check again");
  }
};

const ModifyManage = () => {
  const { performanceId } = useParams();
  const navigate = useNavigate();
  const { openConfirm, closeConfirm, openAlert, closeAlert } = useModal();
  const { setHeader } = useHeader();

  const { data, isLoading, isSuccess } = usePerformanceEdit(Number(performanceId));
  const { mutateAsync: updatePerformance } = useUpdatePerformance();
  const { mutate, mutateAsync } = usePerformanceDelete(); // wf: 가독성을 위해 위랑 이름 맞춰주는게 좋을 듯

  //presignedUrl을 받아오기 위한 배열
  const [castImages, setCastImages] = useState<string[]>([]);
  const [staffImages, setStaffImages] = useState<string[]>([]);
  const [performanceImages, setPerformanceImages] = useState<string[]>([]);

  const [dataState, dispatch] = useReducer(reducer, initialState);
  const [modifyState, setModifyState] = useState<ModifyState>({
    modifyManageStep: 1,
    isBookerExist: undefined,
    isFree: false,
    isChecked: true,
    bankOpen: false,
    initScheduleListCount: 1,
  });

  //const { mutate: scheduleMutate, mutateAsync: hi } = useGetScheduleAvailable(3, 10);
  //회차 수 변경 시, 회차별 시간대도 반영
  useEffect(() => {
    //array-like
    const updatedScheduleList = Array.from({ length: dataState.totalScheduleCount }, (_, index) => {
      const existingSchedule = dataState.scheduleModifyRequests[index];
      const totalTicketCount = dataState.scheduleModifyRequests[0]?.totalTicketCount || null;

      const scheduleNumber = SCHEDULE_NUMBER[index + 1];
      return { ...existingSchedule, totalTicketCount, scheduleNumber };
    });
    dispatch({ type: "SET_FIELD", field: "scheduleModifyRequests", value: updatedScheduleList });
  }, [dataState.totalScheduleCount]);

  useEffect(() => {
    if (data && isSuccess) {
      dispatch({
        type: "SET_DATA",
        payload: {
          performanceTitle: data.performanceTitle,
          genre: data.genre,
          runningTime: data.runningTime,
          performanceDescription: data.performanceDescription,
          performanceAttentionNote: data.performanceAttentionNote,
          accountNumber: data.accountNumber,
          posterImage: data.posterImage,
          performanceTeamName: data.performanceTeamName,
          performanceVenue: data.performanceVenue,
          performancePeriod: data.performancePeriod,
          performanceContact: data.performanceContact,
          ticketPrice: data.ticketPrice,
          totalScheduleCount: data.totalScheduleCount,
          scheduleModifyRequests: data.scheduleList.map((item) => ({
            scheduleId: item.scheduleId ?? -1, //조회로 받아오니까 -1이 될 일이 없음.
            performanceDate: item.performanceDate ?? "",
            totalTicketCount: item.totalTicketCount ?? 0,
            dueDate: item.dueDate ?? 0,
            scheduleNumber: item.scheduleNumber ?? "FIRST",
          })),
          castModifyRequests: data.castList?.length
            ? data.castList.map((item) => ({
                castId: item.castId ?? -1,
                castName: item.castName ?? "",
                castRole: item.castRole ?? "",
                castPhoto: item.castPhoto ?? "",
              }))
            : [{ castId: -1, castName: "", castRole: "", castPhoto: "" }],
          staffModifyRequests: data.staffList?.length
            ? data.staffList.map((item) => ({
                staffId: item.staffId ?? -1,
                staffName: item.staffName ?? "",
                staffRole: item.staffRole ?? "",
                staffPhoto: item.staffPhoto ?? "",
              }))
            : [{ staffId: -1, staffName: "", staffRole: "", staffPhoto: "" }],
          bankName: data.bankName,
          accountHolder: data.accountHolder,
          performanceImageModifyRequests: data.performanceImageList.length
            ? data.performanceImageList.map((item) => ({
                performanceImageId: item.imageId ?? -1,
                performanceImage: item.imageUrl ?? "",
              }))
            : [{ performanceImageId: -1, performanceImage: "" }],
        },
      });

      setModifyState((prevState) => ({
        ...prevState,
        isBookerExist: data.isBookerExist,
        isFree: data.ticketPrice === 0,
        initScheduleListCount: data.totalScheduleCount,
      }));
    }
  }, [data]);

  useEffect(() => {
    const pageTitle =
      modifyState.modifyManageStep === 1
        ? "공연 수정하기"
        : modifyState.modifyManageStep === 2
          ? "공연 수정하기"
          : "미리보기";
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE_SUB_TEXT,
      title: pageTitle,
      subText: "삭제",
      leftOnClick: handleLeftBtn,
      rightOnClick: handleRightBtn,
    });
  }, [modifyState.modifyManageStep, modifyState.isBookerExist]);

  //presignedUrl을 받아오기 위한 리스트 세팅
  useEffect(() => {
    setCastImages(
      dataState.castModifyRequests.map((_, index) => `cast-${index + 1}-${new Date().getTime()}`)
    );
    setStaffImages(
      dataState.staffModifyRequests.map((_, index) => `staff-${index + 1}-${new Date().getTime()}`)
    );
    setPerformanceImages(
      dataState.performanceImageModifyRequests.map(
        (_: PerformanceImageModifyRequest, index: number) =>
          `performance-${index + 1}-${new Date().getTime()}`
      )
    );
  }, [
    dataState.castModifyRequests.length,
    dataState.staffModifyRequests.length,
    dataState.performanceImageModifyRequests.length,
  ]);
  const handleInputChange = (field: keyof State, value: State[keyof State]) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handlemodifyManageStep = () => {
    setModifyState((prev) => ({ ...prev, modifyManageStep: prev.modifyManageStep + 1 }));
  };

  const handleModifyState = (field: keyof ModifyState, value: ModifyState[keyof ModifyState]) => {
    setModifyState((prev) => ({ ...prev, [field]: value })); //브래킷 표기법 필수
  };

  const updateGigInfo = (newInfo: Partial<State>) => {
    dispatch({ type: "SET_DATA", payload: { ...newInfo } });
  };

  //presigned를 get하기 위한 form
  const getPresignedParams = {
    posterImage: `poster-${new Date().getTime()}`,
    castImages,
    staffImages,
    performanceImages,
  };

  const { data: S3data, refetch } = useGetPresignedUrl(getPresignedParams);
  const { mutate: putS3 } = usePutS3Upload();
  const { mutateAsync: postPerformance, isPending } = usePostPerformance();

  //비즈니스 로직 분리 - 공연 수정하기 PUT 요청
  const handleComplete = async () => {
    const { data, isSuccess } = await refetch();
    let posterUrls: string[];
    let castUrls: string[];
    let staffUrls: string[];
    let performanceUrls: string[];

    if (isPending) {
      return;
    } else if (isSuccess) {
      const extractUrls = (data: PresignedResponse) => {
        posterUrls = Object.values(data.poster).map((url) => url.split("?")[0]);
        castUrls = Object.values(data.cast).map((url) => url.split("?")[0]);
        staffUrls = Object.values(data.staff).map((url) => url.split("?")[0]);
        performanceUrls = Object.values(data.performance).map((url) => url.split("?")[0]);

        return [...posterUrls, ...castUrls, ...staffUrls, ...performanceUrls];
      };

      const S3Urls = extractUrls(data);

      const files = [
        dataState.posterImage,
        ...dataState.castModifyRequests.map((cast) => cast.castPhoto),
        ...dataState.staffModifyRequests.map((staff) => staff.staffPhoto),
        ...dataState.performanceImageModifyRequests.map((obj) => obj.performanceImage),
      ];

      try {
        const res = await Promise.all(
          S3Urls.map(async (url, index) => {
            const file = files[index];

            const response = await fetch(file);
            const blob = await response.blob();
            const newFile = new File([blob], `fileName-${new Date()}`, { type: blob.type });

            return putS3({ url, file: newFile });
          })
        );
      } catch (err) {}
    }

    const filteredCastModifyRequests = dataState.castModifyRequests.filter(
      (cast) => cast.castName || cast.castRole || cast.castPhoto
    );
    const filteredstaffModifyRequests = dataState.staffModifyRequests.filter(
      (staff) => staff.staffName || staff.staffRole || staff.staffPhoto
    );

    try {
      const res = await updatePerformance({
        performanceId: Number(performanceId),
        ...dataState,
        posterImage: posterUrls[0],
        castModifyRequests: dataState.castModifyRequests.map((cast, index) => {
          const modifiedCast = {
            ...cast,
            castPhoto: castUrls[index] || cast.castPhoto,
          };
          if (modifiedCast.castId === -1) {
            delete modifiedCast.castId; // castId가 -1인 경우 castId를 삭제(새롭게 추가된 경우에는 id 안보내야 함)
          }
          return modifiedCast;
        }),
        staffModifyRequests: dataState.staffModifyRequests.map((staff, index) => ({
          ...staff,
          staffPhoto: staffUrls[index] || staff.staffPhoto,
        })),
        scheduleModifyRequests: dataState.scheduleModifyRequests.map((schedule) => {
          const date = dayjs(schedule.performanceDate).toDate();
          const offset = date.getTimezoneOffset() * 60000; //ms 단위로 변환
          const dateOffset = new Date(date.getTime() - offset);
          return {
            ...schedule,
            performanceDate: dateOffset.toISOString(),
          };
        }),
        performanceImageModifyRequests: dataState.performanceImageModifyRequests.map(
          (image, index) => ({
            performanceImage: performanceUrls[index] || image.performanceImage,
          })
        ),
      });

      openAlert({
        title: "공연 수정이 완료됐어요.",
        subTitle: "변경된 사항(시간, 장소 등)은 예매자에게\n 개별적으로 반드시 연락해주세요.",
        okText: "네, 알겠어요",
        okCallback: () => {
          navigate("/gig-manage");
        },
      });
    } catch (err) {
      openAlert({
        title: "공연 수정에 실패했습니다.",
        subTitle: `${err.response.message ? err.response.message : "다시 시도해주세요."}`,
        okText: "확인",
        okCallback: closeAlert,
      });
    }
  };

  // 약관 동의
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModifyState((prevState) => ({ ...prevState, isChecked: !prevState.isChecked }));
  };
  // 티켓 가격이 무료일 때 가격을 0으로 설정하고 수정 불가능하게 함
  useEffect(() => {
    if (modifyState.isFree) {
      dispatch({
        type: "SET_DATA",
        payload: {
          ticketPrice: 0,
          accountNumber: "",
          bankName: "NONE",
        },
      });
    } else {
      //캐싱될 경우 값이 제대로 안옴 -> 주석 처리 하니 해결 (todo: 리팩토링)
      //dispatch({ type: "SET_FIELD", field: "ticketPrice", value: dataState.ticketPrice });
    }
  }, [modifyState.isFree]);

  // 티켓 가격을 0으로 작성하면 자동으로 무료 공연 체크
  useEffect(() => {
    if (dataState.ticketPrice === 0) {
      setModifyState((prevState) => ({ ...prevState, isFree: true }));
    } else {
      setModifyState((prevState) => ({ ...prevState, isFree: false }));
    }
  }, [dataState.ticketPrice]);

  const handleLeftBtn = () => {
    if (modifyState.modifyManageStep === 1) {
      openConfirm({
        title: "수정을 취소할까요?",
        subTitle: "페이지를 나갈 경우, 내용이 저장되지 않아요.",
        okText: "취소할게요",
        okCallback: () => {
          navigate("/gig-manage");
        },
        noText: "아니요",
        noCallback: () => {
          setModifyState((prev) => ({ ...prev, modifyManageStep: 1 }));
        },
      });
    } else {
      setModifyState((prev) => ({ ...prev, modifyManageStep: prev.modifyManageStep - 1 }));
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let numericValue = parseInt(value.replace(/,/g, ""), 10);

    if (isNaN(numericValue)) {
      numericValue = null;
    }

    dispatch({ type: "SET_FIELD", field: "ticketPrice", value: numericValue });
  };

  //공연 삭제 DELETE API 요청
  const handleDeletePerformance = async (_performanceId: number) => {
    try {
      await deletePerformance(_performanceId);
      openAlert({
        title: "공연이 삭제 되었습니다.",
        okText: "확인했어요",
        okCallback: () => navigate("/gig-manage"),
      });
    } catch (err) {
      openAlert({
        title: "에러",
        okText: "확인했어요",
        okCallback: () => navigate("/gig-manage"),
      });
    }
  };

  //공연 삭제 버튼
  const handleRightBtn = () => {
    if (modifyState.isBookerExist) {
      openAlert({
        title: "공연 삭제가 불가해요.",
        subTitle: "예매자가 1명 이상 있을 경우, 삭제할 수 없어요.",
        okText: "확인했어요",
        okCallback: closeAlert,
      });
    } else {
      openConfirm({
        title: "공연을 삭제하시겠어요?",
        subTitle: "삭제할 경우, 작성했던 내용을 되돌릴 수 없어요.",
        okText: "삭제할게요",
        okCallback: async () => {
          await handleDeletePerformance(Number(performanceId));
          return;
        },
        noText: "아니요",
        noCallback: () => {
          closeConfirm();
        },
      });
    }
  };

  const isExpired = (performanceDate: Dayjs | null | string): boolean => {
    const currentDate = new Date();
    const performance = new Date(performanceDate as string);

    // 현재 날짜가 performanceDate 이후인지 확인
    return currentDate > performance;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    if (modifyState.modifyManageStep === 1) {
      return (
        <>
          <MetaTag title="공연 수정" />
          <S.ModifyManageContainer>
            <PosterThumbnail
              value={dataState.posterImage}
              // onImageUpload={(url) => handleImageUpload(url, setGigInfo)}
              onImageUpload={() => console.log("")}
            />
            <S.Divider />
            <GenreSelect
              title="공연 장르"
              genres={GENRE_LIST}
              selectedGenre={dataState.genre as string}
              onGenreSelect={(selectedGenre) => handleInputChange("genre", selectedGenre)}
              marginBottom={2.4}
            />
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="공연명">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceTitle"
                value={dataState.performanceTitle}
                onChange={(e) => handleInputChange("performanceTitle", e.target.value)}
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
                value={dataState.performanceTeamName}
                onChange={(e) => handleInputChange("performanceTeamName", e.target.value)}
                placeholder="주최하는 공연진(단체)의 이름을 입력해주세요."
                maxLength={10}
                cap={true}
              />
            </InputModifyManageBox>
            <S.Divider />
            <ModifyDetailImage
              value={dataState.performanceImageModifyRequests}
              onImagesUpload={(performanceImage) =>
                handleImagesUpload(performanceImage, updateGigInfo)
              }
            />
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="공연 소개">
              <TextArea
                name="performanceDescription"
                value={dataState.performanceDescription}
                onChange={(e) => handleInputChange("performanceDescription", e.target.value)}
                placeholder="공연을 예매할 예매자들에게 공연을 소개해주세요."
                maxLength={500}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="러닝 타임">
              <TextField
                isDisabled={false}
                type="input"
                name="runningTime"
                value={dataState.runningTime ?? ""}
                onChange={(e) => handleInputChange("runningTime", parseInt(e.target.value, 10))}
                filter={numericFilter}
                unit="time"
                placeholder="공연의 러닝 타임을 분 단위로 입력해주세요."
                inputMode="numeric"
              />
            </InputModifyManageBox>
            <S.Divider />
            <StepperModifyManageBox title="회차 수" description="최대 10회차">
              <Stepper
                max={10}
                round={dataState.totalScheduleCount as number}
                disabled={false}
                onMinusClick={() => {
                  //처음 가져온 데이터의 길이랑 같다면 마이너스는 아무 동작 x
                  if (modifyState.initScheduleListCount === dataState.totalScheduleCount) {
                    return;
                  }
                  dispatch({
                    type: "SET_SCHEDULE_COUNT",
                    payload: dataState.totalScheduleCount - 1,
                  });
                }}
                onPlusClick={() =>
                  dispatch({
                    type: "SET_SCHEDULE_COUNT",
                    payload: dataState.totalScheduleCount + 1,
                  })
                }
              />
            </StepperModifyManageBox>
            <S.Divider />
            <TimePickerModifyManageBox title="회차별 시간대">
              {dataState.scheduleModifyRequests?.map((schedule, index) => {
                return (
                  <div key={index}>
                    <S.InputDescription>{index + 1}회차</S.InputDescription>
                    <Spacing marginBottom={"1"} />
                    <TimePicker
                      value={dayjs(schedule.performanceDate)}
                      disabled={isExpired(schedule.performanceDate)}
                      onChangeValue={(date) => {
                        const updatedSchedules = [...dataState.scheduleModifyRequests];
                        updatedSchedules[index].performanceDate = date;
                        handleInputChange("scheduleModifyRequests", updatedSchedules);
                      }}
                    />
                  </div>
                );
              })}
            </TimePickerModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="공연 장소">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceVenue"
                value={dataState.performanceVenue}
                onChange={(e) => handleInputChange("performanceVenue", e.target.value)}
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
                value={dataState.scheduleModifyRequests?.[0]?.totalTicketCount ?? ""}
                onChange={(e) => {
                  const updatedSchedules = [...dataState.scheduleModifyRequests];
                  updatedSchedules[0].totalTicketCount = parseInt(e.target.value, 10);
                  handleInputChange("scheduleModifyRequests", updatedSchedules);
                }}
                placeholder="판매할 티켓의 매 수를 입력해주세요."
                filter={numericFilter}
                unit="ticket"
                inputMode="numeric"
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="유의사항">
              <TextArea
                name="performanceAttentionNote"
                value={dataState.performanceAttentionNote}
                onChange={(e) => handleInputChange("performanceAttentionNote", e.target.value)}
                placeholder="입장 안내, 공연 중 인터미션, 공연장 반입금지 물품, 촬영 가능 여부, 주차 안내 등 예매자들이 꼭 알고 있어야할 유의사항을 입력해주세요."
                maxLength={250}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox
              isDisabled={modifyState.isBookerExist as boolean}
              title="티켓 가격"
              description="*예매자 존재 시, 티켓 가격은 수정불가합니다."
              isFree={modifyState.isFree}
              onFreeClick={() => handleModifyState("isFree", !modifyState.isFree)}
            >
              <TextField
                isDisabled={modifyState.isBookerExist}
                type="input"
                name="ticketPrice"
                value={
                  dataState.ticketPrice !== null
                    ? priceFilter(dataState.ticketPrice.toString())
                    : ""
                }
                onChange={handlePriceChange}
                placeholder="가격을 입력해주세요."
                filter={priceFilter}
                disabled={modifyState.isFree || modifyState.isBookerExist}
                unit="amount"
                inputMode="numeric"
              />
            </InputModifyManageBox>
            <S.Divider />
            {!modifyState.isFree && (
              <>
                <InputAccountWrapper>
                  <InputBank
                    isDisabled={modifyState.isBookerExist as boolean}
                    bankOpen={modifyState.bankOpen}
                    onClick={() => handleModifyState("bankOpen", true)}
                  >
                    {/* {bankInfo as string} */}
                    {dataState.bankName}
                  </InputBank>
                  <TextField
                    isDisabled={modifyState.isBookerExist}
                    name="accountNumber"
                    value={dataState.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    filter={numericFilter}
                    placeholder="입금 받으실 계좌번호를 (-)제외 숫자만 입력해주세요."
                    disabled={modifyState.isBookerExist}
                    inputMode="numeric"
                  />
                  <TextField
                    isDisabled={modifyState.isBookerExist}
                    name="accountHolder"
                    value={dataState.accountHolder}
                    onChange={(e) => handleInputChange("accountHolder", e.target.value)}
                    placeholder="예금주명을 입력해주세요."
                    disabled={modifyState.isBookerExist}
                  />
                </InputAccountWrapper>
                <S.Divider />
              </>
            )}
            <BankBottomSheet
              // value={bankInfo as string}
              value={dataState.bankName}
              onBankClick={(value) => {
                handleInputChange("bankName", value);
                handleModifyState("bankOpen", false);
              }}
              isOpen={modifyState.bankOpen}
              onOutClick={() => handleModifyState("bankOpen", false)}
            />
            <InputModifyManageBox isDisabled={false} title="대표자 연락처">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceContact"
                value={dataState.performanceContact}
                filter={phoneNumberFilter}
                onChange={(e) => handleInputChange("performanceContact", e.target.value)}
                placeholder="문의 가능한 대표 번호를 숫자만 입력해주세요."
                inputMode="tel"
              />
            </InputModifyManageBox>
          </S.ModifyManageContainer>
          <S.FooterContainer>
            <S.FooterDivider />
            <S.CheckboxContainer>
              <S.CheckboxLabel>
                <S.Checkbox
                  type="checkbox"
                  checked={modifyState.isChecked}
                  onChange={handleCheckboxChange}
                ></S.Checkbox>
                한 명 이상의 예매자가 있을 경우, 공연 삭제가 불가해요.
                {modifyState.isChecked ? <IconChecked width={18} /> : <S.NonCheck />}
              </S.CheckboxLabel>
            </S.CheckboxContainer>
            <Button
              onClick={handlemodifyManageStep}
              disabled={
                !isAllFieldsFilled(dataState as DataProps, modifyState.isFree) ||
                !modifyState.isChecked
              }
            >
              다음
            </Button>
          </S.FooterContainer>
        </>
      );
    }

    if (modifyState.modifyManageStep === 2) {
      return (
        <ModifyManageMaker
          castModifyRequests={dataState.castModifyRequests as Cast[]}
          staffModifyRequests={dataState.staffModifyRequests as Staff[]}
          handleModifyManageStep={handlemodifyManageStep}
          updateGigInfo={updateGigInfo}
        />
      );
    }

    if (modifyState.modifyManageStep === 3) {
      return (
        <>
          <MetaTag title="공연 수정" />
          <S.PreviewBanner>예매자에게 보여질 화면 예시입니다. 확인해주세요.</S.PreviewBanner>

          <ShowInfo
            posterImage={dataState.posterImage as string}
            title={dataState.performanceTitle as string}
            price={dataState.ticketPrice as number}
            venue={dataState.performanceVenue as string}
            period={dataState.performancePeriod as string}
            runningTime={dataState.runningTime as number}
            genre={dataState.genre as "BAND" | "DANCE" | "PLAY" | "ETC"}
            // 타임존 안맞아서 지금 날짜 안맞는데 로컬 타임존으로 보이게 설정하면 기간 잘 맞아요!
            scheduleList={
              dataState.scheduleModifyRequests?.map((schedule, index) => ({
                scheduleId: index + 1,
                performanceDate: schedule.performanceDate?.toString() || "",
                scheduleNumber: (index + 1).toString(),
              })) as SchelduleListType[]
            }
          />
          <Content
            description={dataState.performanceDescription as string}
            attentionNote={dataState.performanceAttentionNote as string}
            contact={dataState.performanceContact as string}
            teamName={dataState.performanceTeamName as string}
            castList={
              dataState.castModifyRequests?.[0]?.castId === -1
                ? []
                : (dataState.castModifyRequests?.map((cast, index) => ({
                    ...cast,
                    castId: index + 1,
                  })) as Cast[])
            }
            staffList={
              dataState.staffModifyRequests?.[0]?.staffId === -1
                ? []
                : (dataState.staffModifyRequests?.map((cast, index) => ({
                    ...cast,
                    staffId: index + 1,
                  })) as Staff[])
            }
            performanceImageList={dataState.performanceImageModifyRequests}
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
