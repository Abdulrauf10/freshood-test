"use client"

import React from "react"
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useMediaQuery
} from "@chakra-ui/react"

import { IoIosArrowBack, IoIosSettings } from "react-icons/io";
import Image from "next/image"

const ProductMerchant = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  return (
    <Box
      alignItems={"center"}
    >
      <Box
        width="full"
        height="375px"
        backgroundColor={"#016748"}
        position={"absolute"}
        zIndex={-1}
      >
        <Box
          id="triangle"
          height="5px"
          width="full"
          borderBottom="20px solid white"
          borderLeft="768px solid transparent"
          position="absolute"
          bottom="0"
          left="0"
        />
      </Box>
      <Flex position="relative" justifyContent="space-between" alignItems="center" padding="1rem" >
        <IoIosArrowBack size="24px" color="white" />
        <IoIosSettings size="24px" color="white" />
      </Flex>
      <Box position={"relative"} pt={4}>
        <Flex borderRadius={"lg"} justifyContent={"center"}>
          <Image src="/merchant/banner.svg" width={720} height={100} alt="banner" style={{
            borderRadius: "16px"
          }} />
        </Flex>
      </Box>
    </Box>
  )
}

export default ProductMerchant