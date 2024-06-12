"use client"

import type { FC, PropsWithChildren } from "react"
import { ChakraProvider } from "@chakra-ui/react"

import defaultTheme from "@themes/default"
import GlobalStyle from "@/components/GlobalStyle"

const ChakraUIProvider: FC<PropsWithChildren> = ({ children }) => (
  <ChakraProvider theme={defaultTheme}>
    <GlobalStyle />
    {children}
    </ChakraProvider>
)

export default ChakraUIProvider
