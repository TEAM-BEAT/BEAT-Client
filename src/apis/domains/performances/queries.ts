import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  type PerformanceCreateResponse,
  type PerformanceModifyRequest,
  type PerformanceRequest,
} from "./api";
import axios from "axios";

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
    gcTime: 0,
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
    retry: 1,
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

type PerformanceResponse = PerformanceCreateResponse & {
  data: NonNullable<PerformanceCreateResponse["data"]>;
};

const isPerformanceResponse = (res: PerformanceCreateResponse): res is PerformanceResponse => {
  return typeof res === "object" && res !== null && res.data !== undefined;
};

// 공연 등록 API
export const usePostPerformance = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: PerformanceRequest) => postPerformance(formData),
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
        axios.post(import.meta.env.VITE_DEPLOY_HOOK_URL as string).catch((error) => {
          console.error("Deployment hook error:", error);
        });
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

export const useUpdatePerformance = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: PerformanceModifyRequest) => updatePerformance(formData),
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
