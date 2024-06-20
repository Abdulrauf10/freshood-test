import { extendTheme } from "@chakra-ui/react"

import colors from "./colors"
import fonts from "./fonts"

// "'Inter', sans-serif"
// "'Work Sans', sans-serif"

const theme = extendTheme({
  colors,
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Passion One', sans-serif"
  },

  fontWeights: {
    normal: 400,
    medium: 700,
    bold: 900
  }
})

export default theme
