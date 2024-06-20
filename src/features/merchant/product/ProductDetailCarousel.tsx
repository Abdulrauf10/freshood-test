"use client"

import React from "react"
import { Box } from "@chakra-ui/react"
import Image from "next/image"
import "react-image-crop/dist/ReactCrop.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "./styles.css"
import { Pagination } from "swiper/modules"

const pagination = {
  clickable: true,
  renderBullet: function (index: string, className: string) {
    return '<span class="' + className + '"></span>'
  }
}

const ProductDetailCarousel = ({
  isMobile,
  images
}: {
  isMobile: boolean
  images: string[]
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Swiper
          slidesPerView={isMobile ? 1 : 4}
          pagination={pagination as any}
          spaceBetween={isMobile ? 8 : 0}
          modules={[Pagination]}
          className="mySwiper"
        >
          {images.map((link: string) => {
            return (
              <SwiperSlide key={link}>
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
                    alt={link}
                    src={link}
                    fill={true}
                    style={{
                      objectFit: "cover",
                      borderRadius: "24px"
                    }}
                  />
                </Box>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    </Box>
  )
}

export default ProductDetailCarousel
