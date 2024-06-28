"use client"

import React, { FC } from "react"
import { Product } from "@/types/product"
import {
  Box,
  Flex,
  GridItem,
  HStack,
  IconButton,
  Skeleton,
  Text
} from "@chakra-ui/react"
import Image from "next/image"
import { FaHeart } from "react-icons/fa"

interface ProductCardProps {
  product: Product
  isLoading: boolean
  isMobile: boolean
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  isLoading,
  isMobile
}) => {
  return (
    <GridItem
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
    >
      <Skeleton isLoaded={!isLoading}>
        <Box
          sx={{
            width: isMobile ? "160px" : "283px",
            height: isMobile ? "160px" : "312px",
            position: "relative"
          }}
        >
          <Image
            src={product?.images[0]?.url}
            alt={product.name}
            fill={true}
            objectFit="cover"
          />
        </Box>
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
          <Skeleton isLoaded={!isLoading}>
            <Text color={"#78716C"}>{product.name}</Text>
          </Skeleton>
        </Box>
        <HStack>
          <HStack gap={0}>
            <Skeleton isLoaded={!isLoading}>
              <Flex alignItems={"center"}>
                <Text color={"#1B1917"}> $</Text>
                <Text color={"#1B1917"} fontWeight={"bold"} fontSize={"28px"}>
                  {product.recommended_retail_price}
                </Text>
              </Flex>
            </Skeleton>
          </HStack>
          <Skeleton isLoaded={!isLoading}>
            <Text
              color={"#A8A29D"}
              textDecoration="line-through"
              sx={{ marginTop: "-10px" }}
            >
              ${product.price}
            </Text>
          </Skeleton>
        </HStack>

        <Skeleton isLoaded={!isLoading}>
          <Box
            mt={2}
            as="span"
            borderWidth={1}
            p={1}
            borderRadius={"lg"}
            borderColor={"#016748"}
            color={"#016748"}
          >
            Cebu City
          </Box>
        </Skeleton>
      </Box>
    </GridItem>
  )
}

export default ProductCard
