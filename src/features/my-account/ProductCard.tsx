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
import Link from "next/link"

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
      <Link href={`/merchant/products/${product.id}`}>
        <Skeleton isLoaded={!isLoading}>
          <Box
            sx={{
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
              <Text
                sx={{ fontSize: isMobile ? "11px" : "14px", fontWeight: 500 }}
                color={"#78716C"}
              >
                {product.name}
              </Text>
            </Skeleton>
          </Box>
          <HStack>
            <HStack gap={0}>
              <Skeleton isLoaded={!isLoading}>
                <Flex alignItems={"center"}>
                  <Text
                    color={"#1B1917"}
                    fontSize={isMobile ? "11px" : "16px"}
                    fontWeight={400}
                  >
                    $
                  </Text>
                  <Text
                    color={"#1B1917"}
                    fontWeight={"600"}
                    fontSize={isMobile ? "20px" : "28px"}
                  >
                    {product.recommended_retail_price}
                  </Text>
                </Flex>
              </Skeleton>
            </HStack>
          </HStack>
        </Box>
      </Link>
    </GridItem>
  )
}

export default ProductCard
