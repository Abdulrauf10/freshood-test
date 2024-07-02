"use client"

import React, { useState } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import Image from "next/image"
import ControlledField from "@/components/formHook/ControlledField"
import { FieldType } from "@/types/form"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "./styles.css"
import { Pagination } from "swiper/modules"
import { IoIosArrowForward } from "react-icons/io"
import CategoryListDrawer from "./CategoryListDrawer"

const ProductDetailStep = ({
  control,
  errors,
  isMobile,
  images,
  setValue,
  defaultValue
}: any) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: string, className: string) {
      return '<span class="' + className + '"></span>'
    }
  }

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    defaultValue?.sub_category || {}
  ) as any

  return (
    <Flex
      flexDirection={isMobile ? "column" : "row"}
      justifyContent={isMobile ? "center" : "space-between"}
      gap={isMobile ? 4 : 12}
      sx={{
        paddingBottom: isMobile ? "18vh" : "10vh"
      }}
    >
      <Box
        sx={{
          width: isMobile ? "100%" : "45%"
        }}
      >
        {images.length ? (
          <Box sx={{ width: "100%" }}>
            <Swiper
              slidesPerView={isMobile ? 4 : 1}
              pagination={pagination as any}
              spaceBetween={isMobile ? 8 : 0}
              modules={[Pagination]}
              className="mySwiper"
            >
              {images.map((link: any, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        height: isMobile ? "80px" : "456px",
                        width: isMobile ? "80px" : "100%",
                        marginBottom: "32px",
                        position: "relative",
                        borderRadius: "24px"
                      }}
                    >
                      <Image
                        alt={link.url}
                        src={link.url}
                        fill={true}
                        style={{
                          objectFit: "contain",
                          borderRadius: "24px"
                        }}
                      />
                    </Box>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          width: isMobile ? "100%" : "55%"
        }}
      >
        <Text
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            color: "#323A43"
          }}
        >
          Share your suggestions, or make feature requests. Your feedback is
          valuable to us !
        </Text>
        <Flex
          sx={{ width: "100%", marginTop: "1rem" }}
          gap={isMobile ? 2 : 4}
          flexDirection="column"
        >
          <Box sx={{ width: "100%" }}>
            <Text
              sx={{
                marginBottom: ".2rem",
                fontSize: isMobile ? "11px" : "14px",
                fontWeight: "500"
              }}
            >
              Product Name
            </Text>
            <ControlledField
              placeholder="Subject"
              name="name"
              defaultValue={defaultValue?.name || ""}
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              backgroundColor={"white"}
              _placeholder={{
                fontSize: isMobile ? "12px" : "16px",
                color: "#D5D3D1"
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Text
              sx={{
                marginBottom: ".2rem",
                fontSize: isMobile ? "11px" : "14px",
                fontWeight: "500"
              }}
            >
              Category & Sub-Category
            </Text>
            <Flex
              sx={{
                border: "1px solid #E5E1D8",
                backgroundColor: "#FFFFFF",
                padding: "10px 14px",
                borderRadius: "24px",
                cursor: "pointer"
              }}
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Text
                sx={{
                  color: selectedSubCategory.id ? "#000" : "#D5D3D1"
                }}
              >
                {selectedSubCategory.id ? selectedSubCategory.name : "Select"}
              </Text>
              <IoIosArrowForward />
            </Flex>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Text
              sx={{
                marginBottom: ".2rem",
                fontSize: isMobile ? "11px" : "14px",
                fontWeight: "500"
              }}
            >
              Price
            </Text>
            <ControlledField
              placeholder="$"
              name="price"
              defaultValue={defaultValue?.price}
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              backgroundColor={"white"}
              _placeholder={{
                fontSize: isMobile ? "12px" : "16px",
                color: "#D5D3D1"
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Text
              sx={{
                marginBottom: ".2rem",
                fontSize: isMobile ? "11px" : "14px",
                fontWeight: "500"
              }}
            >
              Case Size
            </Text>
            <ControlledField
              name="case_size"
              defaultValue={defaultValue?.case_size}
              placeholder="e.g 5"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              backgroundColor={"white"}
              _placeholder={{
                fontSize: isMobile ? "12px" : "16px",
                color: "#D5D3D1"
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Text
              sx={{
                marginBottom: ".2rem",
                fontSize: isMobile ? "11px" : "14px",
                fontWeight: "500"
              }}
            >
              Minimum order quantity
            </Text>
            <ControlledField
              placeholder="e.g 4"
              defaultValue={defaultValue?.minimum_order}
              name="minimum_order"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              backgroundColor={"white"}
              _placeholder={{
                fontSize: isMobile ? "12px" : "16px",
                color: "#D5D3D1"
              }}
            />
            <Text
              sx={{
                color: "#A8A29D",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: "500"
              }}
            >
              minimum order price = $
            </Text>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Text
              sx={{
                marginBottom: ".2rem",
                fontSize: isMobile ? "11px" : "14px",
                fontWeight: "500"
              }}
            >
              Description (Optional)
            </Text>
            <ControlledField
              defaultValue={defaultValue?.description}
              name="description"
              placeholder="Enter your message"
              control={control}
              errors={errors}
              fieldType={isMobile ? FieldType.textarea : FieldType.textfield}
              borderRadius={"16px"}
              backgroundColor={"white"}
              _placeholder={{
                fontSize: isMobile ? "12px" : "16px",
                color: "#D5D3D1"
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Text
              sx={{
                marginBottom: ".2rem",
                fontSize: isMobile ? "11px" : "14px",
                fontWeight: "500"
              }}
            >
              Weight (Optional)
            </Text>
            <ControlledField
              defaultValue={defaultValue?.weight}
              name="weight"
              control={control}
              errors={errors}
              fieldType={FieldType.textfield}
              borderRadius={"16px"}
              backgroundColor={"white"}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Text
              sx={{
                marginBottom: ".2rem",
                fontSize: isMobile ? "11px" : "14px",
                fontWeight: "500"
              }}
            >
              Product Dimensions (LxWxH) (Optional)
            </Text>
            <Flex gap={2} justifyContent="space-between" alignItems="center">
              <Box>
                <ControlledField
                  defaultValue={defaultValue?.dimension_length}
                  fontSize={isMobile ? "14px" : "16px"}
                  name="dimension_length"
                  minW="10px"
                  control={control}
                  errors={errors}
                  fieldType={FieldType.textfield}
                  borderRadius={"16px"}
                  backgroundColor={"white"}
                />
              </Box>
              x
              <Box>
                <ControlledField
                  defaultValue={defaultValue?.dimension_width}
                  fontSize={isMobile ? "14px" : "16px"}
                  name="dimension_width"
                  minW="10px"
                  control={control}
                  errors={errors}
                  fieldType={FieldType.textfield}
                  borderRadius={"16px"}
                  backgroundColor={"white"}
                />
              </Box>
              x
              <Box>
                <ControlledField
                  defaultValue={defaultValue?.dimension_height}
                  fontSize={isMobile ? "14px" : "16px"}
                  minW="10px"
                  name="dimension_height"
                  control={control}
                  errors={errors}
                  fieldType={FieldType.textfield}
                  borderRadius={"16px"}
                  backgroundColor={"white"}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <CategoryListDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        setSelectedSubCategory={setSelectedSubCategory}
        isMobile={isMobile}
        setValue={setValue}
      />
    </Flex>
  )
}

export default ProductDetailStep
