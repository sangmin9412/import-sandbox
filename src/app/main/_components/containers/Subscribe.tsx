import SubscribeSection from "@/app/main/_components/sections/Subscribe";
import { fetchRandomImage, UnsplashPhoto } from "@/lib/api/image";

export default async function SubscribeContainer() {
  const SERVER_SIDE_DATA: { imageData: UnsplashPhoto | null } = { imageData: null };

  try {
    // 서버에서 이미지 데이터를 미리 가져옴
    SERVER_SIDE_DATA.imageData = await fetchRandomImage();
  } catch (error) {
    console.error("Failed to fetch image data for SSR:", error);
    // 이미지를 가져오지 못해도 페이지는 정상적으로 렌더링
  }

  return <SubscribeSection imageData={SERVER_SIDE_DATA.imageData} />;
}
