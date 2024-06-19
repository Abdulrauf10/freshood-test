"use client"

import React from "react"
import { Box, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import "react-image-crop/dist/ReactCrop.css"
import { IoChevronForward } from "react-icons/io5"

const ProductDetailDescription = ({
  isExpanded,
  isMobile
}: {
  isExpanded: boolean
  isMobile: boolean
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
            sx={{ marginBotto: "1.5rem", minHeight: "60px" }}
          >
            Brands Name
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
            <GridItem colSpan={isMobile ? 4 : 2}>
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
                Fresh and zesty, our lemons are bursting with flavor and perfect
                for adding a citrusy kick to your favorite dishes and
                beverages.Grown under the sun in lush orchards, our lemons are
                hand-picked at peak ripeness to ensure optimal taste and
                juiciness.
              </Text>
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
