"use client"

import {
  Box,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react"
import ProductCard from "./ProductCard"
import { Product, ProductMine } from "@/types/product"

const renderProducts = ({
  data,
  isLoading,
  isMobile
}: {
  data: any
  isLoading: boolean
  isMobile: boolean
}) => {
  return data?.pages?.map((page: any) => {
    return page?.data.map((product: Product, index: number) => {
      return (
        <ProductCard
          key={index}
          product={product}
          isLoading={isLoading}
          isMobile={isMobile}
        />
      )
    })
  })
}

const TabWrapper = ({
  data,
  isLoading,
  isMobile,
  storeInfo,
  isFetching,
  isFetchinNextPage
}: {
  data: any
  isLoading: boolean
  isMobile: boolean
  storeInfo: ProductMine | undefined
  isFetching: boolean
  isFetchinNextPage: boolean
}) => {
  const selectedProps = {
    position: "relative",
    _after: {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: isMobile ? "30%" : "40%",
      width: isMobile ? "40%" : "20%",
      height: "3px",
      backgroundColor: "#016748"
    }
  }

  return (
    <Tabs isFitted sx={{ marginTop: "1rem" }}>
      <TabList sx={{ border: "none" }}>
        <Tab _selected={selectedProps}>
          <Text color="#016748" fontWeight={"700"}>
            Products
          </Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel sx={{ padding: "1rem 0 0 0" }}>
          <SimpleGrid
            columns={{
              base: 2,
              md: 3
            }}
            gap={6}
            paddingBottom="10vh"
          >
            {data?.pageParams.length &&
              renderProducts({ data, isLoading, isMobile })}
            {isFetching &&
              isLoading &&
              new Array(3).fill(0).map((_item, index) => {
                return (
                  <Skeleton key={index} height={isMobile ? "160px" : "312px"} />
                )
              })}
            {isFetchinNextPage &&
              new Array(3).fill(0).map((_item, index) => {
                return (
                  <Skeleton key={index} height={isMobile ? "160px" : "312px"} />
                )
              })}
          </SimpleGrid>
        </TabPanel>
        <TabPanel sx={{ padding: "1rem 0 0 0" }}>
          <Flex flexDirection="column" gap={10} paddingBottom="10vh">
            <Box>
              <Text
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#44403C"
                }}
              >
                Value
              </Text>
              <Flex
                sx={{
                  marginTop: "12px",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#44403C"
                }}
                gap={2}
              >
                <Text
                  sx={{
                    padding: "4px 12px",
                    backgroundColor: "#F9F6ED"
                  }}
                >
                  type name
                </Text>
                <Text
                  sx={{
                    padding: "4px 12px",
                    backgroundColor: "#F9F6ED"
                  }}
                >
                  Not on Taobao
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#44403C"
                }}
              >
                About {storeInfo?.data?.name || " "}
              </Text>
              <Box sx={{ marginTop: "12px" }}>
                <Text
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "#78716C"
                  }}
                >
                  {storeInfo?.data?.name || " "} has been creating happy ..since
                  1993...s been s been s been s been
                </Text>
                <Text
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#016748"
                  }}
                >
                  Read More
                </Text>
              </Box>
            </Box>
            <Box>
              <Text
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#44403C"
                }}
              >
                More Details
              </Text>
              <Grid marginTop="12px" templateColumns="repeat(12, 1fr)">
                <GridItem colSpan={6}>
                  <Text
                    sx={{
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "400",
                      color: "#78716C"
                    }}
                  >
                    Managed by
                  </Text>
                  <Text
                    sx={{
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "500",
                      color: "#44403C"
                    }}
                  >
                    Brand Owner
                  </Text>
                </GridItem>
                <GridItem colSpan={6} gap={2}>
                  <Text
                    sx={{
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "400",
                      color: "#78716C"
                    }}
                  >
                    Ship from
                  </Text>
                  <Text
                    sx={{
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "500",
                      color: "#44403C"
                    }}
                  >
                    Cebu City
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default TabWrapper
