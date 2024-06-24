"use client"

import React, { useEffect } from "react"
import { Box, Button, Flex, useMediaQuery } from "@chakra-ui/react"
import { redirect } from "next/navigation"
import useSidebarStore from "@/store/sidebarStore"
import ProductDetailStep from "./ProductDetailStep"
import PageTitle from "./PageTitle"
import useEditProduct from "@/hooks/useEditProduct"
import useProductDetail from "@/hooks/useProductDetail"
import { Product } from "@/types/product"
import { useRouter } from "next/navigation"

const EditProduct = ({ productId }: { productId: string }) => {
  const { replace, push } = useRouter()

  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const { isExpanded } = useSidebarStore()

  const onBackClick = () => {
    push(`/merchant/product/${productId}`)
  }

  const {
    formState: { errors, isLoading: isLoadingEdit },
    control,
    handleSubmit,
    onSubmit,
    setValue
  } = useEditProduct(() => replace(`/merchant/product/${productId}`), productId)

  const { data, isLoading } = useProductDetail(productId)
  const product: Product = data?.data as Product

  useEffect(() => {
    if (product) {
      setValue("id", productId)
      setValue("name", product?.name)
      setValue("sub_category_id", product?.sub_category?.id)
      setValue("currency", product?.currency)
      setValue("price", product?.price)
      setValue("case_size", product?.case_size)
      setValue("minimum_order", product?.minimum_order)
      setValue("recommended_retail_price", product?.recommended_retail_price)
      setValue("description", product?.description)
      setValue("weight", product?.weight)
      setValue("dimension_length", product?.dimension_length)
      setValue("dimension_width", product?.dimension_width)
      setValue("dimension_height", product?.dimension_height)
      setValue(
        "image_ids",
        product?.images.map((image) => {
          return image.id
        })
      )
    }
  }, [product, productId, setValue])

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
        {!isLoading && (
          <ProductDetailStep
            control={control}
            errors={errors}
            isMobile={isMobile}
            images={product.images}
            setValue={setValue}
            defaultValue={product}
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
            const imageIds = product?.images.map((img) => img.id)
            setValue("image_ids", imageIds)
            setValue("currency", "USD")
            setValue("recommended_retail_price", "10")
            setValue("id", productId)
            handleSubmit(onSubmit)
          }}
          isLoading={isLoadingEdit}
        >
          Save
        </Button>
      </Flex>
    </Box>
  )
}

export default EditProduct
