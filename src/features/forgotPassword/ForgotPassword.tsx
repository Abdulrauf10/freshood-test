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
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import useSendEmail from "./hooks/useSendEmail"
import useSidebarStore from "@/store/sidebarStore"
import { useEmailStore } from "@/store/useEmailStore"

function ForgotPassword() {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const { isExpanded } = useSidebarStore()
  const { setEmailStore } = useEmailStore()

  const {
    control,
    formState: { errors },
    handleSubmit,
    onSubmit,
    mutation,
    watch
  } = useSendEmail()

  const email = watch("email")

  useEffect(() => {
    if (email) {
      setEmailStore(email)
    }
  }, [email, setEmailStore])
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
        minH={isMobile ? "550px" : "600px"}
        mt={15}
        padding={4}
        backgroundColor={"white"}
        alignItems={isMobile ? "flex-start" : "center"}
      >
        <Text
          width={isMobile ? "300px" : "440px"}
          wordBreak={"break-word"}
          textAlign={"left"}
          fontSize={"14px"}
          color={"#44403C"}
          fontWeight={500}
        >
          Enter your email address below to receive a password reset link.
        </Text>
        <Box width={isMobile ? "300px" : "440px"} mt={"10px"}>
          <Text fontSize={"14px"} color={"#44403C"} fontWeight={500}>
            Email
          </Text>
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
          isLoading={mutation.isLoading}
        >
          Send link
        </Button>
      </Box>
    </Box>
  )
}

export default ForgotPassword
