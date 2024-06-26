import { Box, Flex, VStack, Text, HStack, Divider } from "@chakra-ui/react"
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosSettings
} from "react-icons/io"
import React, { useEffect, useRef, useState } from "react"
import CustomTitle from "../Text"
import Image from "next/image"
import ContactUs from "./ContactUs"

interface MenuItemProps {
  text: string
  onClick?: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ text, onClick }) => (
  <HStack
    cursor={"pointer"}
    onClick={onClick}
    width="100%"
    justifyContent={"space-between"}
  >
    <HStack>
      <Text>{text}</Text>
    </HStack>
    <IoIosArrowForward size="20px" color="black" />
  </HStack>
)

const HelpCenter = ({ onBackClick }: { onBackClick: () => void }) => {
  const [selection, setSelection] = useState("")

  const menuSections = [
    {
      title: "FAQ",
      onClick: () => setSelection("faq")
    },
    {
      title: "About Us",
      onClick: () => setSelection("aboutUs")
    },
    {
      title: "T&C",
      onClick: () => setSelection("tnc")
    },
    {
      title: "Privacy Policy",
      onClick: () => setSelection("privacyPolicy")
    },
    {
      title: "Contact Us",
      onClick: () => setSelection("contactUs")
    }
  ]

  switch (selection) {
    case "contactUs":
      return <ContactUs onBackClick={() => setSelection("")} />
    default:
      return (
        <>
          <HStack
            gap={{
              base: 0,
              md: 8
            }}
          >
            <HStack cursor={"pointer"} gap={2} onClick={onBackClick}>
              <IoIosArrowBack size="24px" color="black" />
              <Text>Back</Text>
            </HStack>
            <HStack width={"80%"} justifyContent={"center"}>
              <CustomTitle title="Help Center" />
            </HStack>
          </HStack>
          {menuSections.map((section, index) => (
            <VStack key={index} width="100%" spacing={8} mt={8}>
              <MenuItem onClick={section.onClick} text={section.title} />
            </VStack>
          ))}
        </>
      )
  }
}

export default HelpCenter
