"use client"
import React from "react"
import { Box, Button, Text, VStack, Icon } from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import Link from "next/link"
import { useActiveMenu } from "@/store/useActiveMenu"

const PasswordResetConfirmation = () => {
  const { activeMenu, setActiveMenu } = useActiveMenu()
  return (
    <VStack spacing={4} align="center" justify="center" h="100vh">
      <Box boxSize="50px">
        <Icon as={CheckCircleIcon} w={12} h={12} color="#016748" />
      </Box>
      <Text fontSize="lg" fontWeight="bold" textAlign="center">
        YOUR PASSWORD HAS BEEN RESET.
      </Text>
      <Link href={"/"} onClick={() => setActiveMenu(0)}>
        <Button backgroundColor={"#016748"} color={"white"} width={"320px"}>
          Done
        </Button>
      </Link>
    </VStack>
  )
}

export default PasswordResetConfirmation
