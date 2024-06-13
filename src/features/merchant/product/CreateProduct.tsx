"use client"

import React, { useState } from "react"
import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react"

import { IoIosArrowBack } from "react-icons/io"
import CustomTitle from "@/components/Text"
import { redirect } from "next/navigation"
import useSidebarStore from "@/store/sidebarStore"
import useProduct from "@/hooks/useProduct"
import ProductDetailStep from "./ProductDetailStep"
import UploadImageStep from "./UploadImagesStep"

const PageTitle = ({
  onBackClick,
  isMobile
}: {
  onBackClick: () => void
  isMobile: Boolean
}) => {
  return (
    <Flex
      justifyContent="space-between"
      sx={{
        marginBottom: "1.5rem"
      }}
    >
      <Flex
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={onBackClick}
      >
        <Box sx={{ padding: isMobile ? "0" : "12px 10px" }}>
          <IoIosArrowBack />
        </Box>
        {!isMobile && (
          <Text
            sx={{
              fontWeight: "400",
              fontSize: "11px",
              letterSpacing: "-1%"
            }}
          >
            Back
          </Text>
        )}
      </Flex>
      <Box>
        <CustomTitle title="New Product" />
      </Box>
      <Box sx={{ display: "hidden" }} />
    </Flex>
  )
}

const CreateProduct = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const [imgsSrc, setImgsSrc] = useState([])
  const [selectedImages, setSelectedImages] = useState([] as string[])
  const [step, setStep] = useState(1)
  const { isExpanded } = useSidebarStore()

  const {
    formState: { errors },
    control,
    handleSubmit,
    onSubmit,
    setValue
  } = useProduct()

  const onBackClick = () => {
    if (step === 2) setStep(1)
    else {
      redirect("/merchant/product/")
    }
  }

  const sideBarWidth = isExpanded ? "200px" : "60px"

  return (
    <Box
      sx={{
        position: "relative",
        marginLeft: isMobile ? "0" : sideBarWidth
      }}
      as="form"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          padding: isMobile ? "12px 14px" : "26px 48px"
        }}
        minHeight={isMobile ? "110vh" : "80vh"}
      >
        <PageTitle onBackClick={onBackClick} isMobile={isMobile} />
        {step === 1 ? (
          <UploadImageStep
            isMobile={isMobile}
            imgsSrc={imgsSrc}
            setImgsSrc={setImgsSrc}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            setValue={setValue}
          />
        ) : (
          <ProductDetailStep
            control={control}
            errors={errors}
            isMobile={isMobile}
            images={selectedImages}
          />
        )}
      </Box>
      <Flex
        justifyContent="center"
        sx={{
          position: "fixed",
          bottom: isMobile ? "10%" : "0",
          padding: "16px",
          borderTop: "1px solid #E5E1D8",
          width: isMobile ? "100%" : `calc(100% - ${sideBarWidth})`
        }}
      >
        {step === 2 ? (
          <Button
            sx={{
              width: "100%",
              borderRadius: "24px",
              backgroundColor: "#016748",
              fontWeight: "500",
              fontSize: "16px",
              color: "#FFF",
              padding: "16px 20px"
            }}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            List it
          </Button>
        ) : (
          <Flex
            justifyContent="center"
            sx={{
              width: "100%",
              borderRadius: "24px",
              backgroundColor: selectedImages.length ? "#016748" : "#F5F5F4",
              fontWeight: "500",
              fontSize: "16px",
              color: selectedImages.length ? "#FFF" : "gray",
              padding: "8px",
              cursor: selectedImages.length ? "pointer" : "not-allowed"
            }}
            onClick={() => (selectedImages.length ? setStep(2) : null)}
          >
            Next
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default CreateProduct
