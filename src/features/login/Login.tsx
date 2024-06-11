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
  VStack,
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
import Link from "next/link"

const Login = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const { sessionId } = useSessionStore()

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
      paddingTop={"50px"}
      as="form"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <HStack position={"relative"} width={"100%"} justifyContent={"center"}>
        <CustomTitle title={"LOGIN"} />
      </HStack>

      <VStack
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        minWidth={isMobile ? "330px" : "440px"}
        minH={isMobile ? 0 : "550px"}
        mt={15}
        padding={4}
        backgroundColor={"white"}
        alignItems={"flex-start"}
      >
        <Text>Email</Text>

        <ControlledField
          name="email"
          control={control}
          errors={errors}
          fieldType={FieldType.textfield}
          borderRadius={"16px"}
          backgroundColor={"white"}
          width={isMobile ? "330px" : "440px"}
        />

        <Text>Password</Text>
        <ControlledField
          name="password"
          control={control}
          errors={errors}
          fieldType={FieldType.textfield}
          borderRadius={"16px"}
          backgroundColor={"white"}
          width={isMobile ? "330px" : "440px"}
        />
        <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
          <Link href={"forgot-password"}>
            <Text color={"#016748"}>Forgot Password</Text>
          </Link>
        </Box>
      </VStack>

      {isMobile ? (
        <>
          <Button
            color={"white"}
            backgroundColor={"#016748"}
            padding={"16px"}
            borderRadius={"16px"}
            marginTop={"20px"}
            type="submit"
            width={"300px"}
          >
            Log in
          </Button>
          <HStack justifyContent={"center"}>
            <Text color={"#78716C"}>New to Freshood?</Text>
            <Link href={"/register"}>
              <Text color={'"#016748"'}>Create an Account</Text>
            </Link>
          </HStack>
        </>
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
            marginLeft={"200px"}
            marginBottom={"10px"}
          >
            Log in
          </Button>
          <HStack justifyContent={"center"}>
            <Text color={"#78716C"}>New to Freshood?</Text>
            <Link href={"/register"}>
              <Text color={'"#016748"'}>Create an Account</Text>
            </Link>
          </HStack>
        </Box>
      )}
    </Box>
  )
}

export default Login
