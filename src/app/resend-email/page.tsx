"use client"
import CustomTitle from "@/components/Text"
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useMediaQuery
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { ImStopwatch } from "react-icons/im"
import Link from "next/link"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"
import { useRouter } from "next/navigation"
import useSidebarStore from "@/store/sidebarStore"
import useGetMe from "@/hooks/useGetMe"

function ResendPassword() {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const [id, setId] = useState<any>(null)
  const [timer, setTimer] = useState(60)
  const [isTimerActive, setIsTimerActive] = useState(true)
  const router = useRouter()
  const { isExpanded } = useSidebarStore()
  const { dataMe } = useGetMe()

  useEffect(() => {
    if (timer > 0 && isTimerActive) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(countdown)
    } else {
      setIsTimerActive(false)
    }
  }, [timer, isTimerActive])

  const fontStyle = {
    color: "#44403C",
    fontSize: "14px",
    fontWeight: 500
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <HStack
        position={"relative"}
        width={"100%"}
        justifyContent={"center"}
        mt={"30px"}
      >
        {!isMobile && (
          <HStack
            position="absolute"
            left="0"
            onClick={() => router.back()}
            cursor="pointer"
            marginLeft={"200px"}
          >
            <MdOutlineKeyboardArrowLeft />
            <Text>Back</Text>
          </HStack>
        )}

        <CustomTitle title={"forgot password"} />
      </HStack>

      <VStack
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        minWidth={isMobile ? "300px" : "440px"}
        minH={isMobile ? "550px" : "600px"}
        mt={"70px"}
        padding={4}
        backgroundColor={"white"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          wordBreak={"break-word"}
          width={isMobile ? "300px" : "440px"}
        >
          <Text {...fontStyle} textAlign={"center"}>
            We have sent the reset password link to your email{" "}
            <span>
              <Link href={"/forgot-password"}>
                <Button
                  color={"#016748"}
                  fontSize={"14px"}
                  border={"none"}
                  background={"none"}
                  _hover={{ backgroundColor: "none" }}
                  // isDisabled={isTimerActive === true ? true : false}
                  fontWeight={500}
                >
                  Change email address
                </Button>
              </Link>
            </span>
          </Text>
        </Box>

        <HStack
          justifyContent={"center"}
          wordBreak={"break-word"}
          width={isMobile ? "300px" : "440px"}
        >
          <Text color={"#78716C"} fontSize={"12px"}>
            Didn&apos;t receive the email?
          </Text>
          <Link href={"/forgot-password"}>
            <Button
              color={isTimerActive ? "#D5D3D1" : "#016748"}
              fontSize={"12px"}
              border={"none"}
              background={"none"}
              _hover={{ backgroundColor: "none" }}
              marginLeft={"-20px"}
              isDisabled={isTimerActive === true ? true : false}
            >
              Send link again
            </Button>
          </Link>
        </HStack>

        <HStack
          justifyContent={"center"}
          wordBreak={"break-word"}
          width={isMobile ? "300px" : "440px"}
          mt={"-10px"}
        >
          <ImStopwatch />
          <Text color={"#78716C"} cursor={"pointer"} fontSize={"12px"}>
            Send code again in 00:{timer < 10 ? `0${timer}` : timer}
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default ResendPassword
