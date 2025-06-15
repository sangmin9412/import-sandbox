import { publicImages } from "@/config";
import { NextRequest, NextResponse } from "next/server";

// 사진 데이터 타입 정의
interface CardData {
  id: number;
  region: string;
  country: string;
  year: number;
  thumbnailUrl: string;
  description: string;
}

// 샘플 사진 데이터 4개
const cardsData: CardData[] = [
  {
    id: 1,
    region: "Europe",
    country: "Italy, Pica",
    year: 1173,
    thumbnailUrl: publicImages.cards[0],
    description:
      "The Leaning Tower of Pisa, or simply the Tower of Pisa (torre di Pisa), is the campanile, or freestanding bell tower, of Pisa Cathedral. It is known for its nearly four-degree lean, the result of an unstable foundation. The tower is one of three structures in the Pisa's Cathedral Square (Piazza del Duomo), which includes the cathedral and Pisa Baptistry."
  },
  {
    id: 2,
    region: "Europe",
    country: "Spain, Sagrada Família",
    year: 1882,
    thumbnailUrl: publicImages.cards[1],
    description: `The Basílica i Temple Expiatori de la Sagrada Família, otherwise known as Sagrada Família, is a church under construction in the Eixample district of Barcelona, Catalonia, Spain. It is the largest unfinished Catholic church in the world. Designed by Catalan architect Antoni Gaudí (1852–1926), in 2005 his work on Sagrada Família was added to an existing (1984) UNESCO World Heritage Site, "Works of Antoni Gaudí". On 7 November 2010, Pope Benedict XVI consecrated the church and proclaimed it a minor basilica.`
  },
  {
    id: 3,
    region: "America",
    country: "US, Fallingwater",
    year: 1935,
    thumbnailUrl: publicImages.cards[2],
    description:
      "Fallingwater is a house designed by the architect Frank Lloyd Wright in 1935. Situated in the Mill Run section of Stewart township, in the Laurel Highlands of southwest Pennsylvania, about 70 miles (110 km) southeast of Pittsburgh in the United States, it is built partly over a waterfall on the Bear Run river. The house was designed to serve as a weekend retreat for Liliane and Edgar J. Kaufmann, the owner of Pittsburgh's Kaufmann's Department Store."
  },
  {
    id: 4,
    region: "Europe",
    country: "Russia, Saint Basil's Cathedral",
    year: 1173,
    thumbnailUrl: publicImages.cards[3],
    description:
      "The Cathedral of Vasily the Blessed (Russian: Собор Василия Блаженного, romanized: Sobor Vasiliya Blazhennogo), known in English as Saint Basil's Cathedral, is an Orthodox church in Red Square of Moscow, and is one of the most popular cultural symbols of Russia."
  }
];

export async function GET(request: NextRequest) {
  try {
    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const regionParam = searchParams.get("region");
    const yearParam = searchParams.get("year");

    let filteredData = [...cardsData];

    // 지역 필터링
    if (regionParam) {
      filteredData = filteredData.filter(card => card.region.toLowerCase().includes(regionParam.toLowerCase()));
    }

    // 년도 필터링
    if (yearParam) {
      const year = parseInt(yearParam);
      if (!isNaN(year)) {
        filteredData = filteredData.filter(card => card.year <= year);
      }
    }

    return NextResponse.json({
      success: true,
      data: filteredData,
      total: filteredData.length,
      filters: {
        region: regionParam || null,
        year: yearParam ? parseInt(yearParam) : null
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        data: []
      },
      { status: 500 }
    );
  }
}
