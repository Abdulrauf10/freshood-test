"use client"

import React, { useState } from "react"
import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import useSidebarStore from "@/store/sidebarStore"
import useProduct from "@/hooks/useProduct"
import useUploadImage from "@/hooks/useUploadImage"
import ProductDetailStep from "./ProductDetailStep"
import UploadImageStep from "./UploadImagesStep"
import PageTitle from "./PageTitle"
import { useRouter } from "next/navigation"
import { Image } from "@/types/product"

const CreateProduct = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const [imgsSrc, setImgsSrc] = useState([])
  const [selectedImages, setSelectedImages] = useState([] as Image[])
  const [step, setStep] = useState(1)
  const { isExpanded } = useSidebarStore()
  const { push } = useRouter()

  const {
    formState: { errors },
    control,
    handleSubmit,
    onSubmit,
    setValue,
    mutation,
    watch
  } = useProduct()

  const {
    formState: { errors: errorsImage },
    control: controlsImage,
    handleSubmit: handleSubmitImage,
    onSubmit: onSubmitImage,
    setValue: setValueImage
  } = useUploadImage()

  const onBackClick = () => {
    if (step === 2) setStep(1)
    else {
      push("/merchant/my-account")
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
        <PageTitle
          onBackClick={onBackClick}
          isMobile={isMobile}
          title="New Product"
        />
        {step === 1 ? (
          <UploadImageStep
            isMobile={isMobile}
            imgsSrc={imgsSrc}
            setImgsSrc={setImgsSrc}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            setValue={setValue}
            handleSubmit={handleSubmitImage}
            onSubmit={onSubmitImage}
          />
        ) : (
          <ProductDetailStep
            control={control}
            errors={errors}
            isMobile={isMobile}
            images={selectedImages}
            setValue={setValue}
            watch={watch}
          />
        )}
      </Box>
      <Flex
        justifyContent="center"
        sx={{
          position: "fixed",
          bottom: isMobile ? "9%" : "0",
          padding: "16px",
          borderTop: "1px solid #E5E1D8",
          width: isMobile ? "100%" : `calc(100% - ${sideBarWidth})`,
          backgroundColor: "white",
          zIndex: 99999
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
            onClick={() => {
              const imageIds = selectedImages.map((img) => img.id)
              setValue("image_ids", imageIds)
              setValue("currency", "USD")
              setValue("recommended_retail_price", "10")
              handleSubmit(onSubmit)
            }}
            isLoading={mutation.isLoading || mutation.isSuccess}
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
            onClick={selectedImages.length ? () => setStep(2) : () => null}
          >
            Next
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default CreateProduct
