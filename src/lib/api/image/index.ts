import { useQuery } from "@tanstack/react-query";
import httpClient from "@/lib/http";

// Unsplash API 응답 타입 정의
interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
    full: string;
    raw: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    username: string;
  };
  [key: string]: unknown; // 기타 속성들
}

// API 호출 함수
export async function fetchRandomImage(): Promise<UnsplashPhoto> {
  const response = await httpClient.get<UnsplashPhoto>("/api/image");
  return response;
}

// React Query Hook
export function useRandomImage() {
  return useQuery({
    queryKey: ["image", "random"],
    queryFn: fetchRandomImage
  });
}

// 타입 export
export type { UnsplashPhoto };
