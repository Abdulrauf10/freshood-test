"use client"

import React from "react"
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  useMediaQuery
} from "@chakra-ui/react"
import "react-image-crop/dist/ReactCrop.css"
import useSidebarStore from "@/store/sidebarStore"
import PageTitle from "./PageTitle"
import { LuUpload } from "react-icons/lu"
import { BsThreeDots } from "react-icons/bs"
import { HiOutlineShare } from "react-icons/hi"
import ProductDetailDescription from "./ProductDetailDescription"
import ProductDetailCarousel from "./ProductDetailCarousel"
import { Image as ImageType, Product } from "@/types/product"
import useProductDetail from "@/hooks/useProductDetail"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import Link from "next/link"

const OptionComponent = ({
  isMobile,
  onClick
}: {
  isMobile: boolean
  onClick: () => void
}) => {
  return (
    <Flex alignItems="center" gap={8} justifyContent="center">
      {isMobile && (
        <>
          <LuUpload style={{ cursor: "pointer" }} />
          <Menu>
            <MenuButton>
              <BsThreeDots style={{ cursor: "pointer" }} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onClick}>Edit</MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
    </Flex>
  )
}

const ProductDetail = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useProductDetail(productId)
  const product: Product = data?.data as Product
  const router = useRouter()

  const onBackClick = () => {
    router.push(`/merchant/my-account`)
  }

  if (!data && !isLoading) {
    redirect("/not-found")
  }
  const { isExpanded }: { isExpanded: boolean } = useSidebarStore()
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
          onBackClick={onBackClick}
          isMobile={isMobile}
          optionComponent={
            <OptionComponent
              isMobile={isMobile}
              onClick={() =>
                router.push(`/merchant/edit-product/${product?.id}`)
              }
            />
          }
        />
        <Flex flexDirection="column">
          <ProductDetailCarousel
            isLoading={isLoading}
            isMobile={isMobile}
            images={product?.images as ImageType[]}
          />
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
              <Menu>
                <MenuButton>
                  <BsThreeDots
                    style={{ cursor: "pointer", fontSize: "22px" }}
                  />
                </MenuButton>
                <MenuList>
                  <Link href={`/merchant/edit-product/${product?.id}`}>
                    <MenuItem>Edit</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
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
                  <Skeleton isLoaded={!isLoading}>{product?.name}</Skeleton>
                </Box>
                <Box>
                  <Skeleton isLoaded={!isLoading}>
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
                        {product?.price}
                      </Text>
                    </Flex>
                  </Skeleton>
                  <Skeleton isLoaded={!isLoading}>
                    <Text
                      sx={{
                        fontSize: isMobile ? "14px" : "16px",
                        fontWeight: "400",
                        color: "#78716C"
                      }}
                    >
                      Recommended Retail Price {isMobile && <br />} $
                      {product?.recommended_retail_price}
                    </Text>
                  </Skeleton>
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
                        <Skeleton isLoaded={!isLoading}>
                          $
                          {product?.minimum_order *
                            Number(product?.price) *
                            product?.case_size}
                        </Skeleton>
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
      <ProductDetailDescription
        isExpanded={isExpanded}
        isMobile={isMobile}
        product={product}
        isLoading={isLoading}
      />
    </>
  )
}

export default ProductDetail
