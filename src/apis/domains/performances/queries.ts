import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import {
  BANK_TYPE,
  Cast,
  PerformanceImageModifyRequest,
  Staff,
} from "@pages/modifyManage/typings/gigInfo";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { HOME_QUERY_KEY } from "../home/queries";
import {
  deletePerformance,
  getBookingPerformanceDetail,
  getMakerPerformance,
  getPerformanceDetail,
  getPerformanceEdit,
  getScheduleAvailable,
  postPerformance,
  updatePerformance,
} from "./api";

export const PERFORMANCE_QUERY_KEY = {
  DETAIL: "detail",
  BOOKING_DETAIL: "bookingDetail",
};

// 회원이 등록한 공연 목록을 조회 API (GET) 를 위한 쿼리 작성
export const useMakerPerformance = () => {
  return useQuery({
    queryKey: [PERFORMANCE_QUERY_KEY.DETAIL],
    queryFn: getMakerPerformance,
    // staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 공연 수정 페이지 정보 조회 API (GET) 를 위한 쿼리 작성
export const usePerformanceEdit = (performanceId: number) => {
  return useQuery({
    queryKey: [PERFORMANCE_QUERY_KEY.BOOKING_DETAIL, performanceId],
    queryFn: () => getPerformanceEdit(performanceId),
    // staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 등록한 공연 삭제
export const usePerformanceDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_performanceId: number) => deletePerformance(_performanceId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [PERFORMANCE_QUERY_KEY.DETAIL] });
      queryClient.invalidateQueries({ queryKey: [PERFORMANCE_QUERY_KEY.BOOKING_DETAIL] });
      queryClient.refetchQueries({ queryKey: [PERFORMANCE_QUERY_KEY.DETAIL], exact: true });
      queryClient.refetchQueries({
        queryKey: [PERFORMANCE_QUERY_KEY.BOOKING_DETAIL],
        exact: true,
      });
    },
  });
};

// 공연 상세정보
export const useGetPerformanceDetail = (performanceId: number) => {
  return useQuery({
    queryKey: [PERFORMANCE_QUERY_KEY.DETAIL, performanceId],
    queryFn: () => getPerformanceDetail(performanceId),
    // staleTime: 1000 * 60 * 60,

    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 예매하기 내 공연 정보 조회
export const useGetBookingPerformanceDetail = (performanceId: number) => {
  return useQuery({
    queryKey: [PERFORMANCE_QUERY_KEY.BOOKING_DETAIL, performanceId],
    queryFn: () => getBookingPerformanceDetail(performanceId),
    // staleTime: 1000 * 60 * 60,

    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 얜 뭘까?
export const useGetScheduleAvailable = (scheduleId: number, purchaseTicketCount: number) => {
  return useQuery({
    queryKey: [PERFORMANCE_QUERY_KEY.DETAIL, scheduleId],
    queryFn: () => getScheduleAvailable(scheduleId, purchaseTicketCount),
    enabled: false,
  });
};

interface PerformanceFormData {
  posterImage: string;
  castList: {
    castPhoto: string;
    castName: string;
    castRole: string;
  }[];
  staffList: {
    staffPhoto: string;
    staffName: string;
    staffRole: string;
  }[];
  performanceTitle: string;
  genre: SHOW_TYPE_KEY;
  runningTime: number | null;
  performanceDescription: string;
  performanceAttentionNote: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  performanceTeamName: string;
  performanceVenue: string;
  performanceContact: string;
  performancePeriod: string;
  ticketPrice: number | null;
  totalScheduleCount: number;
  scheduleList: {
    performanceDate: Dayjs | Date | null | string;
    totalTicketCount: number | null;
    scheduleNumber: string;
  }[];
}

interface PerformanceResponse {
  status: number;
  data: {
    performanceId: number;
  };
}

const isPerformanceResponse = (res: any): res is PerformanceResponse => {
  return res && typeof res === "object" && "status" in res && "data" in res;
};

// 공연 등록 API
export const usePostPerformance = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: PerformanceFormData) => postPerformance(formData),
    onSuccess: async (res) => {
      queryClient.invalidateQueries({
        queryKey: [HOME_QUERY_KEY.LIST, PERFORMANCE_QUERY_KEY.DETAIL],
      });
      queryClient.refetchQueries({ queryKey: [HOME_QUERY_KEY.LIST], exact: true });
      queryClient.refetchQueries({
        queryKey: [PERFORMANCE_QUERY_KEY.DETAIL],
        exact: true,
      });

      if (isPerformanceResponse(res) && res.status === 201) {
        // 프리렌더 작업 수행
        const prerenderResponse = await fetch(`${import.meta.env.VITE_CLIENT_URL}/api/prerender`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ performanceId: res.data.performanceId }),
        });

        console.log("prerenderResponse is: ", prerenderResponse);

        if (prerenderResponse.ok) {
          console.log("Prerender successful");
        } else {
          console.error("Prerender failed");
        }

        // 등록 완료 페이지로 이동
        navigate("/register-complete", {
          state: { performanceId: res.data.performanceId },
        });
      } else {
        console.error("Performance creation failed:", res);
      }
    },
  });
};

interface Schedule {
  scheduleId?: number;
  performanceDate: string | Dayjs;
  totalTicketCount?: number;
  scheduleNumber?: string;
}

// gigInfo 타입 정의 예제
export interface PerformanceUpdateFormData {
  performanceId: number;
  performanceTitle: string;
  genre: SHOW_TYPE_KEY;
  runningTime: number | null;
  performanceDescription: string;
  performanceAttentionNote: string;
  bankName: BANK_TYPE;
  accountNumber: string;
  accountHolder: string;
  posterImage: string;
  performanceTeamName: string;
  performanceVenue: string;
  performanceContact: string;
  performancePeriod: string;
  totalScheduleCount: number;
  ticketPrice?: number | null;
  scheduleModifyRequests: Schedule[];
  castModifyRequests: Cast[];
  staffModifyRequests: Staff[];
  performanceImageModifyRequests: PerformanceImageModifyRequest[];
}

export const useUpdatePerformance = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: PerformanceUpdateFormData) => updatePerformance(formData),
    onSuccess: (res) => {
      // TODO: useGetPerformanceDetail 키 수정

      queryClient.invalidateQueries({
        queryKey: [PERFORMANCE_QUERY_KEY.DETAIL],
      });

      queryClient.invalidateQueries({
        queryKey: [PERFORMANCE_QUERY_KEY.BOOKING_DETAIL, res.data.performanceId],
      });

      queryClient.refetchQueries({
        queryKey: [PERFORMANCE_QUERY_KEY.DETAIL],
        exact: true,
      });

      queryClient.refetchQueries({
        queryKey: [PERFORMANCE_QUERY_KEY.BOOKING_DETAIL, res.data.performanceId],
        exact: true,
      });
    },
  });
};
