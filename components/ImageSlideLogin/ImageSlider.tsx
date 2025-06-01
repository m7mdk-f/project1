"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";
import Image from "next/image";

const lstImg = [
  { image: "/images/img1.png" },
  { image: "/images/img2.jpg" },
  { image: "/images/img3.png" },
  { image: "/images/img4.png" },
];

const ImageSlider = () => {
  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="md:w-[450px] md:h-[350px] h-[300px] w-[90%]"
      >
        {lstImg.map((data, index) => {
          return (
            <SwiperSlide key={index} className="bg-white rounded-3xl block">
              <Image src={data.image} alt="" width={500} height={500} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
