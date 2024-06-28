"use client"

import React, { useRef } from "react"
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
  SimpleGrid,
  Skeleton,
  Image
} from "@chakra-ui/react"

import { IoIosArrowBack } from "react-icons/io"
import GlobalDrawer from "@/components/drawer/GlobalDrawer"
import Setting from "@/components/drawer/Setting"
import PersonalInfo from "@/components/drawer/PersonalInformation"
import CustomTitle from "@/components/Text"
import { useDrawer } from "@/context/drawerContext"
import EditPersonalInfo from "@/components/drawer/EditPersonalInformation"
import AddressesList from "@/components/drawer/AddressesList"
import AddAddresses from "@/components/drawer/AddAddresses"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import useTopBanners from "@/hooks/useTopBanners"
import StoreInformation from "@/components/drawer/StoreInformation"
import EditStoreInformation from "@/components/drawer/EditStoreInformation"
import useSidebarStore from "@/store/sidebarStore"
import Link from "next/link"
import HelpCenter from "@/components/drawer/HelpCenter"
import useListProduct from "@/hooks/useListProduct"
import { Product } from "@/types/product"
import ProductCard from "./ProductCard"

const MyAccountMerchant = () => {
  const { isExpanded } = useSidebarStore()
  const { activeDrawer, setActiveDrawer } = useDrawer()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  let initPage = 1
  const { data, isLoading, fetchNextPage } = useListProduct({ initPage })

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
      case "storeInfo":
        return <StoreInformation onBackClick={() => handleDrawer("setting")} />
      case "addressList":
        return <AddressesList />
      case "addAddresses":
        return <AddAddresses />
      case "editStoreInfo":
        return <EditStoreInformation />
      case "helpCenter":
        return <HelpCenter onBackClick={() => handleDrawer("setting")} />
      default:
        return <CustomTitle title="Other Page" />
    }
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

  const renderProducts = () => {
    const products: Product[] = data?.pages[0]?.data

    return products?.map((product: Product, index: number) => {
      return (
        <ProductCard
          key={index}
          product={product}
          isLoading={isLoading}
          isMobile={isMobile}
        />
      )
    })
  }

  return (
    <Box
      marginLeft={{
        base: "0",
        md: isExpanded ? "7.5vw" : "0"
      }}
    >
      <Box
        width="full"
        sx={{ height: isMobile ? "55vh" : "75vh" }}
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
          marginLeft={isMobile ? "10%" : "6%"}
        >
          <Skeleton isLoaded={!isLoadingTopBanners} minW={"85vw"}>
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
          pt={{
            base: "10vh",
            md: "10vw"
          }}
          ml={{
            base: "20px",
            md: "5vw"
          }}
        >
          <Link href="/merchant/create-product">
            <Button bgColor={"white"} borderWidth={1} borderRadius={"xl"}>
              New Product
            </Button>
          </Link>
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
        <Tabs isFitted colorScheme="green">
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
              <Flex alignItems="center" justifyContent="center">
                <SimpleGrid
                  columns={{
                    base: 2,
                    md: 3
                  }}
                  gap={6}
                >
                  {data?.pageParams.length && renderProducts()}
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
