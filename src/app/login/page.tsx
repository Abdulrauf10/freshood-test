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
import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react"

import "swiper/css"
import "swiper/css/pagination"
import Login from "@/features/login/Login"

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  )
}

export default LoginPage
