"use client"

import React from "react"
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import "react-image-crop/dist/ReactCrop.css"
import useSidebarStore from "@/store/sidebarStore"
import PageTitle from "./PageTitle"
import { useRouter } from "next/navigation"

const PaymentAndReturnPolicy = () => {
  const router = useRouter()

  const onBackClick = () => {
    router.back()
  }

  const { isExpanded }: { isExpanded: boolean } = useSidebarStore()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const sideBarWidth = isExpanded ? "200px" : "60px"

  const title = {
    fontWeight: "600",
    fontSize: isMobile ? "14px" : "18px",
    color: "#44403C"
  }

  const subtitle = {
    fontWeight: "400",
    fontSize: isMobile ? "14px" : "18px",
    color: "#78716C"
  }

  const customText = {
    fontWeight: "500",
    fontSize: isMobile ? "14px" : "18px",
    color: "#016748"
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
          title="Payment & Return Policy"
          onBackClick={onBackClick}
          isMobile={isMobile}
        />
        <Flex flexDirection="column" gap={isMobile ? 4 : 6}>
          <Flex gap={2} flexDirection="column">
            <Text sx={title}>Payment Terms</Text>
            <Text sx={subtitle}>
              Freshood covers the upfront costs of your order and you will not
              be charged for the items until after the items are shipped. If you
              qualify for net-60 terms, you will be able to choose “Pay with
              Net-60-terms” on checkout.
            </Text>
            <Text sx={customText}>How do Net-60 terms work?</Text>
          </Flex>
          <Flex gap={2} flexDirection="column">
            <Text sx={title}>Try Before You Buy</Text>
            <Text sx={subtitle}>
              We offer free returns on the first order you place with any brand
              within 60 days, so you can feel confident buying new lines online.
              These returns are only available for your first order with a new
              brand. Any reorders from that brand will not be eligible for
              returns.
            </Text>
            <Text sx={customText}>How do returns work?</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default PaymentAndReturnPolicy
