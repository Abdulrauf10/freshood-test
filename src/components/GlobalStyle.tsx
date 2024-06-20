import { Global, css } from "@emotion/react"

const GlobalStyle = () => (
  <Global
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap");

      h1 {
        font-family: "Passion One", sans-serif;
      }
    `}
  />
)

export default GlobalStyle
