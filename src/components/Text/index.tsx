import { Box, Text, useMediaQuery, useTheme } from "@chakra-ui/react"

const CustomTitle = ({ title = "Title" }) => {
  const theme = useTheme()
  const [isMobile] = useMediaQuery(`(max-width: 768px)`)
  return (
    <Box
      backgroundImage="url('/misc/rectangle-yellow.svg')"
      backgroundRepeat="no-repeat"
      backgroundPosition="center bottom"
      backgroundSize={"auto 25px"}
      px={isMobile ? 1 : 3}
      pb={isMobile ? "0" : "1px"}
      display="inline-block"
      as="h1"
    >
      <Text
        color={"var(--Brand-Color-Green---500-default, #016748)"}
        fontSize={isMobile ? "30px" : "31px"}
        lineHeight="45px"
        textAlign="center"
      >
        {title.toUpperCase()}
      </Text>
    </Box>
  )
}

export default CustomTitle
