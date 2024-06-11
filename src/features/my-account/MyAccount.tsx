"use client"

import React, { FC, useRef } from "react"
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  useMediaQuery,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Grid,
  SimpleGrid,
  Drawer,
  Skeleton,
  Image
} from "@chakra-ui/react"

import { IoIosArrowBack, IoIosSettings } from "react-icons/io"
// import Image from "next/image"
import { FaHeart } from "react-icons/fa"
import GlobalDrawer from "@/components/drawer/GlobalDrawer"
import Setting from "@/components/drawer/Setting"
import PersonalInfo from "@/components/drawer/PersonalInformation"
import CustomTitle from "@/components/Text"
import { useDrawer } from "@/context/drawerContext"
import EditPersonalInfo from "@/components/drawer/EditPersonalInformation"
import AddressesList from "@/components/drawer/AddressesList"
import AddAddresses from "@/components/drawer/AddAddresses"
import useTrendingProducts from "@/hooks/useTrendingProduct"
import Slider, { Settings } from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import useTopBanners from "@/hooks/useTopBanners"

const MyAccountMerchant = () => {
  const { activeDrawer, setActiveDrawer } = useDrawer()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const { dataTrendingProducts, isLoadingProducts } = useTrendingProducts()
  const { dataTopBanners, isLoadingTopBanners } = useTopBanners()

  const handleDrawer = (drawer: string) => {
    setActiveDrawer(drawer)
  }

  const renderDrawer = () => {
    switch (activeDrawer) {
      case "setting":
        return <Setting handleDrawer={handleDrawer} />
      case "personalInfo":
        return <PersonalInfo onBackClick={() => handleDrawer("setting")} />
      case "editPersonalInfo":
        return <EditPersonalInfo />
      case "addressList":
        return <AddressesList />
      case "addAddresses":
        return <AddAddresses />
      default:
        return <CustomTitle title="Other Page" />
    }
  }

  interface Product {
    id: number
    sub_category: {
      id: number
      name: string
      category: {
        id: number
        name: string
      }
    }
    name: string
    images: [
      {
        id: number
        url: string
      }
    ]
    store: {
      id: number
      name: string
      image: {
        id: number
        url: string
      }
    }
    currency: string
    price: string
    case_size: number
    minimum_order: number
    popularity_score: number
    favorites_count: number
    recommended_retail_price: string
    description: string
    weight: number
    dimension_length: number
    dimension_width: number
    dimension_height: number
  }

  interface ProductCardProps {
    product: Product
  }

  const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        width="283px"
        height="420px"
      >
        <Skeleton isLoaded={!isLoadingProducts}>
          <Image
            src={product?.images[0]?.url}
            alt={product.name}
            width="283"
            height="200"
            style={{
              minHeight: "300px",
              minWidth: "300px",
              maxWidth: "300px",
              maxHeight: "300px"
            }}
          />
        </Skeleton>
        <IconButton
          aria-label="Add to favorites"
          icon={<FaHeart color="white" />}
          position="absolute"
          top="2"
          right="2"
          backgroundColor={"transparent"}
        />
        <Box p="3">
          <Box lineHeight="tight">
            <Skeleton isLoaded={!isLoadingProducts}>
              <Text color={"#78716C"}>{product.name}</Text>
            </Skeleton>
          </Box>
          <HStack>
            <HStack gap={0}>
              <Skeleton isLoaded={!isLoadingProducts}>
                <Text color={"#1B1917"}> $</Text>
                <Text color={"#1B1917"} fontWeight={"bold"} fontSize={"28px"}>
                  {product.recommended_retail_price}
                </Text>
              </Skeleton>
            </HStack>
            <Skeleton isLoaded={!isLoadingProducts}>
              <Text color={"#A8A29D"} textDecoration="line-through">
                {" "}
                ${product.price}
              </Text>
            </Skeleton>
          </HStack>

          <Skeleton isLoaded={!isLoadingProducts}>
            <Box
              mt={2}
              as="span"
              borderWidth={1}
              p={1}
              borderRadius={"lg"}
              borderColor={"#016748"}
              color={"#016748"}
            >
              {product.popularity_score}
            </Box>
          </Skeleton>
        </Box>
      </Box>
    )
  }

  const sliderRef = useRef<Slider>(null)

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    appendDots: (dots) => (
      <Box mt={4}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </Box>
    ),
    customPaging: (i) => (
      <Box
        width="10px"
        height="10px"
        bg="gray.400"
        borderRadius="50%"
        display="inline-block"
      ></Box>
    )
  }

  return (
    <Box>
      <Box
        width="full"
        height={{
          base: "45vh",
          md: "60vh"
        }}
        backgroundColor={"#016748"}
        position={"absolute"}
        zIndex={-1}
      >
        <Box
          id="triangle"
          height="5px"
          width="full"
          borderBottom="30px solid white"
          borderLeft="100vw solid transparent"
          position="absolute"
          bottom="0"
          left="0"
        />
      </Box>
      <Box
        position={"relative"}
        ml={{
          base: "20px",
          md: "50px"
        }}
        mr={{
          base: "20px",
          md: "0px"
        }}
      >
        <Flex
          position="relative"
          justifyContent="space-between"
          alignItems="center"
          paddingY="1rem"
          paddingX={{
            base: "0",
            md: "5vw"
          }}
        >
          <IoIosArrowBack size="24px" color="white" />
          {/* <IoIosSettings size="24px" color="white" /> */}
          <GlobalDrawer activeDrawer={activeDrawer}>
            {renderDrawer()}
          </GlobalDrawer>
        </Flex>
        <Box
          position={"relative"}
          pt={4}
          pb={isMobile ? "10px" : 0}
          width={isMobile ? "300px" : "720px"}
          marginLeft={isMobile ? "10%" : "25%"}
        >
          <Skeleton isLoaded={!isLoadingTopBanners}>
            <Slider ref={sliderRef} {...settings}>
              {dataTopBanners?.data?.map((data, idx) => (
                <Image
                  key={idx}
                  src={data?.image?.url}
                  alt="banner"
                  borderRadius={"20px"}
                />
              ))}
            </Slider>
          </Skeleton>
        </Box>
        <VStack alignItems={"start"}>
          <Flex paddingLeft={"5vw"} pt={"10px"}>
            <Box
              w="50px"
              h="50px"
              borderRadius={"full"}
              backgroundColor={"#1abc9c"}
              mt={"20px"}
            />
            <VStack textAlign={"center"} gap={-2}>
              <Text color={"white"} as={"h1"} fontSize={"36px"}>
                BRANDS NAME
              </Text>
              <Text color={"white"} pl={4}>
                United Kingdom | Since 1993
              </Text>
            </VStack>
          </Flex>
          <Box
            maxW={isMobile ? "300px" : "full"}
            wordBreak={"break-word"}
            paddingLeft={"5vw"}
          >
            <Text color={"white"}>
              From a small quantity, to a large batch - you can find the right
              fit and pricing here.
            </Text>
          </Box>
        </VStack>
        <HStack
          mt={{
            base: "10vh",
            md: "5vw"
          }}
          ml={{
            base: "20px",
            md: "5vw"
          }}
        >
          <Button bgColor={"white"} borderWidth={1} borderRadius={"xl"}>
            New Product
          </Button>
          <Button bgColor={"white"} borderWidth={1} borderRadius={"xl"}>
            Credit
          </Button>
        </HStack>
        <Box
          display={"flex"}
          flexDirection={isMobile ? "column" : "row"}
          py={4}
          pl={{
            base: "0",
            md: "6vw"
          }}
          gap={{
            base: 4,
            md: "20vw"
          }}
          color={"#44403C"}
          w="100%"
          justifyContent={"start"}
          alignItems={isMobile ? "flex-start" : "center"}
        >
          <HStack alignItems={"center"}>
            <Image src="/merchant/sea.svg" width={5} height={5} alt="sea" />
            <Text pt={1}>Ships in 14-15 days</Text>
          </HStack>
          <HStack alignItems={"center"}>
            <Image src="/merchant/coins.svg" width={5} height={5} alt="sea" />
            <Text pt={1}>$1,224.58 min. first order</Text>
          </HStack>
          <HStack alignItems={"center"}>
            <Image src="/merchant/reorder.svg" width={5} height={5} alt="sea" />
            <Text pt={1}>$1,224.58 min. reorder</Text>
          </HStack>
        </Box>
        <Tabs isFitted mx={4} colorScheme="green">
          <TabList>
            <Tab>
              <Text fontWeight={"700"}>Products</Text>
            </Tab>
            <Tab>
              <Text fontWeight={"700"}>About</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex mx={"auto"} ml={"5vw"}>
                <SimpleGrid
                  columns={{
                    base: 1,
                    md: 3,
                    lg: 4
                  }}
                  gap={6}
                >
                  {dataTrendingProducts?.data?.flatMap((data) =>
                    data?.products?.map((product: any, index) => (
                      <ProductCard key={index} product={product} />
                    ))
                  )}
                </SimpleGrid>
              </Flex>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

export default MyAccountMerchant
