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

const Login = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)

  const {
    formState: { errors },
    control
  } = useForm()
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#F9F6ED66"}
    >
      <Image src="/login.png" alt="login" width={"100px"} />

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        width={isMobile ? "300px" : "500px"}
        height={"200px"}
        backgroundColor={"#F9F6ED66"}
      >
        <Text>Email</Text>
        <ControlledField
          name="username"
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
          type="password"
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
