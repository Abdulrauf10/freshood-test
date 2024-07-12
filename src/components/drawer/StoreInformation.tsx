// StoreInformation.tsx
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Divider,
  useMediaQuery
} from "@chakra-ui/react"
import React from "react"
import { IoIosArrowBack } from "react-icons/io"
import { useDrawer } from "@/context/drawerContext"
import CustomTitle from "../Text"
import DetailTextElement from "../Text/DetailTextElement"
import useGetProductMine from "@/hooks/useGetProductMine"

interface StoreInformationProps {
  onBackClick: () => void
}

const StoreInformation: React.FC<StoreInformationProps> = ({ onBackClick }) => {
  const {
    activeDrawer,
    setActiveDrawer,
    selectedEditStoreInfo,
    setSelectedEditStoreInfo
  } = useDrawer()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)

  const handleToEditStore = (selectedField: string) => {
    setActiveDrawer("editStoreInfo")
    setSelectedEditStoreInfo(selectedField)
  }

  const { dataProductMine } = useGetProductMine()

  return (
    <>
      <HStack gap={{ base: 0, md: 8 }} mb={4}>
        <HStack cursor="pointer" gap={2} onClick={onBackClick}>
          <IoIosArrowBack size="24px" color="black" />
          <Text>Back</Text>
        </HStack>
        <HStack width="80%" justifyContent="center">
          <CustomTitle title="Store Information" />
        </HStack>
      </HStack>
      <Tabs isFitted colorScheme="green">
        <TabList mb={4}>
          <Tab>Store Profile</Tab>
          <Tab>Business Profile</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack alignItems="start" pt={4} gap={6}>
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  Online Only
                </Text>
                <Text fontSize="sm" color="gray.500">
                  I only sell products from my own online channels
                </Text>
              </Box>
              <HStack width={"100%"}>
                <Box width={"35%"}>
                  <Text fontSize="lg" fontWeight="bold">
                    STORE INFORMATION
                  </Text>
                </Box>

                <Divider orientation="horizontal" />
              </HStack>
              <VStack alignItems="start" gap={4} width={"100%"}>
                <DetailTextElement
                  onClick={() => handleToEditStore("storeName")}
                  topText="Store Name"
                  bottomText={dataProductMine?.data?.name || "-"}
                />
                <DetailTextElement
                  topText="Established Since"
                  bottomText="Opening Soon"
                  onClick={() => handleToEditStore("establishedSince")}
                />
                <DetailTextElement
                  topText="Physical Stores"
                  bottomText="-"
                  onClick={() => handleToEditStore("physicalStores")}
                />
                <DetailTextElement
                  topText="Annual Sales"
                  bottomText="HKD 0 - HKD 100,000"
                  onClick={() => handleToEditStore("annualSales")}
                />
                <DetailTextElement
                  topText="Website"
                  bottomText="-"
                  onClick={() => handleToEditStore("website")}
                />
                <DetailTextElement
                  topText="Phones Number"
                  bottomText="-"
                  onClick={() => handleToEditStore("phoneNumber")}
                />
                <DetailTextElement
                  topText="Job Title"
                  bottomText="-"
                  onClick={() => handleToEditStore("jobTitle")}
                />
              </VStack>

              <HStack width={"100%"}>
                <Box width={"35%"}>
                  <Text fontSize="lg" fontWeight="bold">
                    SOCIAL ACCOUNTS
                  </Text>
                </Box>

                <Divider orientation="horizontal" />
              </HStack>
              <VStack
                alignItems="start"
                gap={4}
                width={"100%"}
                mb={isMobile ? "70px" : 0}
              >
                <DetailTextElement
                  topText="Website"
                  bottomText="-"
                  onClick={() => handleToEditStore("websiteSocial")}
                />
                <DetailTextElement
                  topText="Instagram"
                  bottomText="-"
                  onClick={() => handleToEditStore("instagram")}
                />
                <DetailTextElement
                  topText="Wechat"
                  bottomText="-"
                  onClick={() => handleToEditStore("wechat")}
                />
                <DetailTextElement
                  topText="Facebook"
                  bottomText="-"
                  onClick={() => handleToEditStore("facebook")}
                />
              </VStack>
              <HStack width={"100%"}>
                <Box width={"35%"}>
                  <Text fontSize="lg" fontWeight="bold">
                    STORE PREFERENCE
                  </Text>
                </Box>

                <Divider orientation="horizontal" />
              </HStack>
              <VStack
                alignItems="start"
                gap={4}
                width={"100%"}
                mb={isMobile ? "70px" : 0}
              >
                <DetailTextElement
                  topText="How would you categorise your store?"
                  bottomText="-"
                  onClick={() => handleToEditStore("storeCategory")}
                />
                <DetailTextElement
                  topText="What types of products are your best-sellers?"
                  bottomText="-"
                  onClick={() => handleToEditStore("bestSellers")}
                />
              </VStack>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack alignItems="start" pt={4} gap={6}>
              <DetailTextElement
                topText="Country of Incorporation"
                bottomText="Honk Kong SAR China"
                onClick={() => null}
              />
              <DetailTextElement
                topText="Legal Bussines Name"
                bottomText="Example Shop"
                onClick={() => null}
              />
              <DetailTextElement
                topText="Owner's name"
                bottomText="Rauf"
                onClick={() => null}
              />
              <DetailTextElement
                topText="Bussines Registration Number"
                bottomText="987845"
                onClick={() => null}
              />
              <DetailTextElement
                topText="Tax Number"
                bottomText="001"
                onClick={() => null}
              />
              <DetailTextElement
                topText="Bussiness Registration Document"
                bottomText="-"
                onClick={() => null}
              />
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default StoreInformation
