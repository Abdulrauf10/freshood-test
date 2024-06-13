"use client"
import CustomTitle from "@/components/Text"
import ControlledField from "@/components/formHook/ControlledField"
import { FieldType } from "@/types/form"
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useMediaQuery
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import useResetPassword from "./hooks/useResetPassword"
import { ImStopwatch } from "react-icons/im"
import Link from "next/link"

function ResetPassword() {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const [id, setId] = useState<any>(null)
  const [timer, setTimer] = useState(60)
  const [isTimerActive, setIsTimerActive] = useState(true)

  useEffect(() => {
    const url = new URL(window.location.href)
    const idParam = url.pathname.split("/").pop()
    setId(idParam || null)
  }, [])

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
  } = useResetPassword(id)
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      paddingTop={"50px"}
      as="form"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <HStack position={"relative"} width={"100%"} justifyContent={"center"}>
        <CustomTitle title={"create new password"} />
      </HStack>

      <VStack
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        minWidth={isMobile ? "300px" : "440px"}
        minH={isMobile ? 0 : "600px"}
        mt={15}
        padding={4}
        backgroundColor={"white"}
        alignItems={isMobile ? "flex-start" : "center"}
      >
        <Text
          width={isMobile ? "300px" : "440px"}
          wordBreak={"break-word"}
          textAlign={"left"}
        >
          We have sent the reset password link to your email
        </Text>
        <HStack
          justifyContent={"flex-start"}
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
          justifyContent={"flex-start"}
          wordBreak={"break-word"}
          width={isMobile ? "300px" : "440px"}
        >
          <ImStopwatch />
          <Text color={"#78716C"} cursor={"pointer"} fontSize={"12px"}>
            Send code again in 00:{timer < 10 ? `0${timer}` : timer}
          </Text>
        </HStack>

        <Box width={isMobile ? "300px" : "440px"} mt={"15px"}>
          <Text>New password</Text>
          <ControlledField
            name="new_password"
            control={control}
            errors={errors}
            fieldType={FieldType.textfield}
            borderRadius={"16px"}
            backgroundColor={"white"}
          />
          <Text fontSize={"11px"} fontWeight={500} color={"#A8A29D"}>
            Password must be at least 6 characters.
          </Text>
        </Box>
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
          Reset password
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
            isLoading={mutation.isLoading}
          >
            Reset password
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default ResetPassword
