"use client"

import React from "react"
import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Text
} from "@chakra-ui/react"
import "react-image-crop/dist/ReactCrop.css"
import { IoChevronForward } from "react-icons/io5"
import { Product } from "@/types/product"
import Link from "next/link"

const ProductDetailDescription = ({
  isExpanded,
  isMobile,
  product,
  isLoading
}: {
  isExpanded: boolean
  isMobile: boolean
  product: Product
  isLoading: boolean
}) => {
  const sideBarWidth = isExpanded ? "200px" : "60px"

  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: "#F5F5F4", height: "12px" }} />
      <Box
        sx={{
          position: "relative",
          marginLeft: isMobile ? "0" : sideBarWidth,
          padding: isMobile ? "12px 14px" : "26px 48px"
        }}
      >
        <Flex flexDirection="column">
          <Flex
            alignItems="center"
            sx={{ marginBottom: "1.5rem", minHeight: "60px" }}
          >
            <Avatar
              name="Brand Image"
              src="/merchant/brand-logo.png"
              sx={{
                marginRight: "1.2rem",
                height: isMobile ? "40px" : "60px",
                width: isMobile ? "40px" : "60px"
              }}
            />
            <Flex
              flexDirection="column"
              sx={{ width: isMobile ? "100%" : "25%" }}
              justifyContent="center"
            >
              <Text
                sx={{
                  fontWeight: "600",
                  fontSize: "28px"
                }}
              >
                BRANDS NAME
              </Text>
            </Flex>
          </Flex>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={6}
            sx={{ marginBottom: "1rem" }}
          >
            <GridItem colSpan={isMobile ? 4 : 2}>
              <Skeleton
                isLoaded={!isLoading}
                height={isLoading ? "10vh" : "auto"}
              >
                <Box
                  sx={{
                    fontWeight: "600",
                    fontSize: isMobile ? "14px" : "16px",
                    color: "#44403C"
                  }}
                >
                  Description
                </Box>
                <Text
                  sx={{
                    fontWeight: "400",
                    fontSize: isMobile ? "14px" : "16px",
                    color: "#78716C"
                  }}
                >
                  {product?.description}
                </Text>
              </Skeleton>
            </GridItem>
          </Grid>
          <Flex
            flexDirection="column"
            gap={4}
            sx={{
              marginBottom: isMobile ? "10vh" : 0
            }}
          >
            <Link
              href={{
                pathname: `/merchant/products/${product?.id}/specification`,
                query: {
                  weight: product?.weight,
                  width: product?.dimension_width,
                  height: product?.dimension_height,
                  length: product?.dimension_length,
                  caseSize: product?.case_size
                }
              }}
            >
              <Flex
                sx={{
                  cursor: "pointer",
                  padding: isMobile ? "4px 0" : "6px 0"
                }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  sx={{
                    fontWeight: "400",
                    fontSize: isMobile ? "14px" : "16px",
                    color: "#44403C"
                  }}
                >
                  Specification
                </Text>
                <IoChevronForward />
              </Flex>
            </Link>
            <Divider height="auto" />
            <Link
              href={`/merchant/products/${product?.id}/payment-and-return-policy`}
            >
              <Flex
                sx={{
                  cursor: "pointer",
                  padding: isMobile ? "4px 0" : "6px 0"
                }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  sx={{
                    fontWeight: "400",
                    fontSize: isMobile ? "14px" : "16px",
                    color: "#44403C"
                  }}
                >
                  Payment and return policy
                </Text>
                <IoChevronForward />
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default ProductDetailDescription
