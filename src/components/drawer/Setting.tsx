import { Box, Flex, VStack, Text, HStack, Divider } from "@chakra-ui/react"
import { IoIosArrowForward } from "react-icons/io"
import React from "react"
import CustomTitle from "../Text"
import Image from "next/image"
import { logoutService } from "@/services/api/auth"
import { useRouter } from "next/navigation"
import { useActiveMenu } from "@/store/useActiveMenu"
import useSessionStore from "@/store/useSessionStore"

interface MenuItemProps {
  imageSrc: string
  altText: string
  text: string
  onClick?: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({
  imageSrc,
  altText,
  text,
  onClick
}) => (
  <HStack
    cursor={"pointer"}
    onClick={onClick}
    width="100%"
    justifyContent={"space-between"}
  >
    <HStack>
      <Image src={imageSrc} alt={altText} width={20} height={20} />
      <Text>{text}</Text>
    </HStack>
    <IoIosArrowForward size="20px" color="black" />
  </HStack>
)

const menuSections = [
  {
    title: "Account Information",
    items: [
      {
        imageSrc: "/merchant/settings/profile-circle.svg",
        altText: "Profile Picture",
        text: "Personal Information",
        name: "personalInfo"
      },
      {
        imageSrc: "/merchant/settings/store.svg",
        altText: "Store",
        text: "Store Information",
        name: "storeInfo"
      },
      {
        imageSrc: "/merchant/settings/pin-alt.svg",
        altText: "Address",
        text: "Addresses List",
        name: "addressList"
      }
      // Add more items here...
    ]
  },
  {
    title: "General",
    items: [
      {
        imageSrc: "/merchant/settings/key-alt-back.svg",
        altText: "Reset Password",
        text: "Reset Password",
        name: "resetPassword"
      },
      {
        imageSrc: "/merchant/settings/noti.svg",
        altText: "Notifications",
        text: "Notifications",
        name: "notifications"
      },
      {
        imageSrc: "/merchant/settings/headset-help.svg",
        altText: "Help Center",
        text: "Help Center",
        name: "helpCenter"
      }
      // Add more items here...
    ]
  }
  // Add more sections here...
]

interface SettingProps {
  handleDrawer: (drawer: string) => void
}

const Setting: React.FC<SettingProps> = ({ handleDrawer }) => {
  const { removeSessionId } = useSessionStore()
  const { setActiveMenu } = useActiveMenu()
  const { replace } = useRouter()
  return (
    <>
      <Flex justifyContent={"center"}>
        <CustomTitle title="Settings" />
      </Flex>
      {menuSections.map((section, index) => (
        <VStack key={index} width="100%" spacing={8} mt={8}>
          <HStack width="100%">
            <Box
              as="span"
              color={"#1B1917"}
              fontWeight={"600"}
              whiteSpace="nowrap"
            >
              {section.title}
            </Box>
            <Divider mt={2} width={"100%"} />
          </HStack>
          <VStack width="100%" spacing={8}>
            {section.items.map((item, index) => (
              <MenuItem
                onClick={() => handleDrawer(item.name)}
                key={index}
                {...item}
              />
            ))}
          </VStack>
        </VStack>
      ))}
      <Divider my={8} />
      <VStack spacing={4} alignItems={"start"}>
        <Text
          cursor={"pointer"}
          color={"#B91C1C"}
          onClick={() =>
            logoutService().then(() => {
              removeSessionId()
              setActiveMenu(null)
              replace("/")
            })
          }
        >
          Sign Out
        </Text>
        <Text cursor={"pointer"} color={"#B91C1C"}>
          Delete account
        </Text>
      </VStack>
    </>
  )
}

export default Setting
