"use client"

import React, { useRef, useState } from "react"
import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  useMediaQuery
} from "@chakra-ui/react"
import Image from "next/image"
import "react-image-crop/dist/ReactCrop.css"
import useSidebarStore from "@/store/sidebarStore"
import PageTitle from "./PageTitle"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "./styles.css"
import { Pagination } from "swiper/modules"
import { LuUpload } from "react-icons/lu"
import { BsThreeDots } from "react-icons/bs"
import { HiOutlineShare } from "react-icons/hi"
import { IoChevronForward } from "react-icons/io5"
import ProductDetailDescription from "./ProductDetailDescription"
import ProductDetailCarousel from "./ProductDetailCarousel"

const images = [
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

const pagination = {
  clickable: true,
  renderBullet: function (index: string, className: string) {
    return '<span class="' + className + '"></span>'
  }
}

const OptionComponent = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <Flex alignItems="center" gap={8} justifyContent="center" sx={{}}>
      {isMobile && (
        <>
          <LuUpload style={{ cursor: "pointer" }} />
          <BsThreeDots style={{ cursor: "pointer" }} />
        </>
      )}
    </Flex>
  )
}

const ProductDetail = () => {
  const { isExpanded } = useSidebarStore()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const sideBarWidth = isExpanded ? "200px" : "60px"

  return (
    <>
      <Flex
        flexDirection="column"
        gap={8}
        sx={{
          position: "relative",
          marginLeft: isMobile ? "0" : sideBarWidth,
          padding: isMobile ? "12px 14px" : "26px 48px"
        }}
      >
        <PageTitle
          onBackClick={() => null}
          isMobile={isMobile}
          optionComponent={<OptionComponent isMobile={isMobile} />}
        />
        <Flex flexDirection="column">
          <ProductDetailCarousel isMobile={isMobile} images={images} />
          <Box>
            <Flex
              sx={{
                display: isMobile ? "none" : "flex",
                width: "100%",
                padding: "12px 0"
              }}
              justifyContent="flex-end"
              gap={8}
            >
              <HiOutlineShare style={{ cursor: "pointer", fontSize: "22px" }} />
              <BsThreeDots style={{ cursor: "pointer", fontSize: "22px" }} />
            </Flex>
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              <GridItem colSpan={isMobile ? 4 : 2}>
                <Box
                  sx={{
                    fontSize: isMobile ? "16px" : "18px",
                    fontWeight: "500",
                    color: "#44403C"
                  }}
                >
                  Lili Lemons
                </Box>
                <Box>
                  <Flex alignItems="center">
                    <Text
                      sx={{
                        fontSize: isMobile ? "11px" : "14px",
                        fontWeight: "400",
                        color: "#1B1917"
                      }}
                    >
                      $
                    </Text>
                    <Text
                      sx={{
                        fontSize: isMobile ? "20px" : "24px",
                        fontWeight: "600",
                        color: "#1B1917"
                      }}
                    >
                      20.00
                    </Text>
                  </Flex>
                  <Text
                    sx={{
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "400",
                      color: "#78716C"
                    }}
                  >
                    Recommended Retail Price {isMobile && <br />} $39.70
                  </Text>
                </Box>
              </GridItem>
              <GridItem
                colSpan={isMobile ? 4 : 2}
                sx={{
                  borderTop: isMobile ? "1px solid #E5E1D8" : "none",
                  borderLeft: isMobile ? "none" : "1px solid #E5E1D8",
                  paddingLeft: isMobile ? "0" : "2.5rem",
                  paddingTop: isMobile ? "1rem" : "0"
                }}
              >
                <Box>
                  <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <GridItem colSpan={2}>
                      <Box
                        sx={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "400",
                          color: "#78716C"
                        }}
                      >
                        Order minimum
                      </Box>
                      <Box
                        sx={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "500",
                          color: "#44403C"
                        }}
                      >
                        $1,323.42
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Box
                        sx={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "400",
                          color: "#78716C"
                        }}
                      >
                        Manufactured in
                      </Box>
                      <Box
                        sx={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "500",
                          color: "#44403C"
                        }}
                      >
                        Cebu City
                      </Box>
                    </GridItem>
                  </Grid>
                </Box>
                <Box sx={{ marginTop: "18px" }}>
                  <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <GridItem colSpan={2}>
                      <Text
                        sx={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "400",
                          color: "#78716C"
                        }}
                      >
                        Ships in
                      </Text>
                      <Box
                        sx={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "500",
                          color: "#44403C"
                        }}
                      >
                        3 - 30 days
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Box
                        sx={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "400",
                          color: "#78716C"
                        }}
                      >
                        Estimated delivery date
                      </Box>
                      <Box
                        sx={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "500",
                          color: "#44403C"
                        }}
                      >
                        Feb 29 - Mar 27
                      </Box>
                    </GridItem>
                  </Grid>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </Flex>
      <Box sx={{ width: "100%", backgroundColor: "#F5F5F4", height: "12px" }} />
      <ProductDetailDescription isExpanded={isExpanded} isMobile={isMobile} />
    </>
  )
}

export default ProductDetail
