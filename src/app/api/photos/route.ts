import { publicImages } from "@/config";
import { NextResponse } from "next/server";

interface PhotoData {
  thumbnailUrl: string;
  title: string;
  description: string;
  detailUrl: string;
}

// 3개의 카드 데이터
const photoData: PhotoData[] = [
  {
    thumbnailUrl: publicImages.photos[0],
    title: "Sed ut perspiciatis",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    detailUrl: "/cards/detail/1"
  },
  {
    thumbnailUrl: publicImages.photos[1],
    title: "Lorem ipsum dolor",
    description:
      "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
    detailUrl: "/cards/detail/2"
  },
  {
    thumbnailUrl: publicImages.photos[2],
    title: "Nemo enim ipsam",
    description:
      "Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor.",
    detailUrl: "/cards/detail/3"
  }
];

// 배열을 랜덤하게 섞는 함수
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET() {
  try {
    // 데이터를 랜덤하게 섞어서 반환
    const shuffledPhotos = shuffleArray(photoData);

    return NextResponse.json({
      success: true,
      data: shuffledPhotos
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error"
      },
      { status: 500 }
    );
  }
}
