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
              sx={{ width: "25%" }}
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
              <Flex
                alignItems="center"
                gap={4}
                sx={{
                  color: "#78716C",
                  fontWeight: "400",
                  fontSize: "11px"
                }}
              >
                <Text>United Kingdom</Text>
                <Center height="20px">
                  <Divider orientation="vertical" backgroundColor="#78716C" />
                </Center>
                <Text>Since 1993</Text>
              </Flex>
            </Flex>
          </Flex>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={6}
            sx={{ marginBottom: "1rem" }}
          >
            <GridItem colSpan={isMobile ? 4 : 2}>
              <Grid templateColumns="repeat(6, 1fr)" gap={6}>
                <GridItem colSpan={2}>
                  <Box
                    sx={{
                      fontWeight: "500",
                      fontSize: isMobile ? "14px" : "16px",
                      color: "#44403C"
                    }}
                  >
                    $1,323.42
                  </Box>
                  <Box
                    sx={{
                      fontWeight: "400",
                      fontSize: isMobile ? "11px" : "14px",
                      color: "#78716C"
                    }}
                  >
                    min. first order
                  </Box>
                </GridItem>
                <GridItem
                  sx={{ borderLeft: "1px solid #E5E1D8", paddingLeft: "12px" }}
                  colSpan={2}
                >
                  <Box
                    sx={{
                      fontWeight: "500",
                      fontSize: isMobile ? "14px" : "16px",
                      color: "#44403C"
                    }}
                  >
                    $794.05
                  </Box>
                  <Box
                    sx={{
                      fontWeight: "400",
                      fontSize: isMobile ? "11px" : "14px",
                      color: "#78716C"
                    }}
                  >
                    min. reorder
                  </Box>
                </GridItem>
                <GridItem
                  sx={{ borderLeft: "1px solid #E5E1D8", paddingLeft: "12px" }}
                  colSpan={2}
                >
                  <Box
                    sx={{
                      fontWeight: "500",
                      fontSize: isMobile ? "14px" : "16px",
                      color: "#44403C"
                    }}
                  >
                    3 - 30 Days
                  </Box>
                  <Box
                    sx={{
                      fontWeight: "400",
                      fontSize: isMobile ? "11px" : "14px",
                      color: "#78716C"
                    }}
                  >
                    Lead time
                  </Box>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem
              colSpan={isMobile ? 4 : 2}
              sx={{ marginLeft: isMobile ? "0" : "1rem" }}
            >
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
            <Flex
              sx={{ cursor: "pointer", padding: isMobile ? "4px 0" : "6px 0" }}
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
            <Divider height="auto" />
            <Flex
              sx={{ cursor: "pointer", padding: isMobile ? "4px 0" : "6px 0" }}
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
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default ProductDetailDescription
