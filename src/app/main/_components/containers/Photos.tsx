import PhotosSection from "@/app/main/_components/sections/Photos";
import { fetchPhotos, PhotoData } from "@/lib/api/photos";

export default async function PhotosContainer() {
  // 서버 사이드에서 photos 데이터 페치
  const SERVER_SIDE_DATA: { photosData: PhotoData[] } = { photosData: [] };
  try {
    const response = await fetchPhotos();
    SERVER_SIDE_DATA.photosData = response.success ? response.data : [];
  } catch (error) {
    console.error("Failed to fetch photos:", error);
  }

  return <PhotosSection data={SERVER_SIDE_DATA.photosData} />;
}
