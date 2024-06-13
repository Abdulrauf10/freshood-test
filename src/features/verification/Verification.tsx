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

const Verification = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const router = useRouter()
  const [timer, setTimer] = useState(60)
  const [isTimerActive, setIsTimerActive] = useState(true)
  const toast = useToast()

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
    onSubmit
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
      paddingTop={"50px"}
    >
      <HStack
        position={"relative"}
        width={"100%"}
        justifyContent={"center"}
        marginBottom={"50px"}
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

        <CustomTitle title={"VERIFICATION"} />
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
        minH={isMobile ? 0 : "470px"}
        alignItems={isMobile ? "flex-start" : "center"}
      >
        <Box marginBottom={"15px"}>
          <Text color={"#78716C"}>
            We have sent the code verification to your email{" "}
            <span style={{ color: "#016748", cursor: "pointer" }}>
              Change email address
            </span>
          </Text>
        </Box>

        <Center marginBottom={"10px"}>
          <ControlledBoxesInput name="otp" control={control} errors={errors} />
        </Center>

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

      {isMobile ? (
        <Button
          color={"white"}
          backgroundColor={"#016748"}
          padding={"16px"}
          borderRadius={"16px"}
          marginTop={"20px"}
          type="submit"
          width={"300px"}
          marginBottom={"90px"}
        >
          Submit
        </Button>
      ) : (
        <Box width={"100%"} borderTop={"solid 1px #E5E1D8"}>
          <Button
            color={"white"}
            backgroundColor={"#016748"}
            padding={"16px"}
            borderRadius={"16px"}
            marginTop={"20px"}
            type="submit"
            width={"80%"}
            marginLeft={"250px"}
            marginBottom={"10px"}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Verification
