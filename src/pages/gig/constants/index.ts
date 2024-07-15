export const SHOW_DETAIL_INFO = {
  performanceId: 1,
  performanceTitle: "비트밴드 정기공연",
  performancePeriod: "2023.12.31~2024.01.02",
  scheduleList: [
    {
      scheduleId: 1,
      performanceDate: "2024-07-07T12:34:56.789Z",
      scheduleNumber: 1,
    },
    {
      scheduleId: 2,
      performanceDate: "2024-07-08T12:34:56.789Z",
      scheduleNumber: 2,
    },
  ],
  ticketPrice: 5000,
  genre: "BAND",
  posterImage: "/src/pages/MyRegisterdShow/constants/silkagel.png",
  runningTime: 120,
  performanceVenue: "홍대상상마당",
  performanceDescription: "이 공연은 어떤 공연이다 어쩌구",
  performanceAttentionNote: "이런 점 유의바람!",
  performanceContact: "010-0000-0000",
  performanceTeamName: "비트밴드",
  castList: [
    {
      castId: 1,
      castName: "김비트",
      castRole: "보컬",
      castPhoto: "/src/pages/MyRegisterdShow/constants/silkagel.png",
    },
    {
      castId: 2,
      castName: "이비트",
      castRole: "건반",
      castPhoto: "/src/pages/gig/constants/jiwoo.png",
    },
  ],
  staffList: [
    {
      staffId: 1,
      staffName: "황혜린",
      staffRole: "서버",
      staffPhoto: "/src/pages/gig/constants/jiwoo.png",
    },
    {
      staffId: 2,
      staffName: "정도영",
      staffRole: "웹",
      staffPhoto: "/src/pages/MyRegisterdShow/constants/silkagel.png",
    },
  ],
};

export const SHOW_TYPE = {
  BAND: "밴드",
  DANCE: "댄스",
  PLAY: "연극/뮤지컬",
  ETC: "기타",
} as const;

export type ShowTypes = (typeof SHOW_TYPE)[keyof typeof SHOW_TYPE];

export const TAB_TYPE = {
  PERFORMANCE: "performance",
  MAKER: "maker",
} as const;

export type TabType = (typeof TAB_TYPE)[keyof typeof TAB_TYPE];
