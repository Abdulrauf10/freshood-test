"use client"

import React, { useCallback, useEffect, useMemo, useRef } from "react"
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  useMediaQuery,
  Skeleton,
  Image,
  Grid,
  GridItem
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
import TabWrapper from "./TabWrapper"
import useGetProductMine from "@/hooks/useGetProductMine"
import ChangePassword from "@/components/drawer/ChangePassword"

const MyAccountMerchant = () => {
  const { isExpanded } = useSidebarStore()
  const { activeDrawer, setActiveDrawer } = useDrawer()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useListProduct()
  const { dataTopBanners, isLoadingTopBanners } = useTopBanners()
  const { dataProductMine, isLoadingProductMine } = useGetProductMine()

  const sideBarWidth = isExpanded ? "200px" : "60px"

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
      case "resetPassword":
        return <ChangePassword />
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

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <Box
      sx={{
        position: "relative",
        paddingLeft: isMobile ? "0" : sideBarWidth
      }}
    >
      <Box
        width="full"
        sx={{
          marginBottom: isMobile ? "1rem" : "2.5rem",
          height: isMobile ? "45vh" : "75vh",
          backgroundImage: "url(/merchant/BG.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: isMobile ? "100vw 45vh" : "100vw 75vh",
          padding: isMobile ? "0 14px" : "0 48px"
        }}
      >
        <Box
          sx={{
            padding: isMobile ? "12px 0" : "26px 0",
            marginBottom: "1rem"
          }}
        >
          <Flex
            justifyContent="flex-end"
            sx={{
              paddingTop: isMobile ? "1rem" : "0"
            }}
            alignItems="center"
          >
            {/* <Box sx={{ padding: isMobile ? "0" : "12px 10px" }}>
              <IoIosArrowBack fontSize="24" color="#FFF" />
            </Box> */}
            <GlobalDrawer activeDrawer={activeDrawer}>
              {renderDrawer()}
            </GlobalDrawer>
          </Flex>
        </Box>
        <Box
          sx={{ marginBottom: "1rem" }}
          pb={isMobile ? "10px" : 0}
          width={"100%"}
        >
          <Slider ref={sliderRef} {...settings}>
            {dataTopBanners?.data?.map((data, idx) => (
              <Image
                height={isMobile ? "108px" : "322px"}
                key={idx}
                src={data?.image?.url}
                alt="banner"
                borderRadius={"20px"}
              />
            ))}
          </Slider>
          {isLoadingTopBanners && (
            <Skeleton height={isMobile ? "108px" : "322px"} />
          )}
        </Box>
        <VStack alignItems={"start"}>
          <Flex pt={"10px"}>
            <Box
              w="50px"
              h="50px"
              borderRadius={"full"}
              backgroundColor={"#1abc9c"}
              mt={"20px"}
            />
            <VStack gap={-2} pl={4}>
              <Text
                sx={{ width: "100%" }}
                align="left"
                color={"white"}
                as={"h1"}
                fontSize={"36px"}
              >
                {isLoadingProductMine ? (
                  <Skeleton height={isMobile ? "28px" : "36px"} />
                ) : (
                  dataProductMine?.data?.name || "-"
                )}
              </Text>
              <Text color={"white"}>United Kingdom | Since 1993</Text>
            </VStack>
          </Flex>
          <Box maxW={"full"} wordBreak={"break-word"}>
            <Text color={"white"}>
              From a small quantity, to a large batch - you can find the right
              fit and pricing here.
            </Text>
          </Box>
        </VStack>
      </Box>
      <Box
        sx={{
          padding: isMobile ? "0 14px" : "0 48px"
        }}
      >
        <HStack>
          <Flex
            justifyContent={isMobile ? "space-between" : "flex-start"}
            gap={4}
            sx={{ width: "100%" }}
          >
            <Link
              style={{
                width: isMobile ? "100%" : "150px"
              }}
              href="/merchant/create-product"
            >
              <Button
                sx={{
                  width: isMobile ? "100%" : "150px"
                }}
                bgColor={"white"}
                borderWidth={1}
                borderRadius={"xl"}
              >
                New Product
              </Button>
            </Link>
            <Button
              sx={{ width: isMobile ? "100%" : "150px" }}
              bgColor={"white"}
              borderWidth={1}
              borderRadius={"xl"}
            >
              Credit
            </Button>
          </Flex>
        </HStack>
        <Grid
          sx={{ marginTop: "1rem" }}
          templateColumns="repeat(6, 1fr)"
          color={"#44403C"}
          w="100%"
        >
          <GridItem colSpan={isMobile ? 6 : 2}>
            <Flex
              justifyContent={isMobile ? "flex-start" : "center"}
              alignItems="center"
            >
              <HStack alignItems={"center"}>
                <Image
                  src="/merchant/sea.svg"
                  width={isMobile ? 4 : 5}
                  height={isMobile ? 4 : 5}
                  alt="sea"
                />
                <Text pt={1} sx={{ fontSize: isMobile ? "14px" : "16px" }}>
                  Ships in 14-15 days
                </Text>
              </HStack>
            </Flex>
          </GridItem>
          <GridItem colSpan={isMobile ? 6 : 2}>
            <Flex
              justifyContent={isMobile ? "flex-start" : "center"}
              alignItems="center"
            >
              <HStack alignItems={"center"}>
                <Image
                  src="/merchant/coins.svg"
                  width={isMobile ? 4 : 5}
                  height={isMobile ? 4 : 5}
                  alt="sea"
                />
                <Text pt={1} sx={{ fontSize: isMobile ? "14px" : "16px" }}>
                  $1,224.58 min. first order
                </Text>
              </HStack>
            </Flex>
          </GridItem>
          <GridItem colSpan={isMobile ? 6 : 2}>
            <Flex
              justifyContent={isMobile ? "flex-start" : "center"}
              alignItems="center"
            >
              <HStack alignItems={"center"}>
                <Image
                  src="/merchant/reorder.svg"
                  width={isMobile ? 4 : 5}
                  height={isMobile ? 4 : 5}
                  alt="sea"
                />
                <Text pt={1} sx={{ fontSize: isMobile ? "14px" : "16px" }}>
                  $1,224.58 min. reorder
                </Text>
              </HStack>
            </Flex>
          </GridItem>
        </Grid>
        <TabWrapper
          data={data}
          isLoading={isLoading}
          isMobile={isMobile}
          storeInfo={dataProductMine}
          isFetching={isFetching}
          isFetchinNextPage={isFetchingNextPage}
        />
      </Box>
    </Box>
  )
}

export default MyAccountMerchant
