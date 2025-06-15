import CardsSection from "@/app/main/_components/sections/Cards";
import { CardInitialData, fetchCards, type CardsApiResponse } from "@/lib/api/cards";
import { DEFAULT_CARD_FILTER } from "@/config";

export default async function CardsContainer() {
  // 서버사이드에서 초기 데이터 페치 (기본 필터로)
  const SERVER_SIDE_DATA: CardInitialData = {
    initialData: undefined,
    initialFilter: DEFAULT_CARD_FILTER
  };

  try {
    const initialData: CardsApiResponse = await fetchCards(DEFAULT_CARD_FILTER);
    SERVER_SIDE_DATA.initialData = initialData;
  } catch (error) {
    console.error(error);
  }

  return <CardsSection initialData={SERVER_SIDE_DATA.initialData} initialFilter={SERVER_SIDE_DATA.initialFilter} />;
}
