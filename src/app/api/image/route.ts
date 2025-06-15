import { NextResponse } from "next/server";
import axios from "axios";

const EXTERNAL_API_URL = "https://api.unsplash.com/photos/random?client_id=lXNi6ahp8j7Q1zglMhgCEtk5nEpEUCro5MKBCa3M2oI";

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

// 캐시 인터페이스 정의
interface CacheData {
  data: UnsplashPhoto;
  timestamp: number;
}

// 메모리 캐시 저장소
let cache: CacheData | null = null;

// 캐시 유효 시간 (24시간)
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24시간을 밀리초로 변환

// 캐시가 유효한지 확인하는 함수
function isCacheValid(): boolean {
  if (!cache) return false;
  const now = Date.now();
  return now - cache.timestamp < CACHE_DURATION;
}

export async function GET() {
  try {
    // 캐시가 유효하면 캐시된 데이터를 반환
    if (isCacheValid() && cache) {
      console.log("Returning cached data");
      return NextResponse.json(cache.data);
    }

    // 캐시가 없거나 만료된 경우 외부 API 호출
    console.log("Fetching new data from external API");
    const response = await axios.get(EXTERNAL_API_URL);

    // 새로운 데이터를 캐시에 저장
    cache = {
      data: response.data,
      timestamp: Date.now()
    };

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Failed to fetch image:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
