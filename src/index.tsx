import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import {createBreakpoints} from "@chakra-ui/theme-tools"

import {Provider as UserProvider} from "./context/context"
import App from "./App/App"

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    600: "#556bf4",
    500: "#6476e0",
  },
  primary: "#0ad4fa",
}

const breakPoints = createBreakpoints({
  sm: "300px",
  md: "468px",
  lg: "960px",
  xl: "1200px",
})

const theme = extendTheme({colors, breakPoints})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
