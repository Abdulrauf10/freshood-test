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
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"
import { useRouter } from "next/navigation"

const Login = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const { sessionId } = useSessionStore()
  const router = useRouter()

  const {
    formState: { errors },
    control,
    handleSubmit,
    onSubmit,
    mutation
  } = useLogin()

  const fontStyle = {
    color: "#44403C",
    fontSize: "14px",
    fontWeight: 500
  }

  const fontSyle2 = {
    fontSize: "14px",
    fontWeight: 400
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
        mt={"30px"}
        mb={"170px"}
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

        <CustomTitle title={"LOGIN"} />
      </HStack>

      <Text fontWeight={600} fontSize={"18px"} color={"#44403C"}>
        Welcome back to Freshood!
      </Text>

      <VStack
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        minWidth={isMobile ? "330px" : "440px"}
        minH={isMobile ? "380px" : "380px"}
        padding={4}
        backgroundColor={"white"}
        alignItems={"flex-start"}
      >
        <Text {...fontStyle} fontFamily={'"Inter", sans-serif'}>
          Email
        </Text>

        <ControlledField
          name="email"
          control={control}
          errors={errors}
          fieldType={FieldType.textfield}
          borderRadius={"16px"}
          backgroundColor={"white"}
          width={isMobile ? "330px" : "440px"}
        />

        <Text {...fontStyle}>Password</Text>
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
            <Text color={"#016748"} fontSize={"14px"} fontWeight={500}>
              Forgot Password
            </Text>
          </Link>
        </Box>
      </VStack>

      <Box
        width={"100%"}
        borderTop={"solid 1px #E5E1D8"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Button
          color={"white"}
          backgroundColor={"#016748"}
          padding={"16px"}
          borderRadius={"16px"}
          marginTop={"20px"}
          type="submit"
          width={"80%"}
          marginBottom={"10px"}
          isLoading={mutation.isLoading}
        >
          Log in
        </Button>
        <HStack justifyContent={"center"}>
          <Text color={"#78716C"} {...fontSyle2}>
            New to Freshood?
          </Text>
          <Link href={"/register"}>
            <Text color={"#016748"} fontWeight={500} fontSize={"14px"}>
              Create an Account
            </Text>
          </Link>
        </HStack>
      </Box>
    </Box>
  )
}

export default Login
