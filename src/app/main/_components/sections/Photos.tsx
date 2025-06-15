import Heading from "@/app/main/_components/Heading";
import { PhotoData } from "@/lib/api/photos";
import Image from "next/image";
import Link from "next/link";

interface PhotosSectionProps {
  data?: PhotoData[];
}

export default function PhotosSection({ data }: PhotosSectionProps) {
  return (
    <section className='pt-[12rem] pb-[11rem]'>
      <div className='container'>
        <div className='mb-[7rem]'>
          <Heading level={2}>
            Snap photos and share like
            <br />
            never before
          </Heading>
        </div>
        <div>
          <PhotoList data={data} />
        </div>
      </div>
    </section>
  );
}

const PhotoList = ({ data }: { data?: PhotoData[] }) => {
  if (!data) return null;

  return (
    <div className='flex gap-[2rem]'>
      {data.map((item, index) => (
        <div key={item.title + index} className='flex-1'>
          <div className='relative w-[10.8rem] h-[10.8rem] mb-[4rem] rounded-[50%] overflow-hidden'>
            <Image src={item.thumbnailUrl} alt={item.title} fill className='object-cover' unoptimized />
          </div>
          <div>
            <Heading level={3} className='font-[700] mb-[2.4rem]'>
              {item.title}
            </Heading>
            <p className='text-black/80'>{item.description}</p>
          </div>
          <div className='mt-[2.4rem]'>
            <Link href={"#"} className='font-[700] text-outlink'>
              LEARN MORE
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
