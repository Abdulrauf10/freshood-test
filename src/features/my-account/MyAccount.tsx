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
  Avatar
} from "@chakra-ui/react"
import GlobalDrawer from "@/components/drawer/GlobalDrawer"
import Setting from "@/components/drawer/Setting"
import PersonalInfo from "@/components/drawer/PersonalInformation"
import CustomTitle from "@/components/Text"
import { useDrawer } from "@/context/drawerContext"
import EditPersonalInfo from "@/components/drawer/EditPersonalInformation"
import AddressesList from "@/components/drawer/AddressesList"
import AddAddresses from "@/components/drawer/AddAddresses"
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
import Image from "next/image"

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
          height: isMobile ? "40vh" : "65vh",
          backgroundImage: "url(/merchant/BG.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: isMobile ? "100vw 40vh" : "100vw 65vh",
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
          sx={{
            position: "relative",
            width: "100%",
            height: isMobile ? "108px" : "322px",
            marginBottom: "1rem"
          }}
          pb={isMobile ? "10px" : 0}
        >
          <Image
            src="/merchant/bg-jumbotron.png"
            alt="freshood-image"
            objectFit="cover"
            fill={true}
            priority={false}
            style={{
              borderRadius: "24px"
            }}
          />
        </Box>
        <VStack alignItems={"start"}>
          <Flex pt={"10px"}>
            <Avatar
              w="50px"
              h="50px"
              borderRadius={"full"}
              backgroundColor={"#1abc9c"}
              src="/merchant/apple-icon.png"
            />
            <VStack pl={4}>
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
            </VStack>
          </Flex>
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
          </Flex>
        </HStack>
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
