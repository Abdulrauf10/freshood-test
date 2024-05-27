"use client"

import type { FC, PropsWithChildren } from "react"
import { ChakraProvider } from "@chakra-ui/react"

import defaultTheme from "@themes/default"

const ChakraUIProvider: FC<PropsWithChildren> = ({ children }) => (
  <ChakraProvider theme={defaultTheme}>{children}</ChakraProvider>
)

export default ChakraUIProvider
