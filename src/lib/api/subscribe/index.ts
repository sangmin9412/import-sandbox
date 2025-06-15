import { useMutation } from "@tanstack/react-query";
import httpClient from "@/lib/http";

// 구독 요청 타입 정의
interface SubscribeRequest {
  email: string;
}

// 구독 응답 타입 정의
interface SubscribeResponse {
  email: string | null;
  success: boolean;
  message: string;
}

// API 호출 함수
export async function subscribeEmail(data: SubscribeRequest): Promise<SubscribeResponse> {
  const response = await httpClient.post<SubscribeResponse>("/api/subscribe", data);
  return response;
}

// 편의 함수 - 성공/실패 콜백과 함께 사용
export function useSubscribe({
  onSuccess,
  onError
}: {
  onSuccess?: (data: SubscribeResponse) => void;
  onError?: (error: { message: string }) => void;
} = {}) {
  return useMutation({
    mutationFn: subscribeEmail,
    onSuccess,
    onError
  });
}

// 타입 export
export type { SubscribeRequest, SubscribeResponse };
