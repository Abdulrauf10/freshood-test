"use client"

import {
  Flex,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react"
import ProductCard from "./ProductCard"
import { Product } from "@/types/product"

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
  isMobile
}: {
  data: any
  isLoading: boolean
  isMobile: boolean
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
        <Tab _selected={selectedProps}>
          <Text color="#016748" fontWeight={"700"}>
            About
          </Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SimpleGrid
            columns={{
              base: 2,
              md: 3
            }}
            gap={6}
            marginBottom="3rem"
          >
            {data?.pageParams.length &&
              renderProducts({ data, isLoading, isMobile })}
          </SimpleGrid>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default TabWrapper
