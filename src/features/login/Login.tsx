"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from "swiper/modules"
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useMediaQuery
} from "@chakra-ui/react"

import "swiper/css"
import "swiper/css/pagination"
import { useForm } from "react-hook-form"
import ControlledField from "@/components/formHook/ControlledField"
import { FieldType } from "@/types/form"
import CustomTitle from "@/components/Text"
import useLogin from "./hook/useLogin"
import useSessionStore from "@/store/useSessionStore"

const Login = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const { sessionId } = useSessionStore()

  console.log(sessionId)

  const {
    formState: { errors },
    control,
    handleSubmit,
    onSubmit
  } = useLogin()
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      as="form"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomTitle title={"Log in"} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        width={isMobile ? "300px" : "500px"}
        height={"200px"}
        mt={4}
      >
        <Text>Email</Text>
        <ControlledField
          name="email"
          control={control}
          errors={errors}
          fieldType={FieldType.textfield}
          borderRadius={"16px"}
          backgroundColor={"white"}
        />

        <Text>Password</Text>
        <ControlledField
          name="password"
          control={control}
          errors={errors}
          fieldType={FieldType.textfield}
          borderRadius={"16px"}
          backgroundColor={"white"}
        />

        <Text textAlign={"right"} color={"#016748"}>
          Forgot Password
        </Text>

        <Button
          color={"white"}
          backgroundColor={"#016748"}
          padding={"16px"}
          borderRadius={"16px"}
          marginTop={"20px"}
          type="submit"
        >
          Log in
        </Button>
        <HStack justifyContent={"center"}>
          <Text color={"#78716C"}>New to Freshood?</Text>
          <Text color={'"#016748"'}>Create an Account</Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default Login
