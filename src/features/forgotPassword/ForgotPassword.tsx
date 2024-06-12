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
import React from "react"
import { useForm } from "react-hook-form"
import useSendEmail from "./hooks/useSendEmail"

function ForgotPassword() {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)

  const {
    control,
    formState: { errors },
    handleSubmit,
    onSubmit,
    mutation
  } = useSendEmail()
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
        <CustomTitle title={"FORGOT PASSWORD"} />
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
          Enter your email address below to receive a password reset link.
        </Text>
        <Box width={isMobile ? "300px" : "440px"}>
          <Text>Email</Text>
          <ControlledField
            name="email"
            control={control}
            errors={errors}
            fieldType={FieldType.textfield}
            borderRadius={"16px"}
            backgroundColor={"white"}
          />
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
          Send link
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
            Send link
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default ForgotPassword
