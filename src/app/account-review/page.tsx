"use client"
import React, { useState } from "react"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  CircularProgress,
  CloseButton,
  Icon,
  Text,
  VStack,
  useMediaQuery,
  useToast
} from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import { FaTruckLoading } from "react-icons/fa"

const AccountReview = () => {
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  const [confirmed, setConfirmed] = useState(false)
  const [confirmed2, setConfirmed2] = useState(true)
  const toast = useToast()

  const handleConfirm = () => {
    setConfirmed(true)
  }
  return (
    <Center height="100vh" width={"100%"}>
      {confirmed2 && (
        <Box
          textAlign="center"
          py={10}
          px={6}
          maxW={isMobile ? "350px" : "550px"}
        >
          <Icon as={CheckCircleIcon} w={12} h={12} color="#016748" mb={4} />
          <Text fontSize="2xl" fontWeight="bold">
            YOUR ACCOUNT IS UNDER REVIEW
          </Text>
          <Text mt={4} color="gray.600">
            Thank you for your registration as a seller on Freshood. Your
            account is under review by our team. It would usually take 1-2 days,
            you will receive an email confirmation once the account is
            successfully created.
          </Text>
          <Button
            backgroundColor={"#016748"}
            width={"100%"}
            color={"white"}
            mt={8}
            onClick={() => {
              setConfirmed2(false)
              setConfirmed(true)
            }}
          >
            Confirm
          </Button>
        </Box>
      )}

      {confirmed && (
        <Alert
          status="info"
          variant="solid"
          bg="#FFE9A3"
          borderRadius="md"
          py={4}
          color={"black"}
          width={isMobile ? "95%" : "80%"}
          position={"absolute"}
          bottom={0}
          marginBottom={isMobile ? "150px" : "30px"}
          marginRight={"7px"}
        >
          <CircularProgress
            isIndeterminate
            color="orange.400"
            size={"16px"}
            mr={"9px"}
          />
          <AlertDescription>
            Merchant account is currently under review.
          </AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setConfirmed(false)}
          />
        </Alert>
      )}
    </Center>
  )
}

export default AccountReview
