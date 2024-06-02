import { extendTheme } from "@chakra-ui/react"

import colors from "./colors"
import fonts from "./fonts"

const theme = extendTheme({
  colors,
  fonts: {
    body: "'Work Sans', sans-serif",
    heading: "'Passion One', sans-serif"
  },
  fontWeights: {
    normal: 400,
    medium: 700,
    bold: 900
  }
})

export default theme
