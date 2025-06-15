"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/ui/form/form-field-input";
import { UnsplashPhoto } from "@/lib/api/image";
import { getImagePath } from "@/lib/utils";
import { useSubscribe } from "@/lib/api/subscribe";

interface SubscribeSectionProps {
  imageData: UnsplashPhoto | null;
}

export default function SubscribeSection({ imageData }: SubscribeSectionProps) {
  // 배경 이미지 설정
  const backgroundImage = imageData?.urls.full
    ? { backgroundImage: `url(${imageData.urls.full})` }
    : { backgroundColor: "#000" };

  return (
    <section className='relative py-[15.2rem]'>
      <div className='absolute inset-0 pointer-events-none z-[-1]'>
        <div className='absolute inset-0 bg-black/50 z-[1]'></div>
        <div className='absolute inset-0 bg-cover bg-[center_top]' style={backgroundImage}></div>
      </div>
      <div className='container text-center'>
        <div className='mb-[2.4rem]'>
          <h2 className='font-montserrat font-[700] text-[2.4rem] leading-[1.5] text-white'>
            Sed ut perspiciatis unde omnis
          </h2>
        </div>
        <div>
          <p className='text-white/80'>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don&apos;t look even slightly believable. If you
            are going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t anything embarrassing hidden
            in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as
            necessary.
          </p>

          <div className='h-[1px] my-[3.2rem] bg-white/50'></div>
          <p className='min-h-[4.3rem] text-md text-white/60'>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore.
          </p>
        </div>
        <div className='mt-[9.5rem]'>
          <SubscribeForm />
        </div>
      </div>
    </section>
  );
}

const SubscribeForm = () => {
  // 이메일 형식 검증
  const subscribeFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email!" })
  });

  // 폼 상태 관리
  const subscribeForm = useForm({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: ""
    },
    mode: "onChange"
  });

  // 구독 요청
  const subscribeQuery = useSubscribe({
    onError: error => {
      subscribeForm.reset();
      subscribeForm.setError("email", { message: error.message });
    },
    onSuccess: () => {
      subscribeForm.reset();
      alert("Successfully subscribed!");
    }
  });

  // 폼 제출 핸들러
  const onSubmit = (data: z.infer<typeof subscribeFormSchema>) => {
    subscribeQuery.mutate({
      email: data.email
    });
  };

  // 구독 요청 상태
  const isSubmitting = subscribeQuery.isPending;

  return (
    <div>
      <div className='mb-[1.6rem]'>
        <h3 className='font-exo2 font-[700] text-[1.6rem] leading-[1.2] text-white'>Subscribe to our newsletter</h3>
      </div>
      <div>
        <Form {...subscribeForm}>
          <form onSubmit={subscribeForm.handleSubmit(onSubmit)}>
            <div className='relative max-w-[50rem] mx-auto'>
              <FormFieldInput
                form={subscribeForm}
                name='email'
                type='text'
                className='pl-[1.2rem] pr-[5rem] h-[5rem] font-exo2 font-[400] text-[1.6rem] bg-white/10 backdrop-blur-[5px]'
                placeholder='Enter your email'
                autoComplete='off'
                disabled={isSubmitting}
              />
              <div className='absolute right-0 top-0 h-[5rem] flex items-center justify-center'>
                <button className='px-[1.2rem] h-full' aria-label='Subscribe' type='submit' disabled={isSubmitting}>
                  <Image
                    src={getImagePath("icons/paper-plane.svg")}
                    alt='Subscribe'
                    width={32}
                    height={32}
                    className='w-[3.2rem] h-[3.2rem]'
                  />
                </button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
