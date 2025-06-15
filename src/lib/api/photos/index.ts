import { useQuery } from "@tanstack/react-query";
import httpClient from "@/lib/http";

// API 응답 타입 정의
interface PhotoData {
  thumbnailUrl: string;
  title: string;
  description: string;
  detailUrl: string;
}

interface PhotosApiResponse {
  success: boolean;
  data: PhotoData[];
}

// API 호출 함수
export async function fetchPhotos(): Promise<PhotosApiResponse> {
  const response = await httpClient.get<PhotosApiResponse>("/api/photos");
  return response;
}

// React Query Hooks
export function usePhotos() {
  return useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos
  });
}

// 타입 export
export type { PhotoData, PhotosApiResponse };
