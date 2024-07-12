"use client"

import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  useMediaQuery,
  useToast,
  VStack
} from "@chakra-ui/react"
import CustomTitle from "@/components/Text"
import Stepper from "@/components/stepper/Stepper"
import { useRouter } from "next/navigation"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"
import { useForm } from "react-hook-form"
import ControlledBoxesInput from "@/components/formHook/ControlledBoxesInput"
import { ImStopwatch } from "react-icons/im"
import useAddVerification from "./hooks/useAddVerification"
import { sendOtp } from "@/services/api/auth"
import useSidebarStore from "@/store/sidebarStore"
import { useEmailStore } from "@/store/useEmailStore"
import Link from "next/link"

const Verification = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const router = useRouter()
  const [timer, setTimer] = useState(60)
  const [isTimerActive, setIsTimerActive] = useState(true)
  const toast = useToast()
  const { isExpanded } = useSidebarStore()
  const { emailStore } = useEmailStore()

  const steps = [
    { title: "Account registration" },
    { title: "About your business" },
    { title: "Verification" }
  ]

  useEffect(() => {
    if (timer > 0 && isTimerActive) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(countdown)
    } else {
      setIsTimerActive(false)
    }
  }, [timer, isTimerActive])

  const {
    control,
    formState: { errors },
    handleSubmit,
    onSubmit,
    mutation
  } = useAddVerification()

  const handleResendCode = async () => {
    if (!isTimerActive) {
      await sendOtp()
      toast({
        title: "Success",
        description: "OTP code sent to your email",
        status: "success",
        duration: 2000,
        isClosable: true
      })
      setTimer(60)
      setIsTimerActive(true)
    }
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      as="form"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <HStack
        position={"relative"}
        width={"100%"}
        justifyContent={"center"}
        marginBottom={"50px"}
        marginTop={"30px"}
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

        <CustomTitle title={"merchant sign up"} />
      </HStack>

      <Stepper steps={steps} initialStep={2} width={isMobile ? "90%" : "60%"} />

      <VStack
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        minWidth={isMobile ? "300px" : "100%"}
        mt={15}
        padding={4}
        backgroundColor={"white"}
        minH={"470px"}
        alignItems={isMobile ? "flex-start" : "center"}
      >
        <Box
          marginBottom={"15px"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={isMobile ? "flex-start" : "center"}
        >
          <Text color={"#78716C"} fontSize={"14px"} fontWeight={500}>
            We have sent the code verification to
          </Text>
          <Text color={"#78716C"} fontSize={"14px"} fontWeight={500}>
            {`${emailStore}`}{" "}
            <span style={{ color: "#016748", cursor: "pointer" }}>
              <Link href={"/register"}>Change email address</Link>
            </span>
          </Text>
        </Box>

        <Center>
          <ControlledBoxesInput name="otp" control={control} errors={errors} />
        </Center>

        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          wordBreak={"break-word"}
          width={isMobile ? "300px" : "440px"}
          marginBottom={"10px"}
          mt={"-10px"}
        >
          {mutation?.error?.message && (
            <Text
              fontSize={"12px"}
              fontWeight={500}
              color={"#B91C1C"}
              textAlign={"left"}
            >
              Wrong OTP
            </Text>
          )}
        </Box>

        <HStack
          justifyContent={"flex-start"}
          wordBreak={"break-word"}
          width={isMobile ? "300px" : "440px"}
        >
          <Text color={"#78716C"} fontSize={"12px"}>
            Didn&apos;t receive the email?
          </Text>
          <Button
            color={isTimerActive ? "#D5D3D1" : "#016748"}
            fontSize={"12px"}
            border={"none"}
            background={"none"}
            _hover={{ backgroundColor: "none" }}
            marginLeft={"-20px"}
            isDisabled={isTimerActive === true ? true : false}
            onClick={handleResendCode}
          >
            Send code again
          </Button>
        </HStack>

        <HStack
          justifyContent={"flex-start"}
          wordBreak={"break-word"}
          width={isMobile ? "300px" : "440px"}
        >
          <ImStopwatch />
          <Text color={"#78716C"} cursor={"pointer"} fontSize={"12px"}>
            Send code again in 00:{timer < 10 ? `0${timer}` : timer}
          </Text>
        </HStack>
      </VStack>

      <Box
        width={"100%"}
        borderTop={"solid 1px #E5E1D8"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Button
          color={"white"}
          backgroundColor={"#016748"}
          padding={"16px"}
          borderRadius={"16px"}
          marginTop={"20px"}
          type="submit"
          width={isExpanded ? "65%" : "80%"}
          marginBottom={isMobile ? "90px" : "10px"}
          isLoading={mutation?.isLoading}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default Verification
