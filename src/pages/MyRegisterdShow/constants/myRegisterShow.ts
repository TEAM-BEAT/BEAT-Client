export interface RegisteredObjProps {
  performanceId?: number;
  genre?: string;
  performanceTitle?: string;
  posterImage?: string;
  performancePeriod?: string;
}
//최대한 나중에 axios 응답 받아왔을 때의 형식을 유지하도록 작성.
export interface RegisteredResponseProps {
  data: RegisteredObjProps[];
}

//실제 응답 전, 예시 상수 응답
/*
export const MY_REGISTERED_SHOW: RegisteredResponseProps = {
  data: [
    {
      id: 1,
      title: "실리카겔 락앤롤",
      period: "2023.12.26-2023.12.30",
      genre: "밴드",
      image: exImg,
    },
    {
      id: 2,
      title: "실리카겔 락앤롤 어쩌고 밴드 공연",
      period: "2023.12.26-2023.12.30",
      genre: "밴드",
      image: exImg,
    },
    {
      id: 3,
      title: "실리카겔 락앤롤 어쩌고 밴드 공연",
      period: "2023.12.26-2023.12.30",
      genre: "밴드",
      image: exImg,
    },
    {
      id: 4,
      title: "실리카겔 락앤롤 어쩌고 밴드 공연",
      period: "2023.12.26-2023.12.30",
      genre: "밴드",
      image: exImg,
    },
  ],
};
*/
