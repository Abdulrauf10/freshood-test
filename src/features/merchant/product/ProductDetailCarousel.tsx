"use client"

import React from "react"
import { Box, Skeleton } from "@chakra-ui/react"
import Image from "next/image"
import "react-image-crop/dist/ReactCrop.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "./styles.css"
import { Pagination } from "swiper/modules"
import { Image as ImageType } from "@/types/product"

const pagination = {
  clickable: true,
  renderBullet: function (index: string, className: string) {
    return '<span class="' + className + '"></span>'
  }
}

const CardSwiper = ({
  image,
  isLoading,
  isMobile
}: {
  image: ImageType
  isMobile: boolean
  isLoading: boolean
}) => {
  return (
    <Skeleton isLoaded={!isLoading}>
      <Box
        sx={{
          height: isMobile ? "335px" : "233px",
          width: isMobile ? "335px" : "233px",
          marginBottom: "32px",
          position: "relative",
          borderRadius: "24px"
        }}
      >
        <Image
          alt={image?.url}
          src={image?.url}
          objectFit="cover"
          fill={true}
          priority={false}
          sizes="50"
          style={{
            borderRadius: "24px"
          }}
        />
      </Box>
    </Skeleton>
  )
}

const ProductDetailCarousel = ({
  isMobile,
  images,
  isLoading
}: {
  isLoading: boolean
  isMobile: boolean
  images: ImageType[]
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton height={isLoading ? "20vh" : "auto"} isLoaded={!isLoading}>
        <Box sx={{ width: "100%" }}>
          <Swiper
            slidesPerView={isMobile ? 1 : 4}
            pagination={pagination as any}
            spaceBetween={isMobile ? 8 : 0}
            modules={[Pagination]}
            className="mySwiper"
          >
            {images?.map((image: ImageType, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <CardSwiper
                    image={image}
                    isLoading={isLoading}
                    isMobile={isMobile}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Box>
      </Skeleton>
    </Box>
  )
}

export default ProductDetailCarousel
