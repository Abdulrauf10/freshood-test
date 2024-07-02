"use client"
import { FC, useState } from "react"
import {
  Box,
  IconButton,
  VStack,
  HStack,
  Icon,
  useMediaQuery,
  Text
} from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoClose } from "react-icons/io5"
import { RiHome6Line } from "react-icons/ri"
import { FaRegHeart } from "react-icons/fa"
import { TbMessage } from "react-icons/tb"
import { CgProfile } from "react-icons/cg"
import useSidebarStore from "@/store/sidebarStore"
import Link from "next/link"
import { useActiveMenu } from "@/store/useActiveMenu"

const Sidebar: FC = () => {
  const { isExpanded, toggleSidebar } = useSidebarStore()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const { activeMenu, setActiveMenu } = useActiveMenu()

  const handleIconClick = (key: any) => {
    setActiveMenu(key)
  }

  const menus = [
    // { icon: RiHome6Line, label: "Home", href: "/" },
    // { icon: FaRegHeart, label: "My Favourite", href: "/favourite" },
    { icon: CgProfile, label: "My Account", href: "/merchant/my-account" },
    { icon: TbMessage, label: "Message", href: "/merchant/message" }
  ]

  return (
    <>
      {isMobile ? (
        <HStack
          // spacing={10}
          position="fixed"
          bottom={0}
          width="100%"
          justifyContent="space-between"
          height="68px"
          bg="white"
          boxShadow="xs"
          paddingY="2"
          backgroundColor={"white"}
          zIndex={9999}
        >
          {menus.map((menu, key) => (
            <VStack
              key={key}
              justifyContent="center"
              alignItems="center"
              width={"80%"}
              pb={"5px"}
            >
              <Link href={menu.href}>
                <IconButton
                  icon={<Icon as={menu.icon} boxSize="6" />}
                  aria-label={menu.label}
                  fontSize="24px"
                  backgroundColor={activeMenu === key ? "#FFE9A3" : "white"}
                  color={activeMenu === key ? "#016748" : "black"}
                  display="flex"
                  justifyContent="center"
                  borderRadius={"50%"}
                  alignItems="center"
                  onClick={() => handleIconClick(key)}
                  _hover={{ backgroundColor: "#FFE9A3" }}
                />
              </Link>
              <Text
                fontSize="11px"
                textAlign="center"
                whiteSpace="normal"
                marginTop={"-5px"}
                color={activeMenu === key ? "#016748" : "black"}
              >
                {menu.label}
              </Text>
            </VStack>
          ))}
        </HStack>
      ) : (
        <Box
          w={isExpanded ? "200px" : "60px"}
          transition="width 0.3s"
          bg="white"
          h="100vh"
          boxShadow="md"
          position={"fixed"}
          bottom={{ base: 0, md: "unset" }}
          left={{ base: 0, md: "unset" }}
          right={{ base: 0, md: "unset" }}
          display={{ base: "flex", md: "block" }}
          justifyContent={{ base: "space-around", md: "unset" }}
          flexDirection={{ base: "row", md: "column" }}
          zIndex={9999}
        >
          <Box mt={"30px"} ml={"7px"}>
            <IconButton
              icon={<GiHamburgerMenu />}
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
              background={"none"}
              _hover={{ background: "none" }}
            />
          </Box>

          {isExpanded && (
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              marginTop={"100px"}
            >
              <Link href={"/"}>
                <Text
                  fontSize={"30px"}
                  fontWeight={"400"}
                  color={"#016748"}
                  textAlign={"center"}
                  as={"h1"}
                >
                  FRESHOOD
                </Text>
              </Link>
            </Box>
          )}

          <VStack
            spacing="4"
            align="start"
            display={"flex"}
            justifyContent={"center"}
            marginTop={"100px"}
          >
            {menus.map((menu, key) => (
              <Link href={menu.href} key={key}>
                <HStack
                  spacing="4"
                  pl={isExpanded ? "4" : "2"}
                  onClick={() => handleIconClick(key)}
                >
                  <IconButton
                    icon={<Icon as={menu.icon} boxSize="6" />}
                    aria-label={menu.label}
                    fontSize="24px"
                    backgroundColor={activeMenu === key ? "#FFE9A3" : "white"}
                    color={activeMenu === key ? "#016748" : "black"}
                    display="flex"
                    justifyContent="center"
                    borderRadius={"50%"}
                    alignItems="center"
                    _hover={{ backgroundColor: "#FFE9A3", color: "#016748" }}
                  />
                  {isExpanded && (
                    <Box
                      color={activeMenu === key ? "#016748" : "black"}
                      _hover={{ color: "#016748" }}
                    >
                      {menu.label}
                    </Box>
                  )}
                </HStack>
              </Link>
            ))}
          </VStack>
        </Box>
      )}
    </>
  )
}

export default Sidebar
