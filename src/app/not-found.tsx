import { Flex, Text } from "@chakra-ui/react"
import React from "react"

const NotFoundPage = ({ params }: any) => {
  return (
    <>
      <Flex
        sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}
        alignItems="center"
        justifyContent="center"
      >
        <Text sx={{ fontSize: "36px", fontWeight: "600" }}>404 not found</Text>
      </Flex>
    </>
  )
}

export default NotFoundPage
