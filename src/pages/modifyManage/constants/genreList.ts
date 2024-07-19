import { IconLargeBand, IconLargeDance, IconLargeEtc, IconLargeMusical } from "@assets/svgs";
import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import { ComponentType } from "react";
import { StyledIcon } from "../ModifyManage.styled";
import { GigInfo } from "../typings/gigInfo";

interface Genre {
  id: number;
  genre: SHOW_TYPE_KEY;
  genreKor: string;
  genreIcon: ComponentType;
}

export const GENRE_LIST = [
  {
    id: 1,
    genre: "PLAY" as SHOW_TYPE_KEY,
    genre_kr: "연극/뮤지컬",
    genreIcon: StyledIcon(IconLargeMusical),
  },
  { id: 2, genre: "BAND" as SHOW_TYPE_KEY, genre_kr: "밴드", genreIcon: StyledIcon(IconLargeBand) },
  {
    id: 3,
    genre: "DANCE" as SHOW_TYPE_KEY,
    genre_kr: "댄스",
    genreIcon: StyledIcon(IconLargeDance),
  },
  { id: 4, genre: "ETC" as SHOW_TYPE_KEY, genre_kr: "기타", genreIcon: StyledIcon(IconLargeEtc) },
];

export const GET_MODIFY_MANAGE_RESPONSE: GigInfo = {
  status: 200,
  message: "공연 정보가 성공적으로 조회되었습니다.",
  data: {
    userId: 2,
    accountHolder: "공준혁혁",
    performanceId: 1,
    performanceTitle: "공연 제목입니다",
    genre: "BAND",
    runningTime: 120,
    performanceDescription: "공연 소개입니다",
    performanceAttentionNote: "유의사항입니다",
    bankName: "KB_KOOKMIN",
    accountNumber: "924232-22-234232",
    posterImage: "포스터 이미지 URL입니다",
    performanceTeamName: "비트",
    performanceVenue: "우리집",
    performanceContact: "010-3234-2342",
    performancePeriod: "2023.12.28~2023.12.29",
    ticketPrice: 50000,
    totalScheduleCount: 2,
    isBookerExist: true,
    scheduleList: [
      {
        scheduleId: 1,
        performanceDate: "2024-12-28T19:30:00",
        totalTicketCount: 100,
        dueDate: 5, // 공연 날짜 - 현재 날짜
        scheduleNumber: "FIRST",
      },
      {
        scheduleId: 2,
        performanceDate: "2024-12-29T19:30:00",
        totalTicketCount: 100,
        dueDate: 6, // 공연 날짜 - 현재 날짜
        scheduleNumber: "SECOND",
      },
    ],
    castList: [
      {
        castId: 1,
        castName: "황혜린",
        castRole: "서버",
        castPhoto: "출연진 사진 URL",
      },
      {
        castId: 2,
        castName: "정도영",
        castRole: "웹",
        castPhoto: "출연진 사진 URL",
      },
    ],
    staffList: [
      {
        staffId: 1,
        staffName: "서지우",
        staffRole: "리드",
        staffPhoto: "스태프 사진 URL",
      },
      {
        staffId: 2,
        staffName: "양성재",
        staffRole: "피엠",
        staffPhoto: "스태프 사진 URL",
      },
    ],
  },
};
