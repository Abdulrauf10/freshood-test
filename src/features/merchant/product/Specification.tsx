"use client"

import React from "react"
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import "react-image-crop/dist/ReactCrop.css"
import useSidebarStore from "@/store/sidebarStore"
import PageTitle from "./PageTitle"
import { useRouter } from "next/navigation"

const Specification = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter()
  const weight = searchParams.get("weight") || "- "
  const caseSize = searchParams.get("caseSize") || "- "
  const height = searchParams.get("height") || "- "
  const length = searchParams.get("length") || "- "
  const width = searchParams.get("width") || "- "

  const onBackClick = () => {
    router.back()
  }

  const { isExpanded }: { isExpanded: boolean } = useSidebarStore()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const sideBarWidth = isExpanded ? "200px" : "60px"

  const title = {
    fontWeight: "400",
    fontSize: isMobile ? "14px" : "16px",
    color: "#78716C"
  }

  const subtitle = {
    fontWeight: "500",
    fontSize: isMobile ? "14px" : "16px",
    color: "#44403C"
  }

  return (
    <>
      <Flex
        flexDirection="column"
        gap={8}
        sx={{
          position: "relative",
          marginLeft: isMobile ? "0" : sideBarWidth,
          padding: isMobile ? "12px 14px" : "26px 48px"
        }}
      >
        <PageTitle
          title="Specification"
          onBackClick={onBackClick}
          isMobile={isMobile}
        />
        <Flex flexDirection="column" gap={isMobile ? 4 : 6}>
          <Box>
            <Text sx={title}>Case Size</Text>
            <Text sx={subtitle}>{caseSize}</Text>
          </Box>
          <Box>
            <Text sx={title}>Product Dimensions (LxWxH)</Text>
            <Text
              sx={subtitle}
            >{`${length}cm x ${width}cm x ${height}cm`}</Text>
          </Box>
          <Box>
            <Text sx={title}>Weight</Text>
            <Text sx={subtitle}>{weight}kg</Text>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default Specification
