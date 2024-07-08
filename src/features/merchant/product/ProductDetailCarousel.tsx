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
          fill={true}
          style={{
            objectFit: "contain",
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
  const temp = new Array(8).fill({
    created_at: "2024-06-19T04:36:38.146325Z",
    creator: 15,
    id: 33,
    uploaded: false,
    url: "https://freshood-media.s3.ap-southeast-1.amazonaws.com/product/9ab351a2-854d-46a3-84bf-e9167eb3b2a4"
  })
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
            {temp?.map((image: ImageType, index: number) => {
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
