import PhotosContainer from "@/app/main/_components/containers/Photos";
import SubscribeContainer from "@/app/main/_components/containers/Subscribe";
import CardsContainer from "@/app/main/_components/containers/Cards";

export default async function Main() {
  return (
    <>
      <PhotosContainer />
      <SubscribeContainer />
      <CardsContainer />
    </>
  );
}
