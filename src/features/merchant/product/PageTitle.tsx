"use client"

import React from "react"
import CustomTitle from "@/components/Text"
import { Box, Flex, Text } from "@chakra-ui/react"
import { IoIosArrowBack } from "react-icons/io"

const PageTitle = ({
  onBackClick,
  isMobile,
  title,
  optionComponent
}: {
  onBackClick: () => void
  isMobile: Boolean
  title?: string
  optionComponent?: any
}) => {
  return (
    <Flex
      justifyContent="space-between"
      sx={{
        paddingTop: isMobile ? "1rem" : "0",
        marginBottom: "1.5rem"
      }}
    >
      <Flex
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={onBackClick}
      >
        <Box sx={{ padding: isMobile ? "0" : "12px 10px" }}>
          <IoIosArrowBack />
        </Box>
        {!isMobile && (
          <Text
            sx={{
              fontWeight: 400,
              fontSize: "11px",
              letterSpacing: "-1%"
            }}
          >
            Back
          </Text>
        )}
      </Flex>
      {title && (
        <Box>
          <CustomTitle title={title} />
        </Box>
      )}
      <Box
        sx={{
          display: optionComponent ? "flex" : "hidden",
          alignItems: "center"
        }}
      >
        {optionComponent}
      </Box>
    </Flex>
  )
}

export default PageTitle
