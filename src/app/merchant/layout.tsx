import type { Metadata } from "next"
// import "./globals.css"
import { IoIosArrowBack, IoIosSettings } from "react-icons/io";
import { Box, Flex, Icon } from "@chakra-ui/react";

export const metadata: Metadata = {
    title: "Freshood",
    description: "All in One Farm to Table Products"
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Box position={"relative"}>
            
                {children}
        </Box>
    )
}
