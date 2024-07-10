// PersonalInfoDrawer.tsx
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react"
import React from "react"
import CustomTitle from "../Text"
import { IoIosArrowBack } from "react-icons/io"
import { useDrawer } from "@/context/drawerContext"
import { IoChevronForward } from "react-icons/io5"
import useAddressList from "./hooks/useAddressList"

const data = [
  {
    name: "Jacky Chan",
    status: "Default",
    email: "Jacky@example.com",
    phone: "+85292221234",
    address:
      "33 Wyndham Street, 19F – 23F, Hong Kong Island , Hong Kong SAR China"
  },
  {
    name: "Bruce Lee",
    status: "Default",
    email: "Bruce@example.com",
    phone: "+85292221235",
    address:
      "34 Wyndham Street, 19F – 23F, Hong Kong Island , Hong Kong SAR China"
  },
  {
    name: "Donnie Yen",
    status: "Default",
    email: "Donnie@example.com",
    phone: "+85292221236",
    address:
      "35 Wyndham Street, 19F – 23F, Hong Kong Island , Hong Kong SAR China"
  },
  {
    name: "Jet Li",
    status: "Default",
    email: "Jet@example.com",
    phone: "+85292221237",
    address:
      "36 Wyndham Street, 19F – 23F, Hong Kong Island , Hong Kong SAR China"
  },
  {
    name: "Chow Yun-fat",
    status: "Default",
    email: "Chow@example.com",
    phone: "+85292221238",
    address:
      "37 Wyndham Street, 19F – 23F, Hong Kong Island , Hong Kong SAR China"
  },
  {
    name: "Donnie Yen",
    status: "Default",
    email: "Donnie@example.com",
    phone: "+85292221236",
    address:
      "35 Wyndham Street, 19F – 23F, Hong Kong Island , Hong Kong SAR China"
  },
  {
    name: "Jet Li",
    status: "Default",
    email: "Jet@example.com",
    phone: "+85292221237",
    address:
      "36 Wyndham Street, 19F – 23F, Hong Kong Island , Hong Kong SAR China"
  },
  {
    name: "Chow Yun-fat",
    status: "Default",
    email: "Chow@example.com",
    phone: "+85292221238",
    address:
      "37 Wyndham Street, 19F – 23F, Hong Kong Island , Hong Kong SAR China"
  }
]

const MenuItem: React.FC<any> = ({
  contact_name,
  is_default,
  email,
  contact_number,
  address_line_1,
  address_line_2,
  onClick
}) => {
  return (
    <HStack justifyContent={"center"} width={"100%"} cursor={"pointer"}>
      <VStack alignItems={"start"} width={"100%"} onClick={onClick}>
        <HStack>
          <Text fontWeight="600" color="#44403C">
            {contact_name}
          </Text>
          <Text
            fontWeight="500"
            fontSize="14px"
            lineHeight="10px"
            letterSpacing="-1%"
            textAlign="center"
            borderColor={"#016748"}
            borderWidth={1}
            px={1}
            py={2}
            color="#016748"
            borderRadius={"lg"}
          >
            {is_default === true ? "Default" : "Inactive"}
          </Text>
        </HStack>
        <HStack>
          <Text color="#44403C">{email}</Text>
          <Text color="#44403C">+{contact_number}</Text>
        </HStack>
        <Text color="#78716C">{address_line_1}</Text>
        <Text color="#78716C">{address_line_2}</Text>
      </VStack>
      <IoChevronForward size="20px" color="#44403C" />
    </HStack>
  )
}

const NoData: React.FC<any> = () => {
  const { activeDrawer, setActiveDrawer } = useDrawer()
  return (
    <VStack height={"80%"} justifyContent={"center"} alignItems={"center"}>
      <Box
        w={"56px"}
        h={"56px"}
        borderRadius={"full"}
        backgroundColor={"#E5E1D8"}
      />
      <Text textAlign={"center"}>No addresses saved</Text>
      <Text color={"#78716C"} w="240px" textAlign={"center"}>
        Add an address to allow for a faster checkout process
      </Text>
      <Button
        onClick={() => setActiveDrawer("addAdresses")}
        color={"#44403C"}
        backgroundColor={"white"}
        borderWidth={1}
        borderRadius={"2xl"}
        py={6}
      >
        <Text>Add New Address</Text>
      </Button>
    </VStack>
  )
}

const AddressesList: React.FC<any> = () => {
  const { activeDrawer, setActiveDrawer } = useDrawer()
  const { dataAddress, isLoadingAddress } = useAddressList()

  return (
    <>
      <HStack
        gap={{
          base: 0,
          md: 8
        }}
      >
        <HStack
          cursor={"pointer"}
          gap={2}
          onClick={() => setActiveDrawer("setting")}
        >
          <IoIosArrowBack size="24px" color="black" />
          <Text>Back</Text>
        </HStack>
        <HStack width={"80%"} justifyContent={"center"}>
          <CustomTitle title="Addresses List" />
        </HStack>
      </HStack>
      {dataAddress?.data?.length === 0 ? (
        <NoData />
      ) : (
        <>
          <VStack
            alignItems={"start"}
            pt={8}
            gap={6}
            overflow={"auto"}
            maxH={"80vh"}
          >
            {dataAddress?.data?.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </VStack>
          <Divider my={4} />
          <Button
            onClick={() => {
              setActiveDrawer("addAddresses")
            }}
            color={"#44403C"}
            width={"100%"}
            backgroundColor={"white"}
            borderWidth={1}
            borderRadius={"2xl"}
            py={6}
          >
            <Text>Add New Address</Text>
          </Button>
        </>
      )}
    </>
  )
}

export default AddressesList
