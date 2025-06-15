"use client";

import React from "react";
import Image from "next/image";
import Heading from "@/app/main/_components/Heading";
import { CardProvider, useCardContext } from "@/app/main/_components/contexts/Card";
import { CardInitialData, useCards } from "@/lib/api/cards";
import { cn } from "@/lib/utils";

import { Swiper, SwiperSlide } from "swiper/react";

export default function CardsSection({ initialData, initialFilter }: CardInitialData) {
  return (
    <section className='pt-[12rem] pb-[8rem] overflow-hidden'>
      <div className='container'>
        <div className='mb-[6rem]'>
          <Heading level={2}>Duis tincidunt ut ligula vitae mollis.</Heading>
        </div>
        <div>
          <CardProvider initialData={initialData} initialFilter={initialFilter}>
            <div className='mb-[6.8rem]'>
              <CardFilter />
            </div>
            <CardList />
          </CardProvider>
        </div>
      </div>
    </section>
  );
}

const CardFilter = () => {
  const { handleFilter, filterOptions, filter } = useCardContext();

  const regionOptionLength = filterOptions.region.length;
  const yearOptionLength = filterOptions.year.length;
  const isRegionOptions = regionOptionLength > 1;
  const isYearOptions = yearOptionLength > 1;
  const selectedYearIndex = filterOptions.year.findIndex(option => option.value === filter.year);
  const yearProgress = selectedYearIndex / (yearOptionLength - 1);

  return (
    <div className='flex gap-[2rem]'>
      <div className="relative flex gap-[.4rem] rounded-full p-[.5rem] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:z-[-1] before:border before:border-black/50">
        {isRegionOptions && (
          <>
            {filterOptions.region.map(option => (
              <button
                className={cn(
                  "min-w-[6.4rem] font-exo2 font-[400] text-[1.6rem] leading-[4rem] whitespace-nowrap text-black rounded-full",
                  filter.region === option.value && "bg-black text-white"
                )}
                key={option.value}
                onClick={() => handleFilter("region", option.value)}
              >
                {option.label}
              </button>
            ))}
          </>
        )}
      </div>
      <div className="relative flex gap-[7.6rem] rounded-full p-[.5rem] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:z-[-1] before:border before:border-black/50">
        {isYearOptions && (
          <>
            {filterOptions.year.map(option => (
              <button
                className={cn(
                  "w-[4rem] h-[4rem] font-exo2 font-[400] text-[1.4rem] leading-[4rem] whitespace-nowrap bg-gray text-white rounded-[50%]",
                  filter?.year && filter.year >= option.value && "bg-black"
                )}
                key={option.value}
                onClick={() => handleFilter("year", option.value)}
              >
                {option.label}
              </button>
            ))}
            <div className={`absolute top-1/2 inset-x-[2.5rem] mt-[-.5rem] h-[1rem] bg-gray z-[-1]`}>
              <div
                className='absolute top-0 left-0 w-full h-full bg-black origin-left transition-transform duration-300'
                style={{
                  transform: `scaleX(${yearProgress})`
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CardList = () => {
  const { filter, initialData, initialFilter } = useCardContext();

  const isDefaultFilter = filter.region === initialFilter.region && filter.year === initialFilter.year;

  const { data, isLoading } = useCards(
    {
      region: filter.region,
      year: filter.year
    },
    {
      ...(isDefaultFilter && initialData ? { initialData } : {})
    }
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[41.5rem]'>
        <p className='font-exo2 font-[400] text-[1.6rem] leading-[2.4rem] text-black'>Loading...</p>
      </div>
    );
  }

  if (!data?.data.length) {
    return (
      <div className='flex justify-center items-center h-[41.5rem]'>
        <p className='font-exo2 font-[400] text-[1.6rem] leading-[2.4rem] text-black'>No Card Data</p>
      </div>
    );
  }

  return (
    <div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        breakpoints={{
          768: {
            spaceBetween: 40
          }
        }}
        className='w-full overflow-visible'
      >
        {data.data.map(card => (
          <SwiperSlide key={card.id} className='w-[40rem] h-auto'>
            <div className='bg-gray2 rounded-[1rem] h-full'>
              <div className='px-[2.3rem] pt-[1.5rem] pb-[2.3rem]'>
                <div className='mb-[.9rem] flex justify-between items-center'>
                  <h3 className='font-[600] leading-[2rem]'>{card.country}</h3>
                  <p className='leading-[2rem]'>{card.year}</p>
                </div>
                <div className='rounded-[.5rem] overflow-hidden w-[36rem] h-[22.7rem]'>
                  <Image
                    src={card.thumbnailUrl}
                    alt={`${card.country} ${card.description}`}
                    width={360}
                    height={227}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='mt-[2rem] max-h-[10rem] overflow-auto scrollbar-hide'>
                  <p className='font-exo2 font-[400] text-[1.4rem] leading-[1.25] text-black'>{card.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
