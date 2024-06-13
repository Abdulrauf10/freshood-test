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

interface StoreInformationProps {
  onBackClick: () => void
}

const StoreInformation: React.FC<StoreInformationProps> = ({ onBackClick }) => {
  const { activeDrawer, setActiveDrawer } = useDrawer()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
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
                  onClick={() => null}
                  topText="Store Name"
                  bottomText="Example Shop"
                />
                <DetailTextElement
                  topText="Established Since"
                  bottomText="Opening Soon"
                  onClick={() => null}
                />
                <DetailTextElement
                  topText="Physical Stores"
                  bottomText="-"
                  onClick={() => null}
                />
                <DetailTextElement
                  topText="Annual Sales"
                  bottomText="HKD 0 - HKD 100,000"
                  onClick={() => null}
                />
                <DetailTextElement
                  topText="Website"
                  bottomText="-"
                  onClick={() => null}
                />
                <DetailTextElement
                  topText="Phones Number"
                  bottomText="-"
                  onClick={() => null}
                />
                <DetailTextElement
                  topText="Job Title"
                  bottomText="-"
                  onClick={() => null}
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
                  onClick={() => null}
                />
              </VStack>
            </VStack>
          </TabPanel>
          <TabPanel>
            <Text>Business Profile content goes here.</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default StoreInformation
