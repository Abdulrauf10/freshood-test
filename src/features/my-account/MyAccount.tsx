"use client"

import React, { FC } from "react"
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
  Drawer
} from "@chakra-ui/react"

import { IoIosArrowBack, IoIosSettings } from "react-icons/io"
import Image from "next/image"
import { FaHeart } from "react-icons/fa"
import GlobalDrawer from "@/components/drawer/GlobalDrawer"
import Setting from "@/components/drawer/Setting"
import PersonalInfo from "@/components/drawer/PersonalInformation"
import CustomTitle from "@/components/Text"
import { useDrawer } from "@/context/drawerContext"
import EditPersonalInfo from "@/components/drawer/EditPersonalInformation"
import AddressesList from "@/components/drawer/AddressesList"
import AddAddresses from "@/components/drawer/AddAddresses"

const products = [
  {
    name: "Product 1",
    imageUrl: "https://source.unsplash.com/random/1",
    discountPrice: 50,
    realPrice: 100,
    city: "Jakarta"
  },
  {
    name: "Product 2",
    imageUrl: "https://source.unsplash.com/random/2",
    discountPrice: 75,
    realPrice: 150,
    city: "Bandung"
  },
  {
    name: "Product 3",
    imageUrl: "https://source.unsplash.com/random/3",
    discountPrice: 60,
    realPrice: 120,
    city: "Surabaya"
  },
  {
    name: "Product 4",
    imageUrl: "https://source.unsplash.com/random/4",
    discountPrice: 70,
    realPrice: 140,
    city: "Yogyakarta"
  },
  {
    name: "Product 5",
    imageUrl: "https://source.unsplash.com/random/5",
    discountPrice: 80,
    realPrice: 160,
    city: "Bali"
  },
  {
    name: "Product 6",
    imageUrl: "https://source.unsplash.com/random/6",
    discountPrice: 90,
    realPrice: 180,
    city: "Makassar"
  },
  {
    name: "Product 7",
    imageUrl: "https://source.unsplash.com/random/7",
    discountPrice: 100,
    realPrice: 200,
    city: "Medan"
  },
  {
    name: "Product 8",
    imageUrl: "https://source.unsplash.com/random/8",
    discountPrice: 110,
    realPrice: 220,
    city: "Semarang"
  },
  {
    name: "Product 9",
    imageUrl: "https://source.unsplash.com/random/9",
    discountPrice: 120,
    realPrice: 240,
    city: "Palembang"
  },
  {
    name: "Product 10",
    imageUrl: "https://source.unsplash.com/random/10",
    discountPrice: 130,
    realPrice: 260,
    city: "Bandar Lampung"
  }
]

const MyAccountMerchant = () => {
  const { activeDrawer, setActiveDrawer } = useDrawer()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)

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
    imageUrl: string
    discountPrice: number
    realPrice: number
    city: string
    name: string
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
        <Image
          src={product.imageUrl}
          alt={product.city}
          width="283"
          height="200"
          style={{
            minHeight: "300px",
            minWidth: "300px",
            maxWidth: "300px",
            maxHeight: "300px"
          }}
        />
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
            <Text color={"#78716C"}>{product.name}</Text>
          </Box>
          <HStack>
            <HStack gap={0}>
              <Text color={"#1B1917"}> $</Text>
              <Text color={"#1B1917"} fontWeight={"bold"} fontSize={"28px"}>
                {product.discountPrice}
              </Text>
            </HStack>
            <Text color={"#A8A29D"} textDecoration="line-through">
              {" "}
              ${product.realPrice}
            </Text>
          </HStack>

          <Box
            mt={2}
            as="span"
            borderWidth={1}
            p={1}
            borderRadius={"lg"}
            borderColor={"#016748"}
            color={"#016748"}
          >
            {product.city}
          </Box>
        </Box>
      </Box>
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
        <Box position={"relative"} pt={4}>
          <Flex borderRadius={"lg"} justifyContent={"center"}>
            <Image
              src="/merchant/banner.svg"
              width={isMobile ? 300 : 720}
              height={isMobile ? 420 : 100}
              alt="banner"
              style={{
                borderRadius: "16px"
              }}
            />
          </Flex>
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
            <Image src="/merchant/sea.svg" width={20} height={20} alt="sea" />
            <Text pt={1}>Ships in 14-15 days</Text>
          </HStack>
          <HStack alignItems={"center"}>
            <Image src="/merchant/coins.svg" width={20} height={20} alt="sea" />
            <Text pt={1}>$1,224.58 min. first order</Text>
          </HStack>
          <HStack alignItems={"center"}>
            <Image
              src="/merchant/reorder.svg"
              width={20}
              height={20}
              alt="sea"
            />
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
                  {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
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
