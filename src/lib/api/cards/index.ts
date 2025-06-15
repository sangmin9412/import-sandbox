import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import httpClient from "@/lib/http";
import { DEFAULT_CARD_FILTER } from "@/config";

// API 응답 타입 정의
interface CardData {
  id: number;
  region: string;
  country: string;
  year: number;
  thumbnailUrl: string;
  description: string;
}

interface CardsApiResponse {
  success: boolean;
  data: CardData[];
  total: number;
  filters: {
    region: string | null;
    year: number | null;
  };
}

// 필터 타입
interface CardsFilters {
  region?: string;
  year?: number;
}

interface CardInitialData {
  initialData: CardsApiResponse | undefined;
  initialFilter: typeof DEFAULT_CARD_FILTER;
}

// API 호출 함수
export async function fetchCards(params?: CardsFilters): Promise<CardsApiResponse> {
  const response = await httpClient.get<CardsApiResponse>("/api/cards", {
    region: params?.region,
    year: params?.year
  });
  return response;
}

// React Query Hooks
export function useCards(
  filters?: CardsFilters,
  options?: Omit<UseQueryOptions<CardsApiResponse, Error, CardsApiResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: ["cards", filters],
    queryFn: () => fetchCards(filters),
    ...options
  });
}

// 타입 export
export type { CardData, CardsApiResponse, CardsFilters, CardInitialData };
